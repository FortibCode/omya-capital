import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onDone, duration = 2000 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
            onDone?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onDone]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="intro-loader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                    }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white select-none overflow-hidden"
                >
                    {/* Central Official Logo Reveal */}
                    <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center space-y-6">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                            }}
                            animate={{
                                opacity: 1,
                                scale: [0.9, 1.04, 1],
                            }}
                            transition={{
                                duration: 1.0,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex items-center justify-center"
                        >
                            <img
                                src="/images/omya-capital-dark.png"
                                alt="OMYA CAPITAL"
                                className="h-16 sm:h-24 w-auto select-none"
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#0B2A45]"
                        >
                            Redéfinir l’investissement en Afrique Centrale
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
