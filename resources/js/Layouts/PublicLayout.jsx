import React from 'react';
import HeaderNav from '@/Components/HeaderNav';
import OmyaLogo from '@/Components/OmyaLogo';
import IntroLoader from '@/Components/IntroLoader';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import { LanguageProvider, useLanguage, SERVICE_SLUG_ORDER } from '@/Context/LanguageContext';

const IconLinkedIn = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
const IconFacebook = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);
const IconInstagram = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);

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
                        <p className="text-xs text-white/60 font-semibold uppercase tracking-wide pt-1">
                            {t.tagline}
                        </p>
                        <p className="text-xs text-white/55 leading-relaxed pr-4 pt-2">
                            {t.footer.description}
                        </p>
                    </div>

                    {/* Col 2: Navigation (2 cols) */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">{t.footer.navTitle}</h4>
                        <ul className="space-y-2.5 text-xs font-semibold text-white/55">
                            <li><Link href={route('home')} className="hover:text-white transition-colors">{t.nav.home}</Link></li>
                            <li><Link href={route('about')} className="hover:text-white transition-colors">{t.nav.about}</Link></li>
                            <li><Link href={route('services.index')} className="hover:text-white transition-colors">{t.nav.services}</Link></li>
                            <li><Link href={route('team')} className="hover:text-white transition-colors">{t.nav.team}</Link></li>
                            <li><Link href={route('partners')} className="hover:text-white transition-colors">{t.nav.partners}</Link></li>
                            <li><Link href={route('news.index')} className="hover:text-white transition-colors">{t.nav.news}</Link></li>
                            <li><Link href={route('documents.index')} className="hover:text-white transition-colors">{t.nav.documents}</Link></li>
                            <li><Link href={route('contact')} className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Services (3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">{t.footer.servicesTitle}</h4>
                        <ul className="space-y-2.5 text-xs font-semibold text-white/55">
                            {SERVICE_SLUG_ORDER.map((slug) => (
                                <li key={slug}>
                                    <Link href={`/services#${slug}`} className="hover:text-white transition-colors">
                                        {t.servicesContent[slug].title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Contact & Réseaux (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">{t.footer.contactTitle}</h4>
                        <div className="space-y-2.5 text-xs font-semibold text-white/55">
                            <a href="tel:+242050987541" className="flex items-center gap-2 hover:text-white transition-colors">
                                <PhoneCall className="w-3.5 h-3.5 text-white/40 shrink-0" />
                                <span>+242 05098 75 41</span>
                            </a>
                            <a href="mailto:contact@omya-capital.com" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Mail className="w-3.5 h-3.5 text-white/40 shrink-0" />
                                <span>contact@omya-capital.com</span>
                            </a>
                            <div className="flex items-start gap-2 text-white/55">
                                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-white/40" />
                                <span>76 avenue Amilcar Cabral, Centre-ville, Immeuble Villarecci, en face du Radisson</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <span className="text-xs font-bold text-white/60 block mb-2">{t.footer.followTitle}</span>
                            <div className="flex items-center gap-3 text-white">
                                {[IconLinkedIn, IconFacebook, IconInstagram].map((Icon, i) => (
                                    <span
                                        key={i}
                                        title={t.documents.soon}
                                        className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white/50 cursor-not-allowed"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Line */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-4">
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
