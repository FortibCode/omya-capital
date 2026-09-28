import React, { useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { gsap } from '@/Utils/gsapSetup';
import CardShuffleDeck from '@/Components/CardShuffleDeck';
import { useLanguage, translateMember } from '@/Context/LanguageContext';

export default function LumoraHero({ onOpenModal }) {
    const { t, lang } = useLanguage();
    const sectionRef = useRef(null);

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

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.05 });

            // 1) Watermark — rises softly
            const watermark = section.querySelector('[data-hero-watermark]');
            if (watermark) {
                tl.fromTo(watermark, { opacity: 0, y: 30 }, { opacity: 0.8, y: 0, duration: 1.4, ease: 'power3.out' }, 0);
            }

            // 2) Top metadata bar chips — slide in from top, staggered
            const chipItems = section.querySelectorAll('[data-hero-chip]');
            if (chipItems.length) {
                tl.fromTo(
                    chipItems,
                    { opacity: 0, y: -16 },
                    { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' },
                    0.2
                );
            }

            // 3) Eyebrow badge — fade up
            const eyebrow = section.querySelector('[data-hero-eyebrow]');
            if (eyebrow) {
                tl.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.45);
            }

            // 4) H1 lines — each line slides up from clip (suspenseful)
            const h1Lines = section.querySelectorAll('[data-hero-line]');
            if (h1Lines.length) {
                tl.fromTo(
                    h1Lines,
                    { y: '105%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.05, stagger: 0.14, ease: 'power4.out' },
                    0.6
                );
            }

            // 5) Subtitle paragraph words — fade + slide up
            const subtitle = section.querySelector('[data-hero-subtitle]');
            if (subtitle) {
                tl.fromTo(subtitle, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.9);
            }

            // 6) CTA buttons — fade + slide up together
            const ctas = section.querySelector('[data-hero-ctas]');
            if (ctas) {
                tl.fromTo(ctas, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 1.1);
            }

            // 7) Card deck (right column) — scale + fade
            const deck = section.querySelector('[data-hero-deck]');
            if (deck) {
                tl.fromTo(
                    deck,
                    { opacity: 0, scale: 0.94, y: 30 },
                    { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' },
                    0.7
                );
            }

            // 8) Partner strip — slide + fade
            const partnerStrip = section.querySelector('[data-hero-partners]');
            if (partnerStrip) {
                const items = partnerStrip.querySelectorAll('[data-partner-item]');
                tl.fromTo(
                    items,
                    { opacity: 0, y: 14 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out' },
                    1.3
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-label="Lumora Hero OMYA"
            className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-4 sm:px-8 lg:px-16 overflow-hidden bg-white text-[#0a0a0a]"
        >
            {/* ── Background Giant Watermark ── */}
            <div
                data-hero-watermark
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none select-none font-black text-[18vw] leading-none text-[#f1f0ee] z-0"
                style={{ letterSpacing: '-0.05em', opacity: 0 }}
            >
                OMYA
            </div>

            {/* Ambient subtle light glow */}
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-3xl pointer-events-none" />

            {/* ── Top Bar Metadata Chips ── */}
            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6 mb-12">
                <div data-hero-chip className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/60" style={{ opacity: 0 }}>
                    <span className="w-2 h-2 rounded-full bg-[#0B4F71] animate-pulse" />
                    <span>BRAZZAVILLE, CONGO</span>
                    <span className="text-black/20">•</span>
                    <span>AFRIQUE CENTRALE</span>
                </div>

                <div data-hero-chip className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-black/70" style={{ opacity: 0 }}>
                    <span className="px-3 py-1 bg-[#f1f0ee] rounded-full">INDEPENDENT STUDIO</span>
                    <span className="px-3 py-1 bg-[#0a0a0a] text-white rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#38bdf8]" />
                        ADVISORY &amp; CAPITAL
                    </span>
                </div>
            </div>

            {/* ── Main Hero Content ── */}
            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Column (7 cols) */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Eyebrow badge */}
                    <div
                        data-hero-eyebrow
                        className="inline-block px-3.5 py-1.5 rounded-full bg-[#f1f0ee] text-[#0a0a0a] text-xs font-bold uppercase tracking-widest border border-black/5"
                        style={{ opacity: 0 }}
                    >
                        OMYA CAPITAL — ADVISORY
                    </div>

                    {/* Headline — line-by-line clip reveal */}
                    <div className="space-y-2 overflow-hidden">
                        {['CONSEIL FINANCIER', 'ET STRATÉGIQUE', 'DE PREMIER PLAN'].map((line, i) => (
                            <div key={i} className="overflow-hidden">
                                <h1
                                    data-hero-line
                                    className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0a0a0a] leading-[1.08]"
                                    style={{ opacity: 0, transform: 'translateY(105%)' }}
                                >
                                    {line}
                                </h1>
                            </div>
                        ))}
                    </div>

                    {/* Subtitle */}
                    <p
                        data-hero-subtitle
                        className="text-base sm:text-lg text-black/70 max-w-2xl font-medium leading-relaxed"
                        style={{ opacity: 0 }}
                    >
                        {t.hero.heading}
                    </p>

                    {/* CTA Actions */}
                    <div
                        data-hero-ctas
                        className="flex flex-wrap items-center gap-4 pt-4"
                        style={{ opacity: 0 }}
                    >
                        <button
                            onClick={onOpenModal}
                            className="group relative overflow-hidden inline-flex items-center gap-3 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white font-extrabold text-sm py-4 px-8 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <span>Démarrer un projet</span>
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                                <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                        </button>

                        <Link
                            href={route('services.index')}
                            className="inline-flex items-center gap-2 bg-[#f1f0ee] hover:bg-[#e4e2de] text-[#0a0a0a] font-bold text-sm py-4 px-8 rounded-full border border-black/5 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <span>Découvrir nos services</span>
                            <ArrowUpRight className="w-4 h-4 text-black/60" />
                        </Link>
                    </div>
                </div>

                {/* Right Column (5 cols) — Card Deck */}
                <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:mx-0">
                    <div data-hero-deck style={{ opacity: 0 }}>
                        <CardShuffleDeck cards={heroCards} interval={3500} hint={t.hero.shuffleHint} />
                    </div>
                </div>
            </div>

            {/* ── Partner Strip Footer ── */}
            <div
                data-hero-partners
                className="relative z-10 max-w-7xl mx-auto w-full pt-16 mt-16 border-t border-black/10 flex flex-wrap items-center justify-between gap-6"
            >
                <span data-partner-item className="text-xs font-bold uppercase tracking-widest text-black/40" style={{ opacity: 0 }}>
                    PARTENAIRES &amp; INSTITUTIONS CONFIANTS
                </span>
                <div className="flex flex-wrap items-center gap-8 text-xs font-bold text-black/60 tracking-wider">
                    {['RADISSON BLU', 'SG CONGO', 'ECOBANK', 'BDEAC', 'MINISTÈRE DES FINANCES'].map((p) => (
                        <span
                            key={p}
                            data-partner-item
                            className="hover:text-black transition-colors"
                            style={{ opacity: 0 }}
                        >
                            {p}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
