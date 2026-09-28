import React, { useRef } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll from '@/Components/RevealOnScroll';
import DrawnPath from '@/Components/DrawnPath';
import { useLanguage, translateService } from '@/Context/LanguageContext';
import { Landmark, Handshake, RefreshCcw, Compass, ArrowRight, Briefcase } from 'lucide-react';

const ICONS = {
    'financement-de-projets': Landmark,
    'fusions-acquisitions': Handshake,
    restructuration: RefreshCcw,
    'conseil-strategique': Compass,
};

const SERVICE_IMAGES = {
    'financement-de-projets': '/images/card-infrastructure.png',
    'fusions-acquisitions': '/images/card-banking.png',
    restructuration: '/images/bg-stats-finance.png',
    'conseil-strategique': '/images/card-strategy.png',
};

const SERVICE_ACCENTS = [
    { border: 'rgba(56, 189, 248, 0.4)', tag: '#38bdf8' },
    { border: 'rgba(245, 158, 11, 0.4)', tag: '#f59e0b' },
    { border: 'rgba(167, 139, 250, 0.4)', tag: '#a78bfa' },
    { border: 'rgba(52, 211, 153, 0.4)', tag: '#34d399' },
];

export default function Index({ services = [] }) {
    const { t, lang } = useLanguage();
    const localizedServices = services.map((srv) => translateService(srv, lang));
    const journeyRef = useRef(null);

    return (
        <>
            <Head title={t.nav.services} />

            <PageHero
                title={t.services.heroTitle}
                description={t.services.heroDescription}
            />

            {/* Services timeline with sleek dark background */}
            <section className="relative bg-[#0B1F33] py-20 lg:py-32 overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33] via-[#0B2A45]/70 to-[#0B1F33] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div ref={journeyRef} className="relative">
                        <div className="hidden lg:block text-[#38bdf8]/30">
                            <DrawnPath nodeCount={services.length} orientation="vertical" containerRef={journeyRef} />
                        </div>

                        <div className="space-y-12">
                            {localizedServices.map((srv, idx) => {
                                const IconComp = ICONS[srv.slug] || Briefcase;
                                const isLeft = idx % 2 === 0;
                                const accent = SERVICE_ACCENTS[idx % SERVICE_ACCENTS.length];

                                return (
                                    <div
                                        key={srv.id}
                                        id={srv.slug}
                                        className={`scroll-mt-32 lg:flex lg:min-h-[340px] lg:items-center ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}
                                    >
                                        <RevealOnScroll direction={isLeft ? 'right' : 'left'} className="relative z-10 w-full lg:w-[48%] py-4">
                                            <div
                                                className="group relative rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-xl shadow-2xl border"
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    borderColor: accent.border,
                                                }}
                                            >
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <span
                                                            className="w-11 h-11 rounded-full text-white font-black text-sm flex items-center justify-center shrink-0 shadow-lg"
                                                            style={{ background: `linear-gradient(135deg, ${accent.tag}, #0B4F71)` }}
                                                        >
                                                            {String(idx + 1).padStart(2, '0')}
                                                        </span>
                                                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-lg">
                                                            <IconComp className="w-6 h-6 text-white" />
                                                        </div>
                                                        <h3 className="text-xl font-extrabold text-white leading-snug">{srv.title}</h3>
                                                    </div>

                                                    <p className="text-sm text-white/80 font-normal leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md mb-6">
                                                        {srv.description}
                                                    </p>

                                                    <Link
                                                        href={route('contact')}
                                                        className="group/btn inline-flex items-center gap-2 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all duration-300 shadow-xl border border-white/20 hover:border-white/40"
                                                        style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))` }}
                                                    >
                                                        <span>{t.services.solicitBtn}</span>
                                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 text-[#38bdf8]" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </RevealOnScroll>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative bg-[#0B1F33] py-24 lg:py-32 overflow-hidden border-t border-white/10">
                <RevealOnScroll className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center relative z-10 bg-gradient-to-r from-[#0B2A45] to-[#0B4F71] border border-white/15 p-12 sm:p-16 rounded-3xl backdrop-blur-xl shadow-2xl">
                    <span className="text-[#38bdf8] text-xs font-extrabold uppercase tracking-[0.25em] mb-4 block">SUR-MESURE & ACCOMPAGNEMENT</span>
                    <h2 className="text-3xl sm:text-4xl font-black mb-5 text-white">{t.services.ctaTitle}</h2>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-9 font-medium">
                        {t.services.ctaText}
                    </p>
                    <Link
                        href={route('contact')}
                        className="group inline-flex items-center gap-3 bg-white text-[#0B1F33] font-extrabold text-sm py-4 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/90"
                    >
                        <span>{t.services.ctaBtn}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </RevealOnScroll>
            </section>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;

