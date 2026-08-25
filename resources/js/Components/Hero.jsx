import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage, translateMember } from '@/Context/LanguageContext';
import CardShuffleDeck from '@/Components/CardShuffleDeck';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
    const { t, lang } = useLanguage();

    const heroCards = [
        { id: 1, image: '/images/christelle-basilua-semy.jpeg', name: 'Christelle BASILUA SEMY' },
        { id: 2, image: '/images/suzic-iwolo.jpeg', name: 'Suzick TOMA' },
        { id: 3, image: '/images/louis-raymond-gomes.jpeg', name: 'Louis-Raymond GOMES' },
        { id: 4, image: '/images/sarah-bonana.jpeg', name: 'Sarah BONANA' },
    ].map((c) => ({
        id: c.id,
        image: c.image,
        title: c.name,
        subtitle: (translateMember({ name: c.name, role_title: '' }, lang).role_title || '').toUpperCase(),
    }));

    return (
        <section
            aria-label="OMYA Capital Hero"
            className="relative overflow-hidden bg-[#0B1F33] text-white min-h-screen flex items-center pt-28 pb-20"
        >
            {/* ── Background Textures & Animated Ambient Aura ── */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            {/* Floating glowing light orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.35, 0.55, 0.35],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-40 top-1/4 w-[550px] h-[550px] rounded-full bg-[#0B4F71]/40 blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.25, 0.45, 0.25],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#0B4F71]/25 blur-3xl pointer-events-none"
            />
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-white/5 blur-3xl pointer-events-none" />

            {/* Decorative progress rail */}
            <div className="hidden lg:flex flex-col items-center gap-3 absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 z-20">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        animate={i === 0 ? { height: [24, 32, 24] } : {}}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className={`rounded-full transition-all duration-300 ${
                            i === 0 ? 'w-2 h-7 bg-white shadow-lg shadow-white/40' : 'w-2 h-2 bg-white/25'
                        }`}
                    />
                ))}
            </div>

            <div className="max-w-[1550px] mx-auto px-4 sm:px-6 xl:px-12 relative z-10 w-full pt-16 lg:pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* ── Left Column: Institutional Message & Actions (7 cols) ── */}
                    <div className="lg:col-span-7 text-center lg:text-left">
                        {/* Eyebrow line */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                            className="flex items-center justify-center lg:justify-start gap-3 mb-8"
                        >
                            <span className="w-10 h-px bg-white/40" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white">OMYA CAPITAL</span>
                        </motion.div>

                        {/* Title Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.35, ease: EASE }}
                            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-black leading-[1.3] tracking-tight text-white [text-wrap:balance]"
                        >
                            {t.hero.heading}
                        </motion.h1>

                        {/* Subtitle / Tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                            className="mt-6 flex items-center justify-center lg:justify-start gap-3"
                        >
                            <span className="w-8 h-0.5 bg-gradient-to-r from-white to-[#0B4F71] rounded-full" />
                            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.22em] text-white/80">
                                {t.hero.subheading}
                            </p>
                        </motion.div>

                        {/* CTA Buttons with Light Shimmer */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
                            className="mt-11 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Link
                                href={route('services.index')}
                                prefetch
                                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-white hover:bg-white/95 text-[#0B1F33] font-extrabold text-sm py-4 px-8 rounded-xl shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-white/10"
                            >
                                {/* Passing Light Shimmer overlay */}
                                <motion.div
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                                />
                                <span className="relative z-10">{t.hero.discoverServices}</span>
                                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href={route('contact')}
                                prefetch
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/60 font-extrabold text-sm py-4 px-8 rounded-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
                            >
                                <span>{t.hero.contactUs}</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── Right Column: 3D Card Shuffle Deck with Real Team Photos from public/images ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
                        className="lg:col-span-5 relative w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end"
                    >
                        <CardShuffleDeck cards={heroCards} interval={3500} hint={t.hero.shuffleHint} />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
