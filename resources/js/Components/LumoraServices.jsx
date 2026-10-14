import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage, translateService } from '@/Context/LanguageContext';
import RevealOnScroll from '@/Components/RevealOnScroll';

export default function LumoraServices({ services = [] }) {
    const { t, lang } = useLanguage();

    // Nothing about the services is written here. Which ones exist and in what
    // order comes from the `services` table, handed down by HomeController;
    // their wording comes from the shared translations, keyed by slug, exactly
    // as the Services page and the footer read them.
    const items = services.map((service) => translateService(service, lang));
    if (items.length === 0) return null;

    // min-h-screen: same reason as the À Propos panel — a stacked panel
    // shorter than the viewport exposes the one behind it.
    return (
        <section className="relative overflow-hidden text-white min-h-screen flex items-center shadow-[0_-24px_60px_rgba(0,0,0,0.55)]">
            {/* Full-bleed brand key visual, same treatment as the À Propos section
                above so the two read as one continuous dark block. */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/bg-services-omya.jpeg')" }}
            />
            {/* The artwork's own OMYA CAPITAL mark sits dead centre in near-white,
                and the service descriptions ran straight across it — measured at
                1.1:1. This tint takes them to 7:1 and still shows the artwork. */}
            <div aria-hidden="true" className="absolute inset-0 bg-[#0A0A0C]/70" />

            <div className="relative z-10 w-full max-w-[1150px] mx-auto px-5 sm:px-8 py-16 lg:py-20">

                {/* ── Section heading ── */}
                <RevealOnScroll direction="down" delay={0.1} duration={0.9} className="mb-10 lg:mb-14 text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                        {t.services.heroTitle}
                    </h2>
                </RevealOnScroll>

                {/* ── Services, one row each: the name on the left, what it
                       covers on the right, straight on the section artwork. ── */}
                <div>
                    {items.map((service, idx) => {
                        return (
                            <RevealOnScroll
                                key={service.slug ?? service.id ?? idx}
                                direction="up"
                                delay={0.15 + idx * 0.1}
                                duration={0.9}
                                start="top 95%"
                            >
                                <div className="grid md:grid-cols-12 gap-3 md:gap-10 py-7 md:py-9">
                                    <div className="md:col-span-5">
                                        <h3 className="text-xl sm:text-2xl font-bold leading-snug text-white">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Columns 7 to 12, so the block ends flush
                                        with the right edge instead of sitting
                                        mid-width. */}
                                    <div className="md:col-span-6 md:col-start-7">
                                        <p className="text-base md:text-lg text-white/85 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* ── CTA ── */}
                <RevealOnScroll direction="up" delay={0.6} duration={0.9} start="top 95%" className="text-center mt-12">
                    <Link
                        href={route('services.index')}
                        style={{ '--pill-ink': '#0B1F33' }}
                        className="pill-ghost group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/60 bg-transparent text-white text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        <span>VOIR TOUS NOS SERVICES</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </RevealOnScroll>

            </div>
        </section>
    );
}
