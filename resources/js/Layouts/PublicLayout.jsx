import React from 'react';
import HeaderNav from '@/Components/HeaderNav';
import OmyaLogo from '@/Components/OmyaLogo';
import IntroLoader from '@/Components/IntroLoader';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import { LanguageProvider, useLanguage, SERVICE_SLUG_ORDER } from '@/Context/LanguageContext';
import SocialLinks from '@/Components/SocialLinks';

/**
 * Rendered as a proper child of <LanguageProvider> (not inside the component
 * that mounts the provider) so useLanguage() reads the live selected language
 * instead of the context's default fallback.
 */
function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="relative bg-[#0B1F33] text-white text-sm mt-20">
            {/* Curved Wave Top Separator */}
            <div className="w-full overflow-hidden leading-none absolute -top-10 left-0 right-0 z-10 pointer-events-none">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-10 text-[#0B1F33] fill-current">
                    <path d="M0,0 C300,90 600,-40 1200,50 L1200,120 L0,120 Z"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                    {/* Col 1: Logo & Signature (4 cols) */}
                    <div className="lg:col-span-4 space-y-4">
                        <OmyaLogo variant="light" height={44} />
                        <p className="text-sm text-white/70 font-semibold uppercase tracking-wide pt-1">
                            {t.tagline}
                        </p>
                        <p className="text-sm text-white/70 leading-relaxed pr-4 pt-2">
                            {t.footer.description}
                        </p>
                    </div>

                    {/* Col 2: Navigation (2 cols) */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">{t.footer.navTitle}</h4>
                        <ul className="space-y-2.5 text-sm font-semibold text-white/70">
                            <li><Link href={route('home')} className="inline-block py-1.5 hover:text-white transition-colors">{t.nav.home}</Link></li>
                            <li><Link href={route('about')} className="inline-block py-1.5 hover:text-white transition-colors">{t.nav.about}</Link></li>
                            <li><Link href={route('services.index')} className="inline-block py-1.5 hover:text-white transition-colors">{t.nav.services}</Link></li>
                            <li><Link href={route('team')} className="inline-block py-1.5 hover:text-white transition-colors">{t.nav.team}</Link></li>
                            <li><Link href={route('partners')} className="inline-block py-1.5 hover:text-white transition-colors">{t.nav.partners}</Link></li>
                            <li><Link href={route('news.index')} className="inline-block py-1.5 hover:text-white transition-colors">{t.nav.news}</Link></li>
                            <li><Link href={route('documents.index')} className="inline-block py-1.5 hover:text-white transition-colors">{t.nav.documents}</Link></li>
                            <li><Link href={route('contact')} className="inline-block py-1.5 hover:text-white transition-colors">{t.nav.contact}</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Services (3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">{t.footer.servicesTitle}</h4>
                        <ul className="space-y-2.5 text-sm font-semibold text-white/70">
                            {SERVICE_SLUG_ORDER.map((slug) => (
                                <li key={slug}>
                                    <Link href={`/services#${slug}`} className="inline-block py-1.5 hover:text-white transition-colors">
                                        {t.servicesContent[slug].title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Contact & Réseaux (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">{t.footer.contactTitle}</h4>
                        <div className="space-y-2.5 text-sm font-semibold text-white/70">
                            <a href="tel:+242050987541" className="flex items-center gap-2 py-1.5 hover:text-white transition-colors">
                                <PhoneCall className="w-3.5 h-3.5 text-white/40 shrink-0" />
                                <span>+242 05098 75 41</span>
                            </a>
                            <a href="mailto:contact@omya-capital.com" className="flex items-center gap-2 py-1.5 hover:text-white transition-colors">
                                <Mail className="w-3.5 h-3.5 text-white/40 shrink-0" />
                                <span>contact@omya-capital.com</span>
                            </a>
                            <div className="flex items-start gap-2 text-white/55">
                                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-white/40" />
                                <span>76 avenue Amilcar Cabral, Centre-ville, Immeuble Villarecci, en face du Radisson</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <span className="text-sm font-bold text-white/70 block mb-3">{t.footer.followTitle}</span>
                            <SocialLinks tone="dark" />
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Line */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/50 gap-4">
                    <p>© {new Date().getFullYear()} OMYA CAPITAL. {t.footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
}

export default function PublicLayout({ children, hideFooter = false, hideNav = false }) {
    const { url } = usePage();

    return (
        <LanguageProvider>
            <div className="min-h-screen bg-white text-[#0B1F33] font-sans flex flex-col selection:bg-[#0B4F71] selection:text-white">
                {/* Intro Loader Splash Screen — mounted once, persists across navigation */}
                <IntroLoader />

                {/* Navbar — persists across navigation (no remount, no state loss) */}
                {!hideNav && <HeaderNav />}

                {/* Main content — crossfades between pages since the layout itself no longer remounts */}
                <AnimatePresence mode="wait">
                    <motion.main
                        key={url}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                        exit={{ opacity: 0, y: -6, transition: { duration: 0.12, ease: 'easeIn' } }}
                        className="flex-grow"
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>

                {!hideFooter && <Footer />}
            </div>
        </LanguageProvider>
    );
}
