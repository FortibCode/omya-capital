import React, { useRef, useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Hero from '@/Components/Hero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import DrawnPath from '@/Components/DrawnPath';
import CarCarouselTrack from '@/Components/CarCarouselTrack';
import TeamCard from '@/Components/TeamCard';
import { useLanguage, translateService, translateMember } from '@/Context/LanguageContext';
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

const PILLAR_ICONS = [Globe2, ShieldCheck, Target];

function WaveDown({ fill = '#0B1F33' }) {
    return (
        <div className="w-full overflow-hidden leading-none pointer-events-none -mb-1">
            <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-12 sm:h-16" style={{ fill }}>
                <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,80 L1200,80 L0,80 Z" />
            </svg>
        </div>
    );
}

function WaveUp({ fill = '#ffffff' }) {
    return (
        <div className="w-full overflow-hidden leading-none pointer-events-none -mt-1">
            <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-12 sm:h-16" style={{ fill }}>
                <path d="M0,40 C200,0 400,80 600,40 C800,0 1000,80 1200,40 L1200,0 L0,0 Z" />
            </svg>
        </div>
    );
}

export default function Home({ services = [], partners = [], posts = [], members = [] }) {
    const { t, lang } = useLanguage();
    const pillars = t.home.pillars.map((p, i) => ({ ...p, icon: PILLAR_ICONS[i] }));
    const director = translateMember({ name: 'Christelle BASILUA SEMY', role_title: 'Directrice Générale' }, lang);
    const stepperRef = useRef(null);

    // Auto-cycling active step for Pourquoi OMYA Capital
    const [activePillarIndex, setActivePillarIndex] = useState(0);
    const [isPillarsHovered, setIsPillarsHovered] = useState(false);

    useEffect(() => {
        if (isPillarsHovered) return;
        const timer = setInterval(() => {
            setActivePillarIndex((prev) => (prev + 1) % pillars.length);
        }, 3200);
        return () => clearInterval(timer);
    }, [isPillarsHovered, pillars.length]);

    // Fallback team list with real team images
    const displayMembers = (members.length > 0 ? members : [
        { id: 1, name: 'Christelle BASILUA SEMY', role_title: 'Directrice Générale', photo_path: 'images/christelle-basilua-semy.jpeg' },
        { id: 2, name: 'Suzick TOMA', role_title: 'Directrice de mission', photo_path: 'images/suzic-iwolo.jpeg' },
        { id: 3, name: 'Louis-Raymond GOMES', role_title: 'Conseiller Juridique', photo_path: 'images/louis-raymond-gomes.jpeg' },
        { id: 4, name: 'Sarah BONANA', role_title: 'Assistante Exécutive', photo_path: 'images/sarah-bonana.jpeg' },
    ]).map((m) => translateMember(m, lang));

    const localizedServices = services.map((srv) => translateService(srv, lang));

    return (
        <>
            <Head title={t.nav.home} />

            {/* ══ HERO ══ */}
            <Hero />

            {/* ══ BANDE SERVICES — CHEVAUCHE LE HERO ══ */}
            <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl shadow-2xl shadow-[#0B1F33]/30 border border-white/20 grid grid-cols-2 lg:grid-cols-4 overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #0B2A45 0%, #0B4F71 100%)' }}
                >
                    {localizedServices.map((srv, idx) => {
                        const IconComp = SERVICE_ICONS[srv.slug] || Landmark;
                        const isFeatured = idx === 0;
                        return (
                            <Link
                                key={srv.id}
                                href={`/services#${srv.slug}`}
                                className={`group relative flex flex-col items-center justify-center text-center gap-3 px-4 py-8 sm:py-10 transition-all duration-500 border-r border-white/10 last:border-r-0 ${
                                    isFeatured
                                        ? 'bg-white/20 backdrop-blur-sm'
                                        : 'hover:bg-white/10'
                                }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
                                        isFeatured ? 'bg-white text-[#0B4F71]' : 'bg-white/15 text-white'
                                    }`}
                                >
                                    <IconComp className="w-5 h-5" />
                                </div>
                                <span className="text-xs sm:text-[13px] font-extrabold leading-tight text-white">
                                    {srv.title}
                                </span>
                            </Link>
                        );
                    })}
                </motion.div>
            </div>

            {/* ══ POURQUOI OMYA CAPITAL — fond blanc avec Stepper animé de haut en bas ══ */}
            <section className="bg-white pt-28 sm:pt-32 pb-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                        {/* Photo panel */}
                        <RevealOnScroll direction="right" className="relative order-2 lg:order-1 pb-8 pl-8 sm:pb-10 sm:pl-10 max-w-md mx-auto lg:mx-0">
                            <div className="hidden sm:block absolute left-0 bottom-0 w-full h-full rounded-3xl border-2 border-[#0B4F71]/20" />
                            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-[#0B1F33]/20">
                                <img
                                    src="/images/christelle-basilua-semy.jpeg"
                                    alt="L'équipe OMYA Capital"
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/50 via-[#0B1F33]/10 to-transparent" />
                            </div>
                        </RevealOnScroll>

                        {/* Pillars — Stepper avec changement automatique du haut vers le bas */}
                        <div className="order-1 lg:order-2">
                            <RevealOnScroll className="mb-10">
                                <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.home.pillarsEyebrow}</span>
                                <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F33]">{t.home.pillarsTitle}</h2>
                            </RevealOnScroll>

                            <div
                                ref={stepperRef}
                                className="relative space-y-6"
                                onMouseEnter={() => setIsPillarsHovered(true)}
                                onMouseLeave={() => setIsPillarsHovered(false)}
                            >
                                <div className="hidden sm:block absolute top-8 bottom-8 left-0 w-16">
                                    <DrawnPath nodeCount={pillars.length} orientation="vertical" swing={16} containerRef={stepperRef} className="text-[#0B4F71]/20" />
                                </div>
                                {pillars.map(({ icon: Icon, title, desc }, idx) => {
                                    const isActive = idx === activePillarIndex;
                                    return (
                                        <RevealOnScroll key={title} delay={staggerDelay(idx, 0.15)} className="relative">
                                            <div
                                                onClick={() => setActivePillarIndex(idx)}
                                                className={`relative flex items-start gap-5 p-4 rounded-2xl cursor-pointer transition-all duration-500 ${
                                                    isActive
                                                        ? 'bg-gradient-to-r from-[#F0F6FA] to-white border-l-4 border-[#0B4F71] shadow-lg shadow-[#0B4F71]/10 translate-x-2 sm:translate-x-3'
                                                        : 'opacity-65 hover:opacity-100 hover:translate-x-1'
                                                }`}
                                            >
                                                <div className="relative z-10 shrink-0">
                                                    {/* Pulse ring animation for active item */}
                                                    {isActive && (
                                                        <motion.div
                                                            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                                                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                                            className="absolute inset-0 rounded-full bg-[#0B4F71]/40"
                                                        />
                                                    )}
                                                    <div
                                                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                                                            isActive
                                                                ? 'bg-gradient-to-br from-[#0B1F33] via-[#0B2A45] to-[#0B4F71] text-white shadow-xl shadow-[#0B4F71]/40 scale-110 ring-4 ring-[#0B4F71]/20'
                                                                : 'bg-white border-2 border-[#0B4F71]/30 text-[#0B4F71] shadow-sm'
                                                        }`}
                                                    >
                                                        <Icon className="w-7 h-7" />
                                                    </div>
                                                </div>

                                                <div className="pt-2 flex-1">
                                                    <h3 className={`text-base font-extrabold transition-colors duration-300 ${isActive ? 'text-[#0B1F33]' : 'text-[#0B2A45]/80'}`}>
                                                        {title}
                                                    </h3>
                                                    <p className={`text-sm leading-relaxed max-w-sm transition-colors duration-300 ${isActive ? 'text-[#0B2A45]/80 font-medium' : 'text-[#0B2A45]/55'}`}>
                                                        {desc}
                                                    </p>
                                                </div>

                                                {/* Active dot indicator */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activePillarDot"
                                                        className="w-2.5 h-2.5 rounded-full bg-[#0B4F71] self-center shrink-0 shadow-sm"
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                )}
                                            </div>
                                        </RevealOnScroll>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <WaveDown fill="#0B1F33" />
            </section>

            {/* ══ PRÉSENTATION — fond bleu marine ══ */}
            <section className="relative bg-[#0B1F33] py-24 lg:py-32 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full bg-[#0B4F71]/30 blur-3xl pointer-events-none" />
                <div className="absolute right-0 bottom-0 w-[300px] h-[300px] rounded-full bg-[#0B4F71]/20 blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <RevealOnScroll direction="right" className="relative order-2 lg:order-1 pb-8 pl-8 sm:pb-10 sm:pl-10">
                            <div className="hidden sm:block absolute left-0 bottom-0 w-full h-full rounded-3xl border-2 border-white/15" />
                            <div className="hidden sm:flex absolute -top-3 -left-3 flex-col gap-1.5 z-10">
                                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                                <span className="w-2 h-2 rounded-full bg-white/40" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            </div>
                            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-black/40">
                                <motion.img
                                    src="/images/christelle-basilua-semy.jpeg"
                                    alt="Christelle BASILUA SEMY, Directrice Générale"
                                    initial={{ scale: 1.12 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/60 via-transparent to-transparent" />
                            </div>
                            <div className="hidden sm:flex absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 py-4 px-5 max-w-[270px]">
                                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-extrabold text-sm shrink-0">
                                    CB
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-extrabold text-white leading-snug">{director.name}</p>
                                    <p className="text-[10px] text-white/60">{director.role_title}</p>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <div className="order-1 lg:order-2">
                            <RevealOnScroll>
                                <span className="text-white/60 text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.home.aboutEyebrow}</span>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.1}>
                                <h2 className="text-3xl sm:text-4xl font-black text-white mb-7 leading-tight">{t.home.aboutTitle}</h2>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.2}>
                                <p className="text-[15px] text-white/70 leading-relaxed mb-4">
                                    {t.home.aboutP1}
                                </p>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.28}>
                                <p className="text-[15px] text-white/70 leading-relaxed mb-9">
                                    {t.home.aboutP2}
                                </p>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.36}>
                                <Link href={route('about')} className="group inline-flex items-center gap-2 bg-white text-[#0B1F33] hover:bg-white/90 font-bold text-sm py-3.5 px-7 rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                                    <span>{t.home.aboutCta}</span>
                                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ SERVICES — fond blanc ══ */}
            <section className="bg-white">
                <WaveUp fill="#0B1F33" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 lg:pb-32">
                    <RevealOnScroll className="max-w-2xl mb-16">
                        <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.home.servicesEyebrow}</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F33] leading-tight">
                            {t.home.servicesTitleLine1}<br className="hidden sm:block" />
                            {t.home.servicesTitleLine2}
                        </h2>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {localizedServices.map((srv, idx) => {
                            const IconComp = SERVICE_ICONS[srv.slug] || Landmark;
                            return (
                                <RevealOnScroll key={srv.id} delay={staggerDelay(idx)}>
                                    <Link
                                        href={`/services#${srv.slug}`}
                                        className="group relative block h-full bg-gradient-to-br from-[#F0F6FA] to-white border border-[#0B4F71]/10 hover:border-[#0B4F71]/30 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0B4F71]/10 overflow-hidden"
                                    >
                                        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#0B4F71]/5 group-hover:bg-[#0B4F71]/10 transition-colors duration-500 pointer-events-none" />
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B2A45] to-[#0B4F71] flex items-center justify-center text-white mb-6 transition-transform duration-500 group-hover:scale-110 shadow-md shadow-[#0B4F71]/30">
                                            <IconComp className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-sm font-extrabold text-[#0B1F33] mb-2.5">{srv.title}</h3>
                                        <p className="text-xs text-[#0B2A45]/55 leading-relaxed mb-8">{srv.description}</p>
                                        <div className="absolute bottom-7 left-7 flex items-center gap-1.5 text-[#0B4F71] font-semibold text-xs">
                                            <span>{t.home.learnMore}</span>
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                                        </div>
                                    </Link>
                                </RevealOnScroll>
                            );
                        })}
                    </div>
                </div>
                <WaveDown fill="#0B2A45" />
            </section>

            {/* ══ ÉQUIPE DIRIGEANTE — Executive Team Cards Grid ══ */}
            <section className="relative bg-[#0B2A45] py-24 lg:py-32 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0B4F71]/20 blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <RevealOnScroll className="max-w-2xl mx-auto mb-16 text-center">
                        <span className="text-white/50 text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.home.teamEyebrow}</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white">{t.home.teamTitle}</h2>
                        <p className="mt-4 text-white/60 text-sm leading-relaxed">
                            {t.home.teamSubtitle}
                        </p>
                    </RevealOnScroll>

                    {/* Executive Team Cards — Carousel with position-swapping animation */}
                    <RevealOnScroll>
                        <CarCarouselTrack
                            items={displayMembers}
                            interval={3800}
                            showWheels={true}
                            renderItem={(member) => (
                                <TeamCard member={member} className="h-full" />
                            )}
                        />
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.15} className="text-center mt-12">
                        <Link
                            href={route('team')}
                            className="group inline-flex items-center gap-2 bg-white text-[#0B1F33] font-bold text-sm py-3.5 px-7 rounded-xl shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                        >
                            <Users className="w-4 h-4" />
                            <span>{t.home.teamCta}</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </RevealOnScroll>
                </div>
            </section>

            {/* ══ PARTENAIRES — Ils nous font confiance (Circuit Car Carousel Track) ══ */}
            <section className="bg-white">
                <WaveUp fill="#0B2A45" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 lg:pb-32">
                    <RevealOnScroll className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.home.partnersEyebrow}</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F33]">{t.home.partnersTitle}</h2>
                    </RevealOnScroll>

                    {/* Circuit Car Carousel Track for Partners */}
                    <RevealOnScroll>
                        <CarCarouselTrack
                            items={partners}
                            interval={3400}
                            renderItem={(p) => (
                                <div className="bg-white border border-[#0B4F71]/10 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[#0B4F71]/10 hover:border-[#0B4F71]/25 transition-all duration-500 hover:-translate-y-1 h-full min-h-[180px] flex items-center justify-center p-7">
                                    {p.logo_path ? (
                                        <img src={`/storage/${p.logo_path}`} alt={p.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <span className="text-[#0B4F71] font-extrabold text-xl">{p.name.substring(0, 2).toUpperCase()}</span>
                                    )}
                                </div>
                            )}
                        />
                    </RevealOnScroll>

                    <RevealOnScroll className="text-center mt-12">
                        <Link href={route('partners')} className="group inline-flex items-center gap-1.5 text-[#0B4F71] hover:text-[#0B1F33] font-bold text-sm transition-colors duration-300">
                            <span>{t.home.partnersCta}</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </RevealOnScroll>
                </div>
                <WaveDown fill="#0B1F33" />
            </section>

            {/* ══ ACTUALITÉS — fond bleu marine ══ */}
            <section className="relative bg-[#0B1F33] py-24 lg:py-32 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="absolute -right-32 top-0 w-[400px] h-[400px] rounded-full bg-[#0B4F71]/25 blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-white/50 text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.home.newsEyebrow}</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white">{t.home.newsTitle}</h2>
                    </RevealOnScroll>

                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {posts.map((post, idx) => (
                                <RevealOnScroll key={post.id} delay={staggerDelay(idx)}>
                                    <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 hover:border-white/25 rounded-2xl p-7 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-1 h-full">
                                        <h3 className="text-sm font-extrabold text-white mb-2.5">{post.title}</h3>
                                        <p className="text-xs text-white/55 leading-relaxed">{post.excerpt}</p>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    ) : (
                        <RevealOnScroll className="bg-white/[0.04] border border-dashed border-white/15 rounded-2xl p-14 text-center max-w-2xl mx-auto">
                            <Newspaper className="w-9 h-9 text-white/25 mx-auto mb-4" />
                            <p className="text-sm text-white/50">{t.home.newsEmpty}</p>
                        </RevealOnScroll>
                    )}
                </div>
            </section>

            {/* ══ CTA FINALE — fond blanc avec encart bleu ══ */}
            <section className="bg-white py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#0B1F33]/20" style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #0B4F71 100%)' }}>
                        <div
                            className="absolute inset-0 opacity-[0.06] pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                                backgroundSize: '26px 26px',
                            }}
                        />
                        <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                        <div className="relative z-10 p-12 sm:p-16 text-white text-center">
                            <h2 className="text-2xl sm:text-3xl font-black mb-5">{t.home.ctaTitle}</h2>
                            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-9">
                                {t.home.ctaText}
                            </p>
                            <Link
                                href={route('contact')}
                                className="group inline-flex items-center gap-2 bg-white text-[#0B1F33] font-extrabold text-sm py-4 px-8 rounded-xl shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                            >
                                <span>{t.home.ctaBtn}</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </>
    );
}

Home.layout = (page) => <PublicLayout>{page}</PublicLayout>;
