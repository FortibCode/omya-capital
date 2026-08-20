import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Shared institutional banner used at the top of every inner page.
 * Bleeds full-width behind the fixed, transparent-over-dark navbar
 * (hence the generous top padding), and hands off to the page body
 * via a soft wave divider — the same motif used in the footer.
 */
export default function PageHero({ eyebrow, icon: Icon, title, description, children }) {
    return (
        <section className="relative overflow-hidden bg-[#0B1F33] text-white pt-40 sm:pt-44 lg:pt-52 pb-20 sm:pb-24">
            {/* Subtle institutional texture */}
            <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#0B2A45] to-[#0B4F71] opacity-90 pointer-events-none" />
            <div className="absolute -right-32 -top-32 w-[520px] h-[520px] rounded-full bg-[#0B4F71]/40 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {eyebrow && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.16em] mb-7"
                    >
                        {Icon && <Icon className="w-3.5 h-3.5 text-sky-200" />}
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
                        className="text-sky-100/90 text-base leading-relaxed max-w-2xl mx-auto"
                    >
                        {description}
                    </motion.p>
                )}

                {children}
            </div>

            {/* Wave divider — matches the footer's motif */}
            <div className="w-full overflow-hidden leading-none absolute -bottom-1 left-0 right-0 z-10 pointer-events-none">
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block w-full h-10 sm:h-14 fill-[#F8FAFC]">
                    <path d="M0,0 C300,60 900,0 1200,40 L1200,60 L0,60 Z" />
                </svg>
            </div>
        </section>
    );
}
