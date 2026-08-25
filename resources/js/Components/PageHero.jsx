import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Shared institutional banner used at the top of every inner page.
 * Full-width dark navy background with gradient, dot texture, and wave divider.
 */
export default function PageHero({ eyebrow, icon: Icon, title, description, children }) {
    return (
        <section className="relative overflow-hidden bg-[#0B1F33] text-white pt-40 sm:pt-44 lg:pt-52 pb-20 sm:pb-24">
            {/* Subtle dot texture */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            {/* Deep gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#0B2A45] to-[#0B4F71] opacity-90 pointer-events-none" />
            {/* Glow orbs */}
            <div className="absolute -right-32 -top-32 w-[520px] h-[520px] rounded-full bg-[#0B4F71]/35 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 bottom-0 w-[320px] h-[320px] rounded-full bg-[#0B2A45]/50 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {eyebrow && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.16em] mb-7"
                    >
                        {Icon && <Icon className="w-3.5 h-3.5 text-white/70" />}
                        <span>{eyebrow}</span>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight"
                >
                    {title}
                </motion.h1>

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                        className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto"
                    >
                        {description}
                    </motion.p>
                )}

                {children}
            </div>

            {/* Wave divider — transitions to white background below */}
            <div className="w-full overflow-hidden leading-none absolute -bottom-1 left-0 right-0 z-10 pointer-events-none">
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block w-full h-10 sm:h-14 fill-white">
                    <path d="M0,0 C300,60 900,0 1200,40 L1200,60 L0,60 Z" />
                </svg>
            </div>
        </section>
    );
}
