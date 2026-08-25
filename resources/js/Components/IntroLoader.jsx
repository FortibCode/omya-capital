import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_OUT = [0.22, 1, 0.36, 1];

/*
  Chaque lettre de OMYA est un <path> SVG distinct.
  On anime le strokeDashoffset pour simuler un tracé à la main.
  Ensuite "CAPITAL" apparaît lettre par lettre.
*/

// Longueurs approximatives des paths (pathLength normalisé à 1)
const OMYA_PATHS = [
    {
        // O — double arc
        d: 'M 28 8 A 20 20 0 0 1 28 42 M 16 8 A 20 20 0 0 0 16 42',
        strokeWidth: 6,
        delay: 0,
        duration: 0.7,
    },
    {
        // M
        d: 'M 52 42 V 8 L 68 28 L 84 8 V 42',
        strokeWidth: 5.5,
        delay: 0.55,
        duration: 0.65,
    },
    {
        // Y
        d: 'M 100 8 L 114 24 V 42 M 128 8 L 114 24',
        strokeWidth: 5.5,
        delay: 1.05,
        duration: 0.6,
    },
    {
        // A
        d: 'M 144 42 L 160 8 L 176 42',
        strokeWidth: 5.5,
        delay: 1.5,
        duration: 0.5,
    },
];

const CAPITAL_LETTERS = ['C', 'A', 'P', 'I', 'T', 'A', 'L'];

// Un seul path SVG animé avec pathLength
function AnimatedPath({ d, strokeWidth, delay, duration }) {
    return (
        <motion.path
            d={d}
            stroke="#0B2A42"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
                pathLength: { duration, delay, ease: 'easeInOut' },
                opacity: { duration: 0.01, delay },
            }}
        />
    );
}

export default function IntroLoader({ duration = 5000 }) {
    const [phase, setPhase] = useState('drawing'); // 'drawing' | 'hold' | 'exit'

    // Quand CAPITAL finit d'apparaître (~2.45s) on passe en hold, puis exit
    useEffect(() => {
        const holdTimer = setTimeout(() => setPhase('hold'), 2600);
        const exitTimer = setTimeout(() => setPhase('exit'), duration - 500);
        return () => { clearTimeout(holdTimer); clearTimeout(exitTimer); };
    }, [duration]);

    // Délai d'apparition de chaque lettre de CAPITAL (commence après A de OMYA)
    const capitalStart = 2.1; // secondes depuis le début
    const capitalLetterDelay = (i) => capitalStart + i * 0.1;

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

                        {/* SVG principal — OMYA dessiné à la main */}
                        <svg
                            viewBox="0 0 192 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[260px] sm:w-[320px] md:w-[380px]"
                            style={{ overflow: 'visible' }}
                        >
                            {OMYA_PATHS.map((p, i) => (
                                <AnimatedPath key={i} {...p} />
                            ))}
                        </svg>

                        {/* Séparateur fin qui apparaît juste avant CAPITAL */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.95, ease: EASE_OUT }}
                            className="h-px w-full origin-left"
                            style={{ background: 'linear-gradient(90deg, transparent, #0B4F71 40%, #0B4F71 60%, transparent)' }}
                        />

                        {/* CAPITAL — lettre par lettre */}
                        <div className="flex items-center gap-[6px] sm:gap-[8px] overflow-hidden">
                            {CAPITAL_LETTERS.map((letter, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: capitalLetterDelay(i),
                                        ease: EASE_OUT,
                                    }}
                                    className="text-[13px] sm:text-[15px] font-bold tracking-[0.3em] text-[#0B4F71]"
                                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* Tagline discrète qui apparaît en dernier */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 2.85, ease: 'easeOut' }}
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
