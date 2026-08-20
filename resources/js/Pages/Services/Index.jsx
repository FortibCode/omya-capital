import React, { useRef } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll from '@/Components/RevealOnScroll';
import DrawnPath from '@/Components/DrawnPath';
import { Landmark, Handshake, RefreshCcw, Compass, ArrowRight, Briefcase } from 'lucide-react';

const ICONS = {
    'financement-de-projets': Landmark,
    'fusions-acquisitions': Handshake,
    restructuration: RefreshCcw,
    'conseil-strategique': Compass,
};

export default function Index({ services = [] }) {
    const journeyRef = useRef(null);

    return (
        <>
            <Head title="Services" />

            <PageHero
                eyebrow="Nos Expertises"
                icon={Briefcase}
                title="Nos Services"
                description="Un accompagnement sur-mesure à chaque étape de vos projets stratégiques."
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
                {/* Zigzag journey through the 4 expertises */}
                <div ref={journeyRef} className="relative">
                    <div className="hidden lg:block text-[#0B4F71]/20">
                        <DrawnPath nodeCount={services.length} containerRef={journeyRef} />
                    </div>

                    <div>
                        {services.map((srv, idx) => {
                            const IconComp = ICONS[srv.slug] || Briefcase;
                            const isLeft = idx % 2 === 0;
                            return (
                                <div
                                    key={srv.id}
                                    id={srv.slug}
                                    className={`scroll-mt-32 lg:flex lg:min-h-[300px] lg:items-center ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}
                                >
                                    <RevealOnScroll direction={isLeft ? 'right' : 'left'} className="relative z-10 w-full lg:w-[47%] py-4">
                                        <div className="group relative bg-white border border-slate-100 hover:border-[#0B4F71]/25 rounded-2xl p-8 lg:p-9 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                                            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#0B4F71]/[0.03] group-hover:bg-[#0B4F71]/[0.06] transition-colors duration-500 pointer-events-none" />

                                            <div className="relative flex items-center gap-4 mb-6">
                                                <span className="w-11 h-11 rounded-full bg-[#0B4F71] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md shadow-[#0B4F71]/25">
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                <div className="w-12 h-12 rounded-xl bg-[#F6FAFC] border border-slate-200 flex items-center justify-center text-[#0B4F71] shrink-0 transition-colors duration-500 group-hover:bg-[#0B4F71] group-hover:text-white">
                                                    <IconComp className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{srv.title}</h3>
                                            </div>

                                            <p className="relative text-sm text-slate-600 font-medium leading-relaxed bg-[#F8FAFC] p-5 rounded-xl border border-slate-100 mb-6">
                                                {srv.description}
                                            </p>

                                            <Link
                                                href={route('contact')}
                                                className="group/btn relative inline-flex items-center gap-2 bg-[#0B4F71] hover:bg-[#093D58] text-white font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all duration-300"
                                            >
                                                <span>Solliciter ce service</span>
                                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                            </Link>
                                        </div>
                                    </RevealOnScroll>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <RevealOnScroll className="relative overflow-hidden mt-16 lg:mt-24 bg-[#0B1F33] rounded-3xl p-12 sm:p-16 text-white text-center shadow-2xl">
                    <div
                        className="absolute inset-0 opacity-[0.06] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                            backgroundSize: '26px 26px',
                        }}
                    />
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-black mb-5">Votre projet mérite un accompagnement d&rsquo;exception</h2>
                        <p className="text-sky-100/80 text-sm leading-relaxed max-w-xl mx-auto mb-9">
                            Chaque situation est unique. Prenez contact avec nos équipes pour une analyse confidentielle et sans engagement de votre projet.
                        </p>
                        <Link
                            href={route('contact')}
                            className="group inline-flex items-center gap-2 bg-white hover:bg-sky-50 text-[#0B1F33] font-extrabold text-sm py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <span>Nous contacter</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </RevealOnScroll>
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
