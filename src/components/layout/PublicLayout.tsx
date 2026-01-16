
import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const PublicLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Suspense fallback={<LoadingSpinner size="lg" centered />}>
                    <AnimatePresence mode="wait">
                        <motion.div
                        key={useLocation().pathname}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="flex-grow"
                    >
                        {useOutlet()}
                    </motion.div>
                </AnimatePresence>
                </Suspense>
            </main>
            <Footer />
            <Toaster />
            <Analytics />
        </div>
    );
};

export default PublicLayout;
