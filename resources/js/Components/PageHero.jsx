import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Shared institutional banner used at the top of every inner page.
 * Cinematic background image with dark gradient overlays, subtle grid, and wave divider.
 */
export default function PageHero({ title, description, children }) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F33] via-[#0B2A45] to-[#0B4F71] text-white pt-40 sm:pt-44 lg:pt-52 pb-24 sm:pb-28">
            {/* Subtle grid texture */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            {/* Glow orbs */}
            <div className="absolute -right-32 -top-32 w-[520px] h-[520px] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)' }} />
            <div className="absolute -left-20 bottom-0 w-[320px] h-[320px] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(11,79,113,0.3) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight text-balance"
                >
                    {title}
                </motion.h1>

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
                        className="mt-6 text-white/80 text-lg leading-relaxed max-w-3xl mx-auto font-medium"
                    >
                        {description}
                    </motion.p>
                )}

                {children}
            </div>

            {/* Wave divider */}
            <div className="w-full overflow-hidden leading-none absolute -bottom-1 left-0 right-0 z-10 pointer-events-none">
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block w-full h-10 sm:h-14 fill-[#0B1F33]">
                    <path d="M0,0 C300,60 900,0 1200,40 L1200,60 L0,60 Z" />
                </svg>
            </div>
        </section>
    );
}

