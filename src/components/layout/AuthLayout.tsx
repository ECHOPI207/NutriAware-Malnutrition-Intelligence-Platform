
import React from 'react';
import { useOutlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const AuthLayout: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <div className="min-h-screen flex" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <Link to="/" className="inline-block mb-8">
                            <span className="text-3xl font-bold gradient-text">NutriAware</span>
                        </Link>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={useLocation().pathname}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Suspense fallback={<LoadingSpinner size="md" centered className="py-12" />}>
                                {useOutlet()}
                            </Suspense>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Image Side */}
            <div className="hidden lg:block lg:w-1/2 relative bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80)'
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-12 z-20 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">{t('hero.title')}</h2>
                        <p className="text-lg opacity-90">{t('hero.subtitle')}</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
