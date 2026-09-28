import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/Utils/gsapSetup';

export default function LumoraWork() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    const PROJECTS = [
        {
            id: '01',
            category: 'FINANCEMENT DE PROJET',
            title: "Mobilisation de fonds pour projet d'infrastructure majeure",
            amount: 'Secteur Énergie & Transport',
            year: '2024',
            image: '/images/card-infrastructure.png',
            tags: ['Levée de Fonds', 'Secteur Public', 'CEMAC'],
            accentColor: '#38bdf8',
        },
        {
            id: '02',
            category: 'FUSIONS & ACQUISITIONS',
            title: "Conseil exclusif lors de la restructuration d'un groupe bancaire",
            amount: 'Secteur Bancaire & Assurances',
            year: '2024',
            image: '/images/card-banking.png',
            tags: ['M&A', 'Due Diligence', 'Gouvernance'],
            accentColor: '#f59e0b',
        },
        {
            id: '03',
            category: 'CONSEIL STRATÉGIQUE',
            title: 'Accompagnement de filiales internationales en Afrique Centrale',
            amount: 'Développement Régional',
            year: '2023',
            image: '/images/card-strategy.png',
            tags: ['Stratégie', 'Compliance', 'Expansion'],
            accentColor: '#a78bfa',
        },
        {
            id: '04',
            category: 'RESTRUCTURATION',
            title: "Optimisation du bilan et réorganisation des dettes d'un groupe privé",
            amount: 'Agritech & Industrie',
            year: '2023',
            image: '/images/bg-stats-finance.png',
            tags: ['Dette Corporate', 'Restructuration', 'Audit'],
            accentColor: '#34d399',
        },
    ];

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            // Header animation — fade + slide down
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current.children,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.0,
                        stagger: 0.18,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            // Cards — stagger 1-by-1 from bottom with slight scale
            const cards = cardsRef.current.filter(Boolean);
            if (cards.length) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.05,
                        stagger: 0.22,          // suspenseful 1-by-1
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cards[0],
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                );

                // Subtle parallax on each card image
                cards.forEach((card) => {
                    const img = card.querySelector('img');
                    if (img) {
                        gsap.fromTo(
                            img,
                            { yPercent: -8 },
                            {
                                yPercent: 8,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: card,
                                    start: 'top bottom',
                                    end: 'bottom top',
                                    scrub: 1.5,
                                },
                            }
                        );
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-28 px-4 sm:px-8 lg:px-16 bg-[#050d1a]">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                    style={{ opacity: 0 }}
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-black tracking-[0.3em] uppercase text-white/30">02 / RÉALISATIONS</span>
                            <div className="h-px w-16 bg-white/10" />
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                            Opérations <span className="text-[#38bdf8]">Phares</span>
                        </h2>
                        <p className="text-sm text-white/40 mt-2 max-w-md">
                            Aperçu de nos missions récentes de conseil et de structuration financière.
                        </p>
                    </div>

                    <a
                        href={route('services.index')}
                        className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#38bdf8] hover:text-white transition-colors shrink-0"
                    >
                        <span>VOIR TOUS LES SERVICES</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                </div>

                {/* 4-Card Immersive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROJECTS.map((item, idx) => (
                        <div
                            key={item.id}
                            ref={(el) => (cardsRef.current[idx] = el)}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-600 hover:-translate-y-3 hover:shadow-2xl"
                            style={{ boxShadow: `0 4px 40px rgba(0,0,0,0.5)`, opacity: 0 }}
                        >
                            {/* Real Background Image */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-75 contrast-110"
                                />
                                {/* Rich dark gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                                {/* Accent color tint from bottom */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(to top, ${item.accentColor}18 0%, transparent 60%)` }}
                                />
                            </div>

                            {/* Card Content */}
                            <div className="relative z-10 flex flex-col justify-between min-h-[320px] p-8 lg:p-10">
                                {/* Card Top */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
                                            style={{
                                                color: item.accentColor,
                                                background: `${item.accentColor}18`,
                                                border: `1px solid ${item.accentColor}30`,
                                            }}
                                        >
                                            {item.id}
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                                            {item.category}
                                        </span>
                                    </div>
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            background: 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                        }}
                                    >
                                        <ArrowUpRight
                                            className="w-5 h-5 text-white/60 transition-all duration-300 group-hover:rotate-45"
                                        />
                                    </div>
                                </div>

                                {/* Card Bottom */}
                                <div className="space-y-4">
                                    <div>
                                        <h3
                                            className="text-xl sm:text-2xl font-extrabold text-white leading-snug tracking-tight mb-1 transition-colors duration-300"
                                        >
                                            {item.title}
                                        </h3>
                                        <p className="text-sm font-semibold text-white/50">
                                            {item.amount} <span className="text-white/25">•</span> {item.year}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                                                style={{
                                                    color: item.accentColor,
                                                    background: `${item.accentColor}12`,
                                                    border: `1px solid ${item.accentColor}25`,
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
