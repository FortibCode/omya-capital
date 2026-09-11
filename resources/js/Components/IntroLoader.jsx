import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function IntroLoader({ duration = 5000 }) {
    const [phase, setPhase] = useState('drawing'); // 'drawing' | 'hold' | 'exit'

    useEffect(() => {
        const holdTimer = setTimeout(() => setPhase('hold'), 2600);
        const exitTimer = setTimeout(() => setPhase('exit'), duration - 500);
        return () => { clearTimeout(holdTimer); clearTimeout(exitTimer); };
    }, [duration]);

    return (
        <AnimatePresence>
            {phase !== 'exit' && (
                <motion.div
                    key="intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white select-none"
                >
                    {/* Très léger filet de fond pour ne pas être trop "vide" */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(11,79,113,0.04) 0%, transparent 70%)',
                        }}
                    />

                    {/* Contenu central */}
                    <div className="relative flex flex-col items-center gap-6">

                        {/* Vrai logo OMYA CAPITAL, révélé par un balayage gauche → droite */}
                        <motion.div
                            className="overflow-hidden"
                            initial={{ clipPath: 'inset(0 100% 0 0)' }}
                            animate={{ clipPath: 'inset(0 0% 0 0)' }}
                            transition={{ duration: 1.3, delay: 0.2, ease: EASE_OUT }}
                        >
                            <img
                                src="/images/omya-capital-dark.png"
                                alt="OMYA CAPITAL"
                                className="w-[200px] sm:w-[240px] md:w-[280px] h-auto"
                            />
                        </motion.div>

                        {/* Séparateur fin qui apparaît juste après le logo */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.3, ease: EASE_OUT }}
                            className="h-px w-full origin-left"
                            style={{ background: 'linear-gradient(90deg, transparent, #0B4F71 40%, #0B4F71 60%, transparent)' }}
                        />

                        {/* Tagline discrète qui apparaît en dernier */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 1.6, ease: 'easeOut' }}
                            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                            Redéfinir l&rsquo;investissement en Afrique Centrale
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
