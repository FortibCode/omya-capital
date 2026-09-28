import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/Utils/gsapSetup';

/**
 * Premium animated counter using GSAP scrubbed ticker.
 * Counts from 0 to target when scrolled into view, with smooth easing.
 */
function AnimatedStat({ stat, index, containerRef }) {
    const numRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const numEl = numRef.current;
        const cardEl = cardRef.current;
        if (!numEl || !cardEl) return;

        const numericTarget = parseInt(stat.value, 10);

        const ctx = gsap.context(() => {
            // Card entrance — staggered by index
            gsap.fromTo(
                cardEl,
                { opacity: 0, y: 50, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.0,
                    delay: index * 0.18,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 82%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // Counter animation — only if numeric
            if (!isNaN(numericTarget)) {
                const proxy = { val: 0 };
                gsap.to(proxy, {
                    val: numericTarget,
                    duration: 1.8,
                    delay: index * 0.18 + 0.3,
                    ease: 'power2.out',
                    onUpdate: () => {
                        if (numEl) numEl.textContent = Math.round(proxy.val);
                    },
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 82%',
                        toggleActions: 'play none none none',
                    },
                });
            }
        });

        return () => ctx.revert();
    }, [index, stat.value]);

    return (
        <div
            ref={cardRef}
            className="group relative rounded-2xl p-8 overflow-hidden cursor-default transition-all duration-500 hover:-translate-y-2"
            style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(56,189,248,0.15)',
                opacity: 0,
            }}
        >
            {/* Top accent glow */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#38bdf8]/60 to-transparent" />

            {/* Hover ambient glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.12) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 space-y-4">
                <div className="text-[#38bdf8]">
                    <span className="font-black text-4xl sm:text-6xl tracking-tight text-white">
                        <span ref={numRef}>{isNaN(parseInt(stat.value, 10)) ? stat.value : 0}</span>
                        {stat.suffix}
                    </span>
                </div>
                <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-white">{stat.label}</h3>
                    <p className="text-xs text-white/45 leading-relaxed">{stat.desc}</p>
                </div>
            </div>
        </div>
    );
}

export default function LumoraStats() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    const STATS = [
        { value: 15, suffix: '+', label: "Années d'expérience cumulée", desc: "Expertise reconnue en finance d'entreprise." },
        { value: 100, suffix: '%', label: 'Engagement & Indépendance', desc: "Absence totale de conflit d'intérêts." },
        { value: 50, suffix: 'M$+', label: 'Volume de transactions visées', desc: 'Levées de fonds & financements structurés.' },
        { value: 360, suffix: '°', label: 'Accompagnement Global', desc: "De la réflexion stratégique à l'exécution." },
    ];

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            // Header reveal — eyebrow line, then title, then desc
            if (headerRef.current) {
                const children = Array.from(headerRef.current.querySelectorAll('[data-reveal]'));
                if (children.length) {
                    gsap.fromTo(
                        children,
                        { opacity: 0, y: 35 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                            stagger: 0.15,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: headerRef.current,
                                start: 'top 85%',
                                toggleActions: 'play none none none',
                            },
                        }
                    );
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-28 px-4 sm:px-8 lg:px-16 overflow-hidden bg-[#0B1F33]">
            {/* Deep Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#0B2A45]/80 to-[#0B1F33] pointer-events-none" />

            {/* Animated grid lines overlay */}
            <div
                className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div ref={headerRef} className="mb-16">
                    <div data-reveal className="flex items-center gap-3 mb-6" style={{ opacity: 0 }}>
                        <span className="text-xs font-black tracking-[0.3em] uppercase text-[#38bdf8]">04 / IMPACT</span>
                        <div className="h-px w-16 bg-[#38bdf8]/40" />
                    </div>
                    <h2 data-reveal className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3" style={{ opacity: 0 }}>
                        Par les <span className="text-[#38bdf8]">chiffres.</span>
                    </h2>
                    <p data-reveal className="text-sm text-white/50 leading-relaxed max-w-lg" style={{ opacity: 0 }}>
                        Des résultats concrets au service de nos clients et du développement économique régional.
                    </p>
                </div>

                {/* 4 Stats Grid — each card animates individually */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat, idx) => (
                        <AnimatedStat
                            key={idx}
                            stat={stat}
                            index={idx}
                            containerRef={gridRef}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
