import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PageHero from '@/Components/PageHero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import { useLanguage, translateMember } from '@/Context/LanguageContext';
import { Building2, Target, Compass, ShieldCheck, Award, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

const NAV_ICONS = { presentation: Building2, mission: Target, vision: Compass, valeurs: ShieldCheck };
const VALEUR_ICONS = [ShieldCheck, Award, HeartHandshake, Sparkles];
const VALEUR_COLORS = [
    { border: 'rgba(56, 189, 248, 0.4)', glow: 'rgba(56, 189, 248, 0.15)', tag: '#38bdf8' },
    { border: 'rgba(245, 158, 11, 0.4)', glow: 'rgba(245, 158, 11, 0.15)', tag: '#f59e0b' },
    { border: 'rgba(167, 139, 250, 0.4)', glow: 'rgba(167, 139, 250, 0.15)', tag: '#a78bfa' },
    { border: 'rgba(52, 211, 153, 0.4)', glow: 'rgba(52, 211, 153, 0.15)', tag: '#34d399' },
];

export default function Index() {
    const { t, lang } = useLanguage();
    const navItems = t.nav.aboutItems.map((item) => ({ ...item, icon: NAV_ICONS[item.key] }));
    const valeurs = t.about.valeurs.map((v, i) => ({ ...v, icon: VALEUR_ICONS[i], color: VALEUR_COLORS[i] }));
    const director = translateMember({ name: 'Christelle BASILUA SEMY', role_title: 'Directrice Générale' }, lang);

    return (
        <>
            <Head title={t.nav.about} />

            <PageHero
                title="OMYA Capital"
                description={t.about.heroDescription}
                bgImage="/images/bg-about-brazzaville.png"
            />

            {/* ── Sticky Navigation Bar ── */}
            <div className="bg-[#0B1F33]/90 backdrop-blur-xl border-b border-white/10 sticky top-[82px] lg:top-[130px] z-30 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-2 py-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/15"
                                >
                                    <Icon className="w-4 h-4 text-[#38bdf8]" />
                                    {item.title}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── 01. Présentation — Fond bleu marine sombre & Glassmorphism ── */}
            <section id="presentation" className="scroll-mt-[150px] lg:scroll-mt-[200px] relative py-24 lg:py-32 overflow-hidden bg-[#0B1F33] text-white">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33] via-[#0B2A45]/70 to-[#0B1F33] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <RevealOnScroll className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
                            <span className="text-[#38bdf8] text-xs font-extrabold uppercase tracking-[0.25em] mb-4 block">{t.about.presEyebrow}</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-white mb-7 leading-tight">{t.about.presTitle}</h2>
                            <p className="text-lg text-white/80 leading-relaxed mb-6 font-normal">
                                {t.home.aboutP1}
                            </p>
                            <p className="text-lg text-white/80 leading-relaxed font-normal">
                                {t.home.aboutP2}
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll direction="left" delay={0.15} className="lg:col-span-5 relative max-w-sm mx-auto lg:mx-0 w-full">
                            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/15">
                                <motion.img
                                    src="/storage/team/christelle-basilua-semy.jpeg"
                                    alt="Christelle BASILUA SEMY, Directrice Générale"
                                    initial={{ scale: 1.1 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/90 via-transparent to-transparent" />

                                <div className="absolute bottom-4 left-4 right-4 bg-[#0B1F33]/80 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0B4F71] flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-lg">
                                        CB
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-extrabold text-white leading-snug">{director.name}</p>
                                        <p className="text-xs text-white/70">{director.role_title}</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* ── 02. Mission ── */}
            <section id="mission" className="scroll-mt-[150px] lg:scroll-mt-[200px] relative py-24 lg:py-28 overflow-hidden bg-[#0B1F33] text-white border-t border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F33] via-[#0B2A45]/80 to-[#0B1F33] pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <RevealOnScroll className="max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-14 backdrop-blur-xl shadow-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] mb-8 shadow-lg">
                            <Target className="w-7 h-7" />
                        </div>
                        <span className="text-[#38bdf8] text-xs font-extrabold uppercase tracking-[0.25em] mb-4 block">{t.about.missionEyebrow}</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">{t.about.missionTitle}</h2>
                        <blockquote className="relative">
                            <div className="absolute -left-4 -top-2 text-6xl text-[#38bdf8]/30 font-serif leading-none select-none">"</div>
                            <p className="text-xl text-white/90 leading-relaxed italic font-medium pl-6 border-l-2 border-[#38bdf8]/50">
                                {t.about.missionQuote}
                            </p>
                        </blockquote>
                    </RevealOnScroll>
                </div>
            </section>

            {/* ── 03. Vision ── */}
            <section id="vision" className="scroll-mt-[150px] lg:scroll-mt-[200px] relative py-24 lg:py-28 overflow-hidden bg-[#0B1F33] text-white border-t border-white/10">
                <div className="absolute inset-0 bg-gradient-to-l from-[#0B1F33] via-[#0B2A45]/80 to-[#0B1F33] pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-end">
                    <RevealOnScroll className="max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-14 backdrop-blur-xl shadow-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/15 border border-[#f59e0b]/30 flex items-center justify-center text-[#f59e0b] mb-8 shadow-lg">
                            <Compass className="w-7 h-7" />
                        </div>
                        <span className="text-[#f59e0b] text-xs font-extrabold uppercase tracking-[0.25em] mb-4 block">{t.about.visionEyebrow}</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">{t.about.visionTitle}</h2>
                        <blockquote className="relative">
                            <div className="absolute -left-4 -top-2 text-6xl text-[#f59e0b]/30 font-serif leading-none select-none">"</div>
                            <p className="text-xl text-white/90 leading-relaxed italic font-medium pl-6 border-l-2 border-[#f59e0b]/50">
                                {t.about.visionQuote}
                            </p>
                        </blockquote>
                    </RevealOnScroll>
                </div>
            </section>

            {/* ── 04. Valeurs ── */}
            <section id="valeurs" className="scroll-mt-[150px] lg:scroll-mt-[200px] relative py-24 lg:py-32 overflow-hidden bg-[#0B1F33] text-white border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <RevealOnScroll className="text-center mb-16">
                        <span className="text-[#38bdf8] text-xs font-extrabold uppercase tracking-[0.25em] mb-4 block">{t.about.valeursEyebrow}</span>
                        <h2 className="text-3xl sm:text-5xl font-black text-white mb-5">{t.about.valeursTitle}</h2>
                        <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto font-medium">
                            {t.about.valeursSubtitle}
                        </p>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {valeurs.map(({ icon: Icon, title, desc, color }, i) => (
                            <RevealOnScroll key={i} delay={staggerDelay(i)}>
                                <div
                                    className="group relative rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-xl"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: `1px solid ${color.border}`,
                                        boxShadow: `0 10px 30px -10px ${color.glow}`,
                                    }}
                                >
                                    <div
                                        className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full transition-transform duration-700 group-hover:scale-150 pointer-events-none"
                                        style={{ background: color.glow }}
                                    />

                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 transition-transform duration-500 group-hover:scale-110 shadow-lg"
                                        style={{ background: `linear-gradient(135deg, ${color.tag}, #0B4F71)` }}
                                    >
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    <h3 className="text-xl font-extrabold text-[#ffffff] mb-3 tracking-tight">{title}</h3>
                                    <p className="text-base text-white/75 leading-relaxed font-normal">{desc}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 05. CTA Bottom ── */}
            <section className="relative bg-[#0B1F33] pb-24 lg:pb-32 overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-[#0B2A45] to-[#0B4F71] shadow-2xl text-center">
                        <div className="relative z-10 p-12 sm:p-16">
                            <span className="text-[#38bdf8] text-xs font-extrabold uppercase tracking-[0.25em] mb-4 block">PARTENARIAT & STRATÉGIE</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">{t.about.ctaTitle}</h2>
                            <p className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto mb-9 font-medium">
                                {t.about.ctaText}
                            </p>
                            <Link
                                href={route('contact')}
                                className="group inline-flex items-center gap-3 bg-white text-[#0B1F33] font-extrabold text-sm py-4 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/90"
                            >
                                <span>{t.about.ctaBtn}</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;

