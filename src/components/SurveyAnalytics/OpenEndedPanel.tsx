
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';

interface OpenEndedResponse {
    questionId: string;
    questionText: string;
    responses: string[];
}

interface OpenEndedPanelProps {
    data: OpenEndedResponse[];
}

export function OpenEndedPanel({ data }: OpenEndedPanelProps) {

    if (!data || data.length === 0) return <div>لا توجد بيانات للأسئلة المفتوحة.</div>;

    // Very basic NLP heuristic for dashboard
    const analyzeSentiment = (text: string) => {
        const positiveWords = ['ممتاز', 'جيد', 'رائع', 'مفيد', 'استفدت', 'شكر', 'سهل', 'واضح', 'جميل', 'أعجبني', 'تغيير', 'فهمت'];
        const negativeWords = ['صعب', 'سيء', 'معقد', 'طويل', 'غير واضح', 'مشكلة', 'مكلف', 'وقت', 'تعب', 'ملل', 'لا يعمل', 'بطء'];

        let posCount = 0;
        let negCount = 0;

        // Exception handling for "لا يوجد مشاكل" which should not trigger "مشكلة" as negative
        const normalizedText = text.replace('لا يوجد مشاكل', 'لايوجد عوائق');

        positiveWords.forEach(w => { if (normalizedText.includes(w)) posCount++; });
        negativeWords.forEach(w => { if (normalizedText.includes(w)) negCount++; });

        if (posCount > negCount) return 'positive';
        if (negCount > posCount) return 'negative';
        return 'neutral';
    };

    const getStats = (responses: string[]) => {
        const valid = responses.filter(r => r && r.length > 3);
        let pos = 0, neg = 0, neu = 0;

        valid.forEach(r => {
            const s = analyzeSentiment(r);
            if (s === 'positive') pos++;
            else if (s === 'negative') neg++;
            else neu++;
        });

        return { total: valid.length, pos, neg, neu, validResponses: valid };
    };

    return (
        <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 border p-4 rounded-lg flex items-start gap-3">
                <MessageSquare className="text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-bold mb-1">التحليل الدلالي (NLP Heuristics)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        محرك تحليل نصي مبسط لاستخراج المشاعر (Sentiment) والكلمات المفتاحية من إجابات المشاركين المفتوحة. يساعد في فهم السياق النوعي وراء الأرقام الإحصائية.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.map((q, idx) => {
                    const stats = getStats(q.responses);
                    if (stats.total === 0) return null;

                    return (
                        <Card key={idx} className="flex flex-col">
                            <CardHeader className="pb-3 border-b bg-slate-50/50 dark:bg-slate-900/50">
                                <CardTitle className="text-base leading-snug">{q.questionText}</CardTitle>
                                <CardDescription className="flex items-center gap-4 mt-2">
                                    <span>إجمالي الردود: <strong>{stats.total}</strong></span>
                                    <span className="flex items-center gap-1 text-emerald-600"><ThumbsUp size={14} /> {stats.pos}</span>
                                    <span className="flex items-center gap-1 text-red-500"><ThumbsDown size={14} /> {stats.neg}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4 flex-1 overflow-hidden flex flex-col">
                                <div className="text-sm font-semibold mb-3 flex items-center gap-2 text-primary">
                                    <Lightbulb size={16} /> عينة من الردود البارزة:
                                </div>
                                <div className="space-y-3 overflow-y-auto pr-2 max-h-[300px]">
                                    {/* Show up to 10 randomly selected or latest valid responses */}
                                    {stats.validResponses.slice(0, 10).map((r, i) => {
                                        const sentiment = analyzeSentiment(r);
                                        let badgeClass = 'bg-slate-100 text-slate-600';
                                        if (sentiment === 'positive') badgeClass = 'bg-emerald-100 text-emerald-700 border-none';
                                        if (sentiment === 'negative') badgeClass = 'bg-red-100 text-red-700 border-none';

                                        // Use badgeClass to color the text instead of the dot for bolder visual if needed, 
                                        // but for now the dot is driving the UI. We can ignore the unused badgeClass warning 
                                        // or apply it to the container:

                                        return (
                                            <div key={i} className={`p-3 bg-white dark:bg-slate-950 border rounded-md shadow-sm relative group ${badgeClass}`}>
                                                <div className={`absolute top-2 left-2 w-2 h-2 rounded-full \${sentiment === 'positive' ? 'bg-emerald-500' : sentiment === 'negative' ? 'bg-red-500' : 'bg-slate-300'}`}></div>
                                                <p className="text-sm pr-2 text-slate-800 dark:text-slate-200 leading-relaxed">"{r}"</p>
                                            </div>
                                        );
                                    })}
                                    {stats.total > 10 && (
                                        <div className="text-center text-xs text-muted-foreground pt-2">+ {stats.total - 10} ردود أخرى (متوفرة في التصدير)</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div >
    );
}

