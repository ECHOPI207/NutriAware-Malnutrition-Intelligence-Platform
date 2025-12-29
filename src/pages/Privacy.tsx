import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Privacy: React.FC = () => {
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
                        <div className="p-4 bg-primary/10 rounded-full">
                            <Shield className="w-12 h-12 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="gradient-text">
                            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                        </span>
                    </h1>
                </motion.div>

                <Card>
                    <CardContent className="p-8 prose dark:prose-invert max-w-none">
                        {language === 'ar' ? (
                            <div className="space-y-6 text-right" dir="rtl">
                                <p>آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>

                                <h3>1. مقدمة</h3>
                                <p>نحن في NutriAware نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام موقعنا وأدواتنا الذكية.</p>

                                <h3>2. البيانات التي نجمعها</h3>
                                <p>قد نجمع المعلومات التالية عند استخدامك لأدوات الذكاء الاصطناعي (مثل حاسبة مؤشر كتلة الجسم):</p>
                                <ul className="list-disc pr-6">
                                    <li>بيانات غير شخصية مثل العمر، الوزن، والطول (لأغراض الحساب فقط).</li>
                                    <li>استفسارات المحادثة مع المساعد الذكي.</li>
                                </ul>
                                <p><strong>ملاحظة هامة:</strong> نحن لا نقوم بتخزين أي بيانات شخصية محددة للهوية بشكل دائم.</p>

                                <h3>3. كيفية استخدام البيانات</h3>
                                <p>نستخدم البيانات المدخلة حصرياً لـ:</p>
                                <ul className="list-disc pr-6">
                                    <li>تقديم نتائج دقيقة لحساباتك الصحية.</li>
                                    <li>تحسين جودة إجابات المساعد الذكي.</li>
                                </ul>

                                <h3>4. مشاركة البيانات</h3>
                                <p>نحن لا نشارك ولا نبيع بياناتك لأي أطراف خارجية. جميع العمليات الحسابية تتم بشكل آمن.</p>

                                <h3>5. اتصل بنا</h3>
                                <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر صفحة "تواصل معنا".</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <p>Last Updated: {new Date().toLocaleDateString('en-US')}</p>

                                <h3>1. Introduction</h3>
                                <p>At NutriAware, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and AI tools.</p>

                                <h3>2. Information We Collect</h3>
                                <p>We may collect the following types of information when you use our AI tools (e.g., BMI Calculator):</p>
                                <ul className="list-disc pl-6">
                                    <li>Non-personal data such as age, weight, and height (for calculation purposes only).</li>
                                    <li>Chat queries sent to our AI assistant.</li>
                                </ul>
                                <p><strong>Important:</strong> We do not permanently store any personally identifiable information.</p>

                                <h3>3. How We Use Your Information</h3>
                                <p>We use the data you provide exclusively to:</p>
                                <ul className="list-disc pl-6">
                                    <li>Provide accurate health calculation results.</li>
                                    <li>Improve the quality of our AI assistant's responses.</li>
                                </ul>

                                <h3>4. Data Sharing</h3>
                                <p>We do not share or sell your data to any third parties. All calculations are processed securely.</p>

                                <h3>5. Contact Us</h3>
                                <p>If you have any questions about this Privacy Policy, please contact us via our "Contact" page.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Privacy;
