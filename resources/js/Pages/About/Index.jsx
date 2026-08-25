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

function WaveDown({ fill = '#0B1F33' }) {
    return (
        <div className="w-full overflow-hidden leading-none pointer-events-none -mb-1">
            <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-12 sm:h-16" style={{ fill }}>
                <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" />
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

export default function Index() {
    const { t, lang } = useLanguage();
    const navItems = t.nav.aboutItems.map((item) => ({ ...item, icon: NAV_ICONS[item.key] }));
    const valeurs = t.about.valeurs.map((v, i) => ({ ...v, icon: VALEUR_ICONS[i] }));
    const director = translateMember({ name: 'Christelle BASILUA SEMY', role_title: 'Directrice Générale' }, lang);

    return (
        <>
            <Head title={t.nav.about} />

            <PageHero eyebrow={t.nav.about} icon={Building2} title="OMYA Capital" description={t.about.heroDescription} />

            {/* ── Nav sticky ── */}
            <div className="bg-white border-b border-[#0B4F71]/10 sticky top-20 lg:top-24 z-30 shadow-md shadow-[#0B1F33]/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-1 py-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#0B2A45]/60 hover:text-[#0B4F71] hover:bg-[#0B4F71]/5 transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.title}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Présentation — fond blanc ── */}
            <section id="presentation" className="scroll-mt-32 bg-white py-24 lg:py-32">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <RevealOnScroll>
                            <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.about.presEyebrow}</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F33] mb-7">{t.about.presTitle}</h2>
                            <p className="text-[15px] text-[#0B2A45]/65 leading-relaxed mb-4">
                                {t.home.aboutP1}
                            </p>
                            <p className="text-[15px] text-[#0B2A45]/65 leading-relaxed">
                                {t.home.aboutP2}
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll direction="left" delay={0.15} className="relative pb-8 pl-8 sm:pb-10 sm:pl-10 max-w-sm mx-auto lg:mx-0">
                            <div className="hidden sm:block absolute left-0 bottom-0 w-full h-full rounded-3xl border-2 border-[#0B4F71]/20" />
                            <div className="hidden sm:flex absolute -top-3 -right-3 flex-col gap-1.5 z-10">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#0B4F71]" />
                                <span className="w-2 h-2 rounded-full bg-[#0B4F71]/40" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0B4F71]/20" />
                            </div>
                            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-[#0B1F33]/20">
                                <motion.img
                                    src="/storage/team/christelle-basilua-semy.jpeg"
                                    alt="Christelle BASILUA SEMY, Directrice Générale"
                                    initial={{ scale: 1.12 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/50 via-transparent to-transparent" />
                            </div>
                            <div className="hidden sm:flex absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 items-center gap-3 bg-white rounded-2xl shadow-xl shadow-[#0B1F33]/15 border border-[#0B4F71]/10 py-4 px-5 max-w-[270px]">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B2A45] to-[#0B4F71] flex items-center justify-center text-white font-extrabold text-sm shrink-0">
                                    CB
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-extrabold text-[#0B1F33] leading-snug">{director.name}</p>
                                    <p className="text-[10px] text-[#0B2A45]/50">{director.role_title}</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
                <WaveDown fill="#0B1F33" />
            </section>

            {/* ── Mission — fond bleu marine ── */}
            <section id="mission" className="scroll-mt-32 relative bg-[#0B1F33] py-16 lg:py-20 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="absolute -right-32 -top-32 w-[480px] h-[480px] rounded-full bg-[#0B4F71]/30 blur-3xl pointer-events-none" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <RevealOnScroll className="max-w-3xl">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-8">
                            <Target className="w-7 h-7" />
                        </div>
                        <span className="text-white/50 text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.about.missionEyebrow}</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">{t.about.missionTitle}</h2>
                        <blockquote className="relative">
                            <div className="absolute -left-4 top-0 text-6xl text-white/10 font-serif leading-none select-none">"</div>
                            <p className="text-xl text-white/80 leading-relaxed italic font-medium pl-6 border-l-2 border-white/20">
                                {t.about.missionQuote}
                            </p>
                        </blockquote>
                    </RevealOnScroll>
                </div>
            </section>

            {/* ── Vision — fond bleu intermédiaire ── */}
            <section id="vision" className="scroll-mt-32 relative bg-[#0B2A45] py-16 lg:py-20 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full bg-[#0B4F71]/20 blur-3xl pointer-events-none" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <RevealOnScroll className="max-w-3xl">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-8">
                            <Compass className="w-7 h-7" />
                        </div>
                        <span className="text-white/50 text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.about.visionEyebrow}</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">{t.about.visionTitle}</h2>
                        <blockquote className="relative">
                            <div className="absolute -left-4 top-0 text-6xl text-white/10 font-serif leading-none select-none">"</div>
                            <p className="text-xl text-white/80 leading-relaxed italic font-medium pl-6 border-l-2 border-white/20">
                                {t.about.visionQuote}
                            </p>
                        </blockquote>
                    </RevealOnScroll>
                </div>
            </section>

            {/* ── Valeurs — fond blanc ── */}
            <section id="valeurs" className="scroll-mt-32 bg-white">
                <WaveUp fill="#0B2A45" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 lg:pb-32">
                    <RevealOnScroll className="text-center mb-14">
                        <span className="text-[#0B4F71] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block">{t.about.valeursEyebrow}</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F33] mb-4">{t.about.valeursTitle}</h2>
                        <p className="text-sm text-[#0B2A45]/55 leading-relaxed max-w-2xl mx-auto">
                            {t.about.valeursSubtitle}
                        </p>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {valeurs.map(({ icon: Icon, title, desc }, i) => (
                            <RevealOnScroll key={i} delay={staggerDelay(i)}>
                                <div className="group bg-gradient-to-br from-[#F0F6FA] to-white border border-[#0B4F71]/10 hover:border-[#0B4F71]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#0B4F71]/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden relative">
                                    <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#0B4F71]/5 group-hover:bg-[#0B4F71]/10 transition-colors duration-500 pointer-events-none" />
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B2A45] to-[#0B4F71] flex items-center justify-center text-white mb-5 transition-transform duration-500 group-hover:scale-110 shadow-md shadow-[#0B4F71]/25">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base font-extrabold text-[#0B1F33] mb-2">{title}</h3>
                                    <p className="text-xs text-[#0B2A45]/55 leading-relaxed">{desc}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Bottom */}
            <section className="bg-white pb-24 lg:pb-32">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#0B1F33]/20 text-center" style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #0B4F71 100%)' }}>
                        <div
                            className="absolute inset-0 opacity-[0.05] pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                                backgroundSize: '26px 26px',
                            }}
                        />
                        <div className="relative z-10 p-12 sm:p-16">
                            <h2 className="text-2xl sm:text-3xl font-black text-white mb-5">{t.about.ctaTitle}</h2>
                            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-9">
                                {t.about.ctaText}
                            </p>
                            <Link
                                href={route('contact')}
                                className="group inline-flex items-center gap-2 bg-white text-[#0B1F33] font-extrabold text-xs py-4 px-8 rounded-xl shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
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
