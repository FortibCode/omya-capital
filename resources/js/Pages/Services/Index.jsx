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

function WaveDown({ fill = '#0B1F33' }) {
    return (
        <div className="w-full overflow-hidden leading-none pointer-events-none -mb-1">
            <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-12 sm:h-16" style={{ fill }}>
                <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" />
            </svg>
        </div>
    );
}

export default function Index({ services = [] }) {
    const { t, lang } = useLanguage();
    const localizedServices = services.map((srv) => translateService(srv, lang));
    const journeyRef = useRef(null);

    return (
        <>
            <Head title={t.nav.services} />

            <PageHero
                eyebrow={t.services.heroEyebrow}
                icon={Briefcase}
                title={t.services.heroTitle}
                description={t.services.heroDescription}
            />

            {/* Services zigzag — fond blanc */}
            <section className="bg-white py-16 lg:py-28">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div ref={journeyRef} className="relative">
                        <div className="hidden lg:block text-[#0B4F71]/15">
                            <DrawnPath nodeCount={services.length} orientation="vertical" containerRef={journeyRef} />
                        </div>

                        <div>
                            {localizedServices.map((srv, idx) => {
                                const IconComp = ICONS[srv.slug] || Briefcase;
                                const isLeft = idx % 2 === 0;
                                return (
                                    <div
                                        key={srv.id}
                                        id={srv.slug}
                                        className={`scroll-mt-32 lg:flex lg:min-h-[300px] lg:items-center ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}
                                    >
                                        <RevealOnScroll direction={isLeft ? 'right' : 'left'} className="relative z-10 w-full lg:w-[47%] py-4">
                                            <div className="group relative bg-gradient-to-br from-[#F0F6FA] to-white border border-[#0B4F71]/10 hover:border-[#0B4F71]/30 rounded-2xl p-8 lg:p-9 hover:shadow-xl hover:shadow-[#0B4F71]/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                                                <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#0B4F71]/5 group-hover:bg-[#0B4F71]/10 transition-colors duration-500 pointer-events-none" />

                                                <div className="relative flex items-center gap-4 mb-6">
                                                    <span className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0B1F33] to-[#0B4F71] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md shadow-[#0B4F71]/30">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B2A45] to-[#0B4F71] flex items-center justify-center text-white shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-md shadow-[#0B4F71]/25">
                                                        <IconComp className="w-6 h-6" />
                                                    </div>
                                                    <h3 className="text-lg font-extrabold text-[#0B1F33] leading-snug">{srv.title}</h3>
                                                </div>

                                                <p className="relative text-sm text-[#0B2A45]/65 font-medium leading-relaxed bg-[#0B4F71]/5 p-5 rounded-xl border border-[#0B4F71]/8 mb-6">
                                                    {srv.description}
                                                </p>

                                                <Link
                                                    href={route('contact')}
                                                    className="group/btn relative inline-flex items-center gap-2 bg-gradient-to-r from-[#0B2A45] to-[#0B4F71] hover:from-[#0B1F33] hover:to-[#0B2A45] text-white font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md shadow-[#0B4F71]/25 transition-all duration-300"
                                                >
                                                    <span>{t.services.solicitBtn}</span>
                                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                </Link>
                                            </div>
                                        </RevealOnScroll>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <WaveDown fill="#0B1F33" />
            </section>

            {/* CTA Section — fond bleu marine */}
            <section className="relative bg-[#0B1F33] py-24 lg:py-32 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '26px 26px',
                    }}
                />
                <div className="absolute -left-24 top-0 w-[400px] h-[400px] rounded-full bg-[#0B4F71]/25 blur-3xl pointer-events-none" />
                <RevealOnScroll className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center relative z-10">
                    <h2 className="text-2xl sm:text-3xl font-black mb-5">{t.services.ctaTitle}</h2>
                    <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-9">
                        {t.services.ctaText}
                    </p>
                    <Link
                        href={route('contact')}
                        className="group inline-flex items-center gap-2 bg-white text-[#0B1F33] font-extrabold text-sm py-4 px-8 rounded-xl shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
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
