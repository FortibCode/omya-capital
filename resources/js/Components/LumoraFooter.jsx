import React from 'react';
import { Link } from '@inertiajs/react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import { useLanguage, SERVICE_SLUG_ORDER } from '@/Context/LanguageContext';
import SocialLinks from '@/Components/SocialLinks';
import RevealOnScroll from '@/Components/RevealOnScroll';

export default function LumoraFooter() {
    const { t } = useLanguage();

    return (
        <footer className="relative bg-[#070D17] text-white pt-16 pb-12 px-6 sm:px-12 lg:px-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── Main Footer 4 Columns (Suspenseful 1-by-1 entrance) ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-slate-800">
                    
                    {/* Column 1: Real Brand Logo & Authentic Info (Delay 0.1s) */}
                    <RevealOnScroll direction="up" delay={0.1} duration={1.05} className="lg:col-span-4 space-y-4">
                        <div className="inline-block bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                            <img 
                                src="/images/omya-capital-dark.png" 
                                alt="OMYA CAPITAL" 
                                className="h-10 sm:h-12 w-auto select-none object-contain" 
                            />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#F97316] mt-4 font-poppins">
                            {t.tagline}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm font-poppins">
                            {t.footer.description}
                        </p>
                    </RevealOnScroll>

                    {/* Column 2: Navigation (Delay 0.32s) */}
                    <RevealOnScroll direction="up" delay={0.32} duration={1.05} className="lg:col-span-3 space-y-4">
                        <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white mb-5">
                            {t.footer.navTitle}
                        </h4>
                        <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-normal">
                            <li>
                                <Link href={route('home')} className="inline-flex items-center gap-2 hover:text-[#F97316] transition-colors">
                                    <span className="text-slate-500 font-mono text-xs">&gt;</span>
                                    <span>{t.nav.home}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('about')} className="inline-flex items-center gap-2 hover:text-[#F97316] transition-colors">
                                    <span className="text-slate-500 font-mono text-xs">&gt;</span>
                                    <span>{t.nav.about}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('services.index')} className="inline-flex items-center gap-2 hover:text-[#F97316] transition-colors">
                                    <span className="text-slate-500 font-mono text-xs">&gt;</span>
                                    <span>{t.nav.services}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('team')} className="inline-flex items-center gap-2 hover:text-[#F97316] transition-colors">
                                    <span className="text-slate-500 font-mono text-xs">&gt;</span>
                                    <span>{t.nav.team}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('partners')} className="inline-flex items-center gap-2 hover:text-[#F97316] transition-colors">
                                    <span className="text-slate-500 font-mono text-xs">&gt;</span>
                                    <span>{t.nav.partners}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('news.index')} className="inline-flex items-center gap-2 hover:text-[#F97316] transition-colors">
                                    <span className="text-slate-500 font-mono text-xs">&gt;</span>
                                    <span>{t.nav.news}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('documents.index')} className="inline-flex items-center gap-2 hover:text-[#F97316] transition-colors">
                                    <span className="text-slate-500 font-mono text-xs">&gt;</span>
                                    <span>{t.nav.documents}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('contact')} className="inline-flex items-center gap-2 hover:text-[#F97316] transition-colors">
                                    <span className="text-slate-500 font-mono text-xs">&gt;</span>
                                    <span>{t.nav.contact}</span>
                                </Link>
                            </li>
                        </ul>
                    </RevealOnScroll>

                    {/* Column 3: Services (Delay 0.54s) */}
                    <RevealOnScroll direction="up" delay={0.54} duration={1.05} className="lg:col-span-2 space-y-4">
                        <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white mb-5">
                            {t.footer.servicesTitle}
                        </h4>
                        <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-normal">
                            {SERVICE_SLUG_ORDER.map((slug) => (
                                <li key={slug}>
                                    <Link href={`/services#${slug}`} className="inline-flex items-center gap-2 hover:text-[#F97316] transition-colors">
                                        <span className="text-slate-500 font-mono text-xs">&gt;</span>
                                        <span>{t.servicesContent[slug]?.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </RevealOnScroll>

                    {/* Column 4: Contact & Réseaux (Delay 0.76s) */}
                    <RevealOnScroll direction="up" delay={0.76} duration={1.05} className="lg:col-span-3 space-y-4">
                        <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white mb-5">
                            {t.footer.contactTitle}
                        </h4>
                        
                        <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                            <a href="tel:+242050987541" className="flex items-center gap-3 hover:text-[#F97316] transition-colors">
                                <PhoneCall className="w-4 h-4 text-[#F97316] shrink-0" />
                                <span>+242 05098 75 41</span>
                            </a>
                            <a href="mailto:contact@omya-capital.com" className="flex items-center gap-3 hover:text-[#F97316] transition-colors">
                                <Mail className="w-4 h-4 text-[#F97316] shrink-0" />
                                <span>contact@omya-capital.com</span>
                            </a>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-1" />
                                <span className="leading-relaxed">76 avenue Amilcar Cabral, Centre-ville, Immeuble Villarecci, en face du Radisson, Brazzaville</span>
                            </div>
                        </div>

                        <div className="h-px bg-slate-800 my-5" />

                        <div className="space-y-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                                {t.footer.followTitle}
                            </span>
                            <SocialLinks tone="dark" />
                        </div>
                    </RevealOnScroll>

                </div>

                {/* ── Bottom Bar Legal & Copyright (Delay 0.98s) ── */}
                <RevealOnScroll direction="up" delay={0.98} duration={1.05} className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                    <p>© {new Date().getFullYear()} OMYA CAPITAL. {t.footer.copyright}</p>
                </RevealOnScroll>

            </div>
        </footer>
    );
}



