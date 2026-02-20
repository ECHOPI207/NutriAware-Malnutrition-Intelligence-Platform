import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SurveyCTA: React.FC = () => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6 text-center lg:text-start">
                            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                                <Sparkles className="h-4 w-4 text-yellow-300" />
                                <span>{isRTL ? 'رأيك يهمنا' : 'Your Opinion Matters'}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                {isRTL ? 'شارك في تشكيل مستقبل NutriAware' : 'Help Shape the Future of NutriAware'}
                            </h2>
                            <p className="text-lg text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                {isRTL ?
                                    'نحن نسعى دائماً لتحسين خدماتنا. شارك تجربتك معنا من خلال استبيان قصير وساهم في تطوير منصة ذكية أفضل للجميع.' :
                                    'We are constantly striving to improve. Share your experience through a short survey and contribute to building a better intelligent platform for everyone.'
                                }
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                                <Link to="/project-evaluation">
                                    <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg h-14 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all font-bold">
                                        {isRTL ? 'بدء الاستبيان' : 'Start Survey'}
                                        <ArrowRight className={`w-5 h-5 mx-2 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative hidden lg:block">
                            {/* Decorative Visual for Survey */}
                            <div className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 border border-white/20">
                                <div className="flex items-center gap-4 mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <Sparkles className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{isRTL ? 'استبيان تقييم المشروع' : 'Project Evaluation'}</h3>
                                        <p className="text-sm text-muted-foreground">{isRTL ? 'قياس الأثر والرضا' : 'Impact & Satisfaction'}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full w-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${85 - (i * 15)}%` }} />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">{isRTL ? 'وقت الإجابة المتوقع: 3 دقائق' : 'Est. time: 3 mins'}</span>
                                    <div className="flex -space-x-2 space-x-reverse">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-gray-200 flex items-center justify-center text-[10px] font-bold ${i === 3 ? 'bg-blue-100 text-blue-600' : ''}`}>
                                                {i === 3 ? '+50' : ''}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Decorative blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/30 blur-3xl rounded-full -z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
