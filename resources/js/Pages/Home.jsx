import React, { useRef } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Hero from '@/Components/Hero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import DrawnPath from '@/Components/DrawnPath';
import {
    Landmark,
    Handshake,
    RefreshCcw,
    Compass,
    ArrowRight,
    ChevronRight,
    Users,
    Newspaper,
    Globe2,
    ShieldCheck,
    Target,
} from 'lucide-react';

const SERVICE_ICONS = {
    'financement-de-projets': Landmark,
    'fusions-acquisitions': Handshake,
    restructuration: RefreshCcw,
    'conseil-strategique': Compass,
};

const PILLARS = [
    {
        icon: Globe2,
        title: 'Expertise Régionale',
        desc: 'Un ancrage profond en Afrique Centrale et une compréhension fine de ses dynamiques économiques.',
    },
    {
        icon: ShieldCheck,
        title: 'Rigueur & Standards Internationaux',
        desc: 'Diligence et rigueur dans chaque mandat, selon les meilleurs standards internationaux.',
    },
    {
        icon: Target,
        title: 'Accompagnement sur-Mesure',
        desc: 'De la structuration à l’exécution, un accompagnement complet de vos projets stratégiques.',
    },
];

function GlobeWatermark({ className = '' }) {
    return (
        <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden="true">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="1" />
            <circle cx="200" cy="200" r="130" stroke="white" strokeWidth="1" />
            <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="180" ry="70" stroke="white" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="180" ry="130" stroke="white" strokeWidth="1" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="white" strokeWidth="1" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="white" strokeWidth="1" />
        </svg>
    );
}

