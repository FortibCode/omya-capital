import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OmyaLogo from '@/Components/OmyaLogo';

export default function IntroLoader({ duration = 1800 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

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
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071526] text-white select-none overflow-hidden"
                >
                    {/* Ambient Radial Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/25 via-[#071526]/90 to-[#071526] pointer-events-none" />

                    {/* Central Content Box */}
                    <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
                        {/* Logo Reveal with Smooth Zoom & Brightness animation */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.88,
                                filter: 'blur(14px) brightness(1.8)',
                            }}
                            animate={{
                                opacity: 1,
                                scale: [0.88, 1.05, 1],
                                filter: 'blur(0px) brightness(1)',
                            }}
                            transition={{
                                duration: 1.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            <OmyaLogo variant="light" height={70} />
                        </motion.div>

                        {/* Minimalist Subtitle & Luminous Progress Beam */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '140px', opacity: 1 }}
                            transition={{
                                duration: 1.3,
                                delay: 0.3,
                                ease: 'easeInOut',
                            }}
                            className="h-[2px] mt-8 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full shadow-[0_0_15px_rgba(56,189,248,0.9)]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
