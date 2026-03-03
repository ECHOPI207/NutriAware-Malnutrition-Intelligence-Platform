import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Terms: React.FC = () => {
    const { language } = useLanguage();

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-secondary/10 rounded-full">
                            <FileText className="w-12 h-12 text-secondary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="gradient-text">
                            {language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
                        </span>
                    </h1>
                </motion.div>

                <Card>
                    <CardContent className="p-8 prose dark:prose-invert max-w-none">
                        {language === 'ar' ? (
                            <div className="space-y-6 text-right" dir="rtl">
                                <p>مرحبًا بك في NutriAware. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بالشروط والأحكام التالية:</p>

                                <h3>1. إخلاء المسؤولية الطبية</h3>
                                <p className="text-red-500 font-semibold">تنبيه هام: المحتوى والأدوات المتوفرة على هذا الموقع هي للأغراض التعليمية والمعلوماتية فقط ولا تغني عن التوجيه الغذائي المتخصص.</p>
                                <p>لا يجب استخدام المعلومات الواردة هنا لتشخيص أو علاج أي حالة صحية دون استشارة أخصائي تغذية معتمد.</p>

                                <h3>2. استخدام الأدوات</h3>
                                <p>أدوات الذكاء الاصطناعي (مثل حاسبة مؤشر كتلة الجسم والمساعد الذكي) تقدم تقديرات بناءً على البيانات المدخلة والمعايير العامة. النتائج قد لا تكون دقيقة بنسبة 100% لجميع الحالات الفردية.</p>

                                <h3>3. حقوق الملكية الفكرية</h3>
                                <p>جميع المحتويات، بما في ذلك النصوص، الصور، والشعارات، هي ملك لـ NutriAware ومحفوظة بموجب حقوق النشر.</p>

                                <h3>4. التعديلات</h3>
                                <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. استمرارك في استخدام الموقع يعني قبولك لهذه التعديلات.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <p>Welcome to NutriAware. By using this website, you agree to comply with the following terms and conditions:</p>

                                <h3>1. Medical Disclaimer</h3>
                                <p className="text-red-500 font-semibold">Important: The content and tools provided on this website are for educational and informational purposes only and do not replace professional medical advice.</p>
                                <p>Do not use the information here to diagnose or treat any health condition without consulting a qualified physician.</p>

                                <h3>2. Use of Tools</h3>
                                <p>Our AI tools (such as the BMI Calculator and Chat Assistant) provide estimates based on input data and general standards. Results may not be 100% accurate for every individual case.</p>

                                <h3>3. Intellectual Property</h3>
                                <p>All content, including text, images, and logos, is the property of NutriAware and is protected by copyright laws.</p>

                                <h3>4. Modifications</h3>
                                <p>We reserve the right to modify these terms at any time. Your continued use of the website constitutes acceptance of these changes.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Terms;