export default function Home({ services = [], partners = [], posts = [] }) {
    const director = { name: 'Christelle BASILUA SEMY', role: 'Directrice Générale' };
    const stepperRef = useRef(null);

    return (
        <>
            <Head title="Accueil" />

            {/* ══ HERO ══ */}
            <Hero />

            {/* ══ BANDE SERVICES — CHEVAUCHE LE HERO ══ */}
            <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 overflow-hidden"
                >
                    {services.map((srv, idx) => {
                        const IconComp = SERVICE_ICONS[srv.slug] || Landmark;
                        const isFeatured = idx === 0;
                        return (
                            <Link
                                key={srv.id}
                                href={`/services#${srv.slug}`}
                                className={`group relative flex flex-col items-center justify-center text-center gap-3 px-4 py-8 sm:py-10 transition-all duration-500 ${
                                    isFeatured
                                        ? 'bg-[#0B4F71] text-white lg:-my-4 lg:rounded-2xl lg:shadow-xl lg:shadow-[#0B4F71]/30'
                                        : 'bg-white hover:bg-[#F6FAFC] text-slate-800'
                                }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
                                        isFeatured ? 'bg-white/15 text-white' : 'bg-[#F6FAFC] border border-slate-200 text-[#0B4F71]'
                                    }`}
                                >
                                    <IconComp className="w-5 h-5" />
                                </div>
                                <span className={`text-xs sm:text-[13px] font-extrabold leading-tight ${isFeatured ? 'text-white' : 'text-slate-800'}`}>
                                    {srv.title}
                                </span>
                            </Link>
                        );
                    })}
                </motion.div>
            </div>

            {/* ══ POURQUOI OMYA CAPITAL — STEPPER ══ */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 lg:pb-24">
                <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
                    <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">Notre Différence</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Pourquoi OMYA Capital ?</h2>
                </RevealOnScroll>

                <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-8">
                    <div ref={stepperRef} className="hidden sm:block absolute top-0 left-[16.5%] right-[16.5%] h-16">
                        <DrawnPath nodeCount={PILLARS.length} orientation="horizontal" containerRef={stepperRef} className="text-slate-300" />
                    </div>
                    {PILLARS.map(({ icon: Icon, title, desc }, idx) => (
                        <RevealOnScroll key={title} delay={staggerDelay(idx, 0.15)} className="relative text-center flex flex-col items-center">
                            <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-[#0B4F71] flex items-center justify-center text-[#0B4F71] mb-6 shadow-sm">
                                <Icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-900 mb-2.5">{title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">{desc}</p>
                        </RevealOnScroll>
                    ))}
                </div>
            </section>

            {/* ══ PRÉSENTATION ══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <RevealOnScroll direction="right" className="relative order-2 lg:order-1 pb-8 pl-8 sm:pb-10 sm:pl-10">
                        <div className="hidden sm:block absolute left-0 bottom-0 w-full h-full rounded-3xl border-2 border-[#0B4F71]/25" />
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-slate-900/15">
                            <motion.img
                                src="/images/business_meeting.webp"
                                alt="Équipe OMYA Capital en réunion stratégique"
                                initial={{ scale: 1.12 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/40 via-transparent to-transparent" />
                        </div>
                        <div className="hidden sm:flex absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 items-center gap-3 bg-white rounded-2xl shadow-xl shadow-slate-900/15 border border-slate-100 py-4 px-5 max-w-[270px]">
                            <div className="w-10 h-10 rounded-full bg-[#F6FAFC] border border-slate-200 flex items-center justify-center text-[#0B4F71] font-extrabold text-sm shrink-0">
                                CB
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-extrabold text-slate-900 leading-snug">{director.name}</p>
                                <p className="text-[10px] text-slate-500">{director.role}</p>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <div className="order-1 lg:order-2">
                        <RevealOnScroll>
                            <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">À Propos d&rsquo;OMYA Capital</span>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.1}>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-7 leading-tight">OMYA Capital</h2>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.2}>
                            <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
                                OMYA Capital est un cabinet de conseil financier de référence, dédié aux opérateurs économiques privés et aux institutions d&rsquo;Afrique centrale. Nous accompagnons nos clients dans la structuration, le financement et l&rsquo;exécution de leurs projets stratégiques et dirigeons nos actions vers les acteurs à fort potentiel de croissance afin de transformer ceux-ci en champions régionaux.
                            </p>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.28}>
                            <p className="text-[15px] text-slate-600 leading-relaxed mb-9">
                                OMYA Capital se positionne comme un véritable partenaire en matière de création de valeur et d&rsquo;essor économique de la sous-région.
                            </p>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.36}>
                            <Link href={route('about')} className="group inline-flex items-center gap-2 text-[#0B4F71] hover:text-[#093D58] font-bold text-sm link-underline">
                                <span>En savoir plus sur OMYA CAPITAL</span>
                                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* ══ SERVICES — VITRINE SOMBRE ══ */}
            <section className="relative overflow-hidden bg-[#0B1F33] py-24 lg:py-32">
                <GlobeWatermark className="absolute -right-24 -bottom-24 w-[420px] h-[420px] opacity-[0.06] pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <RevealOnScroll className="max-w-2xl mb-16">
                        <span className="text-[#E7C873] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">Nos Services</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                            Une expertise sur-mesure. <br className="hidden sm:block" />
                            Une exigence sans compromis.
                        </h2>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((srv, idx) => {
                            const IconComp = SERVICE_ICONS[srv.slug] || Landmark;
                            return (
                                <RevealOnScroll key={srv.id} delay={staggerDelay(idx)}>
                                    <Link
                                        href={`/services#${srv.slug}`}
                                        className="group relative block h-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/25 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#E7C873] mb-6 transition-colors duration-500 group-hover:bg-[#E7C873] group-hover:text-[#0B1F33]">
                                            <IconComp className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-sm font-extrabold text-white mb-2.5">{srv.title}</h3>
                                        <p className="text-xs text-sky-100/60 leading-relaxed mb-8">{srv.description}</p>
                                        <div className="absolute bottom-7 left-7 flex items-center gap-1.5 text-[#E7C873] font-semibold text-xs">
                                            <span>En savoir plus</span>
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                                        </div>
                                    </Link>
                                </RevealOnScroll>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══ ÉQUIPE (teaser) ══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
                <RevealOnScroll className="max-w-2xl mx-auto mb-10">
                    <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">Notre Équipe</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Des experts à votre écoute</h2>
                </RevealOnScroll>
                <RevealOnScroll delay={0.15}>
                    <Link
                        href={route('team')}
                        className="group inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#0B4F71] text-[#0B4F71] font-bold text-sm py-3.5 px-7 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <Users className="w-4 h-4" />
                        <span>Découvrir l&rsquo;équipe dirigeante</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </RevealOnScroll>
            </section>

            {/* ══ PARTENAIRES ══ */}
            <section className="bg-white py-24 lg:py-32 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">Réseau Partenaire</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Ils nous font confiance</h2>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                        {partners.map((p, idx) => (
                            <RevealOnScroll key={p.id} delay={staggerDelay(idx)}>
                                <div className="group bg-[#F8FAFC] hover:bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-500 text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#0B4F71] text-[#0B4F71] font-extrabold text-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:scale-105">
                                        {p.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>

                    <RevealOnScroll className="text-center">
                        <Link href={route('partners')} className="group inline-flex items-center gap-1.5 text-[#0B4F71] hover:text-[#093D58] font-bold text-sm link-underline">
                            <span>Voir tous nos partenaires</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </RevealOnScroll>
                </div>
            </section>

            {/* ══ ACTUALITÉS (teaser) ══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">Actualités</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Nos dernières publications</h2>
                </RevealOnScroll>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.map((post, idx) => (
                            <RevealOnScroll key={post.id} delay={staggerDelay(idx)}>
                                <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm h-full">
                                    <h3 className="text-sm font-extrabold text-slate-900 mb-2.5">{post.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{post.excerpt}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                ) : (
                    <RevealOnScroll className="bg-[#F8FAFC] border border-dashed border-slate-200 rounded-2xl p-14 text-center max-w-2xl mx-auto">
                        <Newspaper className="w-9 h-9 text-slate-300 mx-auto mb-4" />
                        <p className="text-sm text-slate-500">Aucune actualité publiée pour le moment.</p>
                    </RevealOnScroll>
                )}
            </section>

            {/* ══ CTA FINALE ══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
                <RevealOnScroll className="relative overflow-hidden bg-[#0B1F33] rounded-3xl p-12 sm:p-16 text-white text-center shadow-2xl">
                    <div
                        className="absolute inset-0 opacity-[0.06] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                            backgroundSize: '26px 26px',
                        }}
                    />
                    <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#0B4F71]/50 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-black mb-5">Votre projet mérite un accompagnement d&rsquo;exception</h2>
                        <p className="text-sky-100/80 text-sm leading-relaxed max-w-xl mx-auto mb-9">
                            Chaque situation est unique. Prenez contact avec nos équipes pour une analyse confidentielle et sans engagement de votre projet.
                        </p>
                        <Link
                            href={route('contact')}
                            className="group inline-flex items-center gap-2 bg-white hover:bg-sky-50 text-[#0B1F33] font-extrabold text-sm py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <span>Prendre contact</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </RevealOnScroll>
            </section>
        </>
    );
}

Home.layout = (page) => <PublicLayout>{page}</PublicLayout>;
