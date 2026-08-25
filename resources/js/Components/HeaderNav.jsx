import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import OmyaLogo from '@/Components/OmyaLogo';
import { useLanguage, SERVICE_SLUG_ORDER } from '@/Context/LanguageContext';

import {
    ChevronDown,
    ArrowRight,
    Building2,
    Target,
    Compass,
    ShieldCheck,
    Landmark,
    Handshake,
    RefreshCcw,
    Newspaper,
    BookOpen,
    Megaphone,
    Mail,
    PhoneCall,
    Menu,
    X,
    Globe,
} from 'lucide-react';

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

// Icons don't depend on language — titles/descriptions/labels come from
// the active translation dictionary at render time inside the component.
const ABOUT_ICONS = { presentation: Building2, mission: Target, vision: Compass, valeurs: ShieldCheck };
const SERVICE_ICONS = {
    'financement-de-projets': Landmark,
    'fusions-acquisitions': Handshake,
    restructuration: RefreshCcw,
    'conseil-strategique': Compass,
};
const NEWS_ICONS = { actualites: Newspaper, publications: BookOpen, communiques: Megaphone };

/**
 * Reusable Language Switcher Dropdown
 */
function LanguageSelector({ isOpaque }) {
    const { lang, changeLanguage, languages } = useLanguage();
    const [open, setOpen] = useState(false);
    const currentLang = languages[lang] || languages.fr;

    return (
        <div className="relative" onMouseLeave={() => setOpen(false)}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                    isOpaque
                        ? 'bg-[#0B4F71]/10 text-[#0B4F71] hover:bg-[#0B4F71]/20'
                        : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                }`}
            >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang.flag}</span>
                <span className="uppercase tracking-wider">{currentLang.code}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1.5 bg-[#0B1F33] border border-white/20 rounded-xl shadow-2xl p-1.5 z-50 min-w-[140px]"
                    >
                        {Object.values(languages).map((l) => (
                            <button
                                key={l.code}
                                type="button"
                                onClick={() => {
                                    changeLanguage(l.code);
                                    setOpen(false);
                                }}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-left transition-all ${
                                    lang === l.code
                                        ? 'bg-[#0B4F71] text-white shadow-sm'
                                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <span className="text-sm">{l.flag}</span>
                                <span>{l.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function HeaderNav() {
    const { url } = usePage();
    const { t, lang, changeLanguage, languages } = useLanguage();

    const aboutItems = t.nav.aboutItems.map((item) => ({ ...item, icon: ABOUT_ICONS[item.key] }));
    const serviceItems = SERVICE_SLUG_ORDER.map((slug) => ({
        key: slug,
        ...t.servicesContent[slug],
        href: `/services#${slug}`,
        icon: SERVICE_ICONS[slug],
    }));
    const newsItems = t.nav.newsItems.map((item) => ({ ...item, href: route(item.routeName), icon: NEWS_ICONS[item.key] }));

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSection, setMobileSection] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setMobileSection(null);
    }, [url]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setActiveDropdown(null);
                setMobileMenuOpen(false);
                setMobileSection(null);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const isCurrentRoute = (href) => {
        if (!href || !url) return false;
        try {
            const normalizedHref = new URL(href, window.location.origin).pathname;
            const normalizedCurrent = new URL(url, window.location.origin).pathname;
            return normalizedHref === normalizedCurrent;
        } catch {
            return false;
        }
    };

    const closeMenus = () => {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setMobileSection(null);
    };

    const toggleMobileSection = (id) => {
        setMobileSection((current) => (current === id ? null : id));
    };

    const isOpaque = scrolled || mobileMenuOpen || Boolean(activeDropdown);

    const linkBase = isOpaque ? 'text-[#0B1F33] hover:text-[#0B4F71]' : 'text-white hover:text-white/80';
    const linkActive = isOpaque ? 'text-[#0B4F71]' : 'text-white font-black';
    const chevronIdle = isOpaque ? 'text-[#0B1F33]/60' : 'text-white/60';
    const underlineColor = isOpaque ? 'bg-[#0B4F71]' : 'bg-white';

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isOpaque ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.08)]' : 'bg-transparent'
                }`}
            >
                {/* TOPBAR */}
                <div className="hidden lg:block bg-[#0B1F33] text-white">
                    <div className="max-w-[1600px] mx-auto px-6 xl:px-10">
                        <div className="h-8 flex items-center justify-between text-[11px] font-semibold tracking-widest uppercase">
                            <div className="flex items-center gap-4">
                                <span className="text-white font-extrabold">OMYA CAPITAL</span>
                                <span className="w-px h-3 bg-white/20" />
                                <span className="text-white/80 font-medium">{t.tagline}</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <a
                                    href="tel:+242050987541"
                                    className="flex items-center gap-1.5 normal-case tracking-normal font-semibold text-white/70 hover:text-white transition-colors duration-200"
                                >
                                    <PhoneCall className="w-3.5 h-3.5" />
                                    <span>+242 05098 75 41</span>
                                </a>
                                <a
                                    href="mailto:contact@omya-capital.com"
                                    className="hidden xl:flex items-center gap-1.5 normal-case tracking-normal font-semibold text-white/70 hover:text-white transition-colors duration-200"
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                    <span>contact@omya-capital.com</span>
                                </a>
                                <span className="w-px h-3 bg-white/20" />

                                {/* Topbar Language Selector */}
                                <LanguageSelector isOpaque={false} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN HEADER */}
                <div
                    className={`border-b transition-colors duration-500 ${
                        isOpaque ? 'border-slate-200 shadow-sm' : 'border-white/0'
                    }`}
                >
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 xl:px-10">
                        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-[80px]' : 'h-[92px]'}`}>
                            <Link href={route('home')} onClick={closeMenus} onMouseEnter={() => setActiveDropdown(null)} className="flex items-center shrink-0 group mr-4 xl:mr-8">
                                <OmyaLogo variant={isOpaque ? 'dark' : 'light'} height={scrolled ? 42 : 48} />
                            </Link>

                            {/* DESKTOP NAV */}
                            <nav className="hidden xl:flex items-center mr-auto" aria-label="Navigation principale">
                                <div className="flex items-center gap-1 2xl:gap-2">
                                    <Link
                                        href={route('home')}
                                        prefetch
                                        onMouseEnter={() => setActiveDropdown(null)}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`relative px-4 2xl:px-5 py-3.5 text-sm 2xl:text-base font-extrabold tracking-wide transition-colors duration-300 ${
                                            isCurrentRoute(route('home')) ? linkActive : linkBase
                                        }`}
                                    >
                                        {t.nav.home}
                                        {isCurrentRoute(route('home')) && (
                                            <motion.span layoutId="nav-active" className={`absolute left-4 right-4 -bottom-[1px] h-[3px] rounded-full ${underlineColor}`} />
                                        )}
                                    </Link>

                                    {[
                                        { id: 'about', label: t.nav.about },
                                        { id: 'services', label: t.nav.services },
                                    ].map(({ id, label }) => {
                                        const isOpen = activeDropdown === id;
                                        return (
                                            <div key={id} className="relative" onMouseEnter={() => setActiveDropdown(id)}>
                                                <button
                                                    type="button"
                                                    aria-expanded={isOpen}
                                                    aria-haspopup="true"
                                                    onClick={() => setActiveDropdown(isOpen ? null : id)}
                                                    className={`relative inline-flex items-center gap-2 px-4 2xl:px-5 py-3.5 text-sm 2xl:text-base font-extrabold tracking-wide transition-colors duration-300 ${
                                                        isOpen ? linkActive : linkBase
                                                    }`}
                                                >
                                                    {label}
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? `rotate-180 ${linkActive}` : chevronIdle}`} />
                                                </button>
                                            </div>
                                        );
                                    })}

                                    <Link
                                        href={route('team')}
                                        prefetch
                                        onMouseEnter={() => setActiveDropdown(null)}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`px-4 2xl:px-5 py-3.5 text-sm 2xl:text-base font-extrabold tracking-wide transition-colors duration-300 ${
                                            isCurrentRoute(route('team')) ? linkActive : linkBase
                                        }`}
                                    >
                                        {t.nav.team}
                                    </Link>

                                    <Link
                                        href={route('partners')}
                                        prefetch
                                        onMouseEnter={() => setActiveDropdown(null)}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`px-4 2xl:px-5 py-3.5 text-sm 2xl:text-base font-extrabold tracking-wide transition-colors duration-300 ${
                                            isCurrentRoute(route('partners')) ? linkActive : linkBase
                                        }`}
                                    >
                                        {t.nav.partners}
                                    </Link>

                                    <div className="relative" onMouseEnter={() => setActiveDropdown('actualites')}>
                                        <button
                                            type="button"
                                            aria-expanded={activeDropdown === 'actualites'}
                                            aria-haspopup="true"
                                            onClick={() => setActiveDropdown(activeDropdown === 'actualites' ? null : 'actualites')}
                                            className={`relative inline-flex items-center gap-2 px-4 2xl:px-5 py-3.5 text-sm 2xl:text-base font-extrabold tracking-wide transition-colors duration-300 ${
                                                activeDropdown === 'actualites' ? linkActive : linkBase
                                            }`}
                                        >
                                            {t.nav.news}
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'actualites' ? `rotate-180 ${linkActive}` : chevronIdle}`} />
                                        </button>
                                    </div>

                                    <Link
                                        href={route('documents.index')}
                                        prefetch
                                        onMouseEnter={() => setActiveDropdown(null)}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`px-4 2xl:px-5 py-3.5 text-sm 2xl:text-base font-extrabold tracking-wide transition-colors duration-300 ${
                                            isCurrentRoute(route('documents.index')) ? linkActive : linkBase
                                        }`}
                                    >
                                        {t.nav.documents}
                                    </Link>

                                    <Link
                                        href={route('contact')}
                                        prefetch
                                        onMouseEnter={() => setActiveDropdown(null)}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`px-4 2xl:px-5 py-3.5 text-sm 2xl:text-base font-extrabold tracking-wide transition-colors duration-300 ${
                                            isCurrentRoute(route('contact')) ? linkActive : linkBase
                                        }`}
                                    >
                                        {t.nav.contact}
                                    </Link>
                                </div>
                            </nav>

                            {/* DESKTOP CTA & LANG SELECTOR */}
                            <div className="hidden lg:flex items-center gap-4">
                                <LanguageSelector isOpaque={isOpaque} />

                                <Link
                                    href={route('contact')}
                                    prefetch
                                    onMouseEnter={() => setActiveDropdown(null)}
                                    onClick={() => setActiveDropdown(null)}
                                    className={`inline-flex items-center justify-center gap-2 px-5 2xl:px-6 py-2.5 2xl:py-3 rounded-xl font-extrabold text-xs 2xl:text-sm whitespace-nowrap transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${
                                        isOpaque
                                            ? 'bg-[#0B4F71] hover:bg-[#093D58] text-white shadow-md hover:shadow-lg'
                                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/40 hover:border-white/60 backdrop-blur-sm'
                                    }`}
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>{t.nav.contactBtn}</span>
                                </Link>
                            </div>

                            {/* MOBILE BUTTON */}
                            <button
                                type="button"
                                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                                aria-expanded={mobileMenuOpen}
                                onClick={() => {
                                    setMobileMenuOpen((current) => !current);
                                    setMobileSection(null);
                                }}
                                className={`xl:hidden flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300 ${
                                    isOpaque ? 'text-[#0B1F33] bg-slate-100 hover:bg-slate-200' : 'text-white bg-white/10 hover:bg-white/20 border border-white/25'
                                }`}
                            >
                                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* DESKTOP DROPDOWN: À PROPOS (classic) */}
                <AnimatePresence>
                    {activeDropdown === 'about' && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            onMouseLeave={() => setActiveDropdown(null)}
                            className="hidden xl:block absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-[0_20px_45px_rgba(15,23,42,0.10)]"
                        >
                            <div className="max-w-[1600px] mx-auto px-8 py-6">
                                <div className="grid grid-cols-4 gap-4 max-w-3xl">
                                    {aboutItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.key}
                                                href={item.href}
                                                onClick={() => setActiveDropdown(null)}
                                                className="group flex items-center gap-3 p-4 rounded-xl hover:bg-[#F6FAFC] transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-[#0B4F71] group-hover:bg-[#0B4F71] group-hover:border-[#0B4F71] group-hover:text-white transition-all shrink-0">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-[#0B1F33] group-hover:text-[#0B4F71] transition-colors">{item.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* DESKTOP MEGA MENU: SERVICES */}
                <AnimatePresence>
                    {activeDropdown === 'services' && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            onMouseLeave={() => setActiveDropdown(null)}
                            className="hidden xl:block absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-[0_20px_45px_rgba(15,23,42,0.10)]"
                        >
                            <div className="max-w-[1280px] mx-auto px-8 py-8">
                                <div className="text-[10px] font-extrabold tracking-[0.18em] text-[#0B4F71] uppercase mb-5">{t.nav.ourServices}</div>
                                <div className="grid grid-cols-4 gap-6">
                                    {serviceItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.key}
                                                href={item.href}
                                                onClick={() => setActiveDropdown(null)}
                                                className="group flex flex-col gap-3 p-5 rounded-xl border border-slate-100 hover:border-[#0B4F71]/30 hover:bg-[#F6FAFC] transition-all"
                                            >
                                                <div className="w-11 h-11 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-[#0B4F71] group-hover:bg-[#0B4F71] group-hover:border-[#0B4F71] group-hover:text-white transition-all shrink-0">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-sm font-bold text-[#0B1F33] group-hover:text-[#0B4F71] transition-colors">{item.title}</span>
                                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#0B4F71] transition-all" />
                                                    </div>
                                                    <p className="mt-1.5 text-xs leading-5 text-slate-500">{item.desc}</p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* DESKTOP DROPDOWN: ACTUALITÉS (classic) */}
                <AnimatePresence>
                    {activeDropdown === 'actualites' && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            onMouseLeave={() => setActiveDropdown(null)}
                            className="hidden xl:block absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-[0_20px_45px_rgba(15,23,42,0.10)]"
                        >
                            <div className="max-w-[1600px] mx-auto px-8 py-6">
                                <div className="grid grid-cols-3 gap-4 max-w-2xl">
                                    {newsItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.key}
                                                href={item.href}
                                                prefetch
                                                onClick={() => setActiveDropdown(null)}
                                                className="group flex items-center gap-3 p-4 rounded-xl hover:bg-[#F6FAFC] transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-[#0B4F71] group-hover:bg-[#0B4F71] group-hover:border-[#0B4F71] group-hover:text-white transition-all shrink-0">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-[#0B1F33] group-hover:text-[#0B4F71] transition-colors">{item.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MOBILE MENU */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="xl:hidden absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
                        >
                            <div className="max-h-[calc(100vh-80px)] overflow-y-auto">
                                <div className="px-5 py-5 space-y-4">
                                    {/* Mobile Language Switcher */}
                                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Langue / Language</span>
                                        <div className="flex items-center gap-1.5">
                                            {Object.values(languages).map((l) => (
                                                <button
                                                    key={l.code}
                                                    type="button"
                                                    onClick={() => changeLanguage(l.code)}
                                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                                        lang === l.code
                                                            ? 'bg-[#0B4F71] text-white shadow-sm'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                                >
                                                    {l.flag} <span className="uppercase">{l.code}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href={route('home')}
                                        onClick={closeMenus}
                                        className={`flex items-center justify-between py-3 border-b border-slate-100 ${
                                            isCurrentRoute(route('home')) ? 'text-[#0B4F71]' : 'text-[#0B1F33]'
                                        }`}
                                    >
                                        <span className="text-sm font-bold">{t.nav.home}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>

                                    <div className="divide-y divide-slate-100">
                                        {/* À propos */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => toggleMobileSection('about')}
                                                className="w-full flex items-center justify-between py-3 text-left"
                                            >
                                                <span className="text-sm font-bold text-[#0B1F33]">{t.nav.about}</span>
                                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileSection === 'about' ? 'rotate-180 text-[#0B4F71]' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileSection === 'about' && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                        <div className="pb-4 space-y-1">
                                                            {aboutItems.map((item) => {
                                                                const Icon = item.icon;
                                                                return (
                                                                    <Link key={item.key} href={item.href} onClick={closeMenus} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                                                        <div className="w-8 h-8 rounded-lg bg-[#F1F7FA] flex items-center justify-center text-[#0B4F71] shrink-0">
                                                                            <Icon className="w-4 h-4" />
                                                                        </div>
                                                                        <span className="text-xs font-bold text-[#0B1F33]">{item.title}</span>
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Services */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => toggleMobileSection('services')}
                                                className="w-full flex items-center justify-between py-3 text-left"
                                            >
                                                <span className="text-sm font-bold text-[#0B1F33]">{t.nav.services}</span>
                                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileSection === 'services' ? 'rotate-180 text-[#0B4F71]' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileSection === 'services' && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                        <div className="pb-4 space-y-1">
                                                            {serviceItems.map((item) => {
                                                                const Icon = item.icon;
                                                                return (
                                                                    <Link key={item.key} href={item.href} onClick={closeMenus} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                                                        <div className="w-8 h-8 rounded-lg bg-[#F1F7FA] flex items-center justify-center text-[#0B4F71] shrink-0">
                                                                            <Icon className="w-4 h-4" />
                                                                        </div>
                                                                        <div className="min-w-0">
                                                                            <div className="text-xs font-bold text-[#0B1F33]">{item.title}</div>
                                                                            <div className="text-[10px] leading-4 text-slate-500 mt-0.5">{item.desc}</div>
                                                                        </div>
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <Link href={route('team')} onClick={closeMenus} className="flex items-center justify-between py-3">
                                            <span className="text-sm font-bold text-[#0B1F33]">{t.nav.team}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </Link>

                                        <Link href={route('partners')} onClick={closeMenus} className="flex items-center justify-between py-3">
                                            <span className="text-sm font-bold text-[#0B1F33]">{t.nav.partners}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </Link>

                                        {/* Actualités */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => toggleMobileSection('actualites')}
                                                className="w-full flex items-center justify-between py-3 text-left"
                                            >
                                                <span className="text-sm font-bold text-[#0B1F33]">{t.nav.news}</span>
                                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileSection === 'actualites' ? 'rotate-180 text-[#0B4F71]' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileSection === 'actualites' && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                        <div className="pb-4 space-y-1">
                                                            {newsItems.map((item) => {
                                                                const Icon = item.icon;
                                                                return (
                                                                    <Link key={item.key} href={item.href} onClick={closeMenus} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                                                        <div className="w-8 h-8 rounded-lg bg-[#F1F7FA] flex items-center justify-center text-[#0B4F71] shrink-0">
                                                                            <Icon className="w-4 h-4" />
                                                                        </div>
                                                                        <span className="text-xs font-bold text-[#0B1F33]">{item.title}</span>
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <Link href={route('documents.index')} onClick={closeMenus} className="flex items-center justify-between py-3">
                                            <span className="text-sm font-bold text-[#0B1F33]">{t.nav.documents}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </Link>

                                        <Link href={route('contact')} onClick={closeMenus} className="flex items-center justify-between py-3">
                                            <span className="text-sm font-bold text-[#0B1F33]">{t.nav.contact}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </Link>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 mt-2">
                                        <Link
                                            href={route('contact')}
                                            onClick={closeMenus}
                                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#0B4F71] text-white text-xs font-extrabold"
                                        >
                                            <Mail className="w-4 h-4" />
                                            {t.nav.contactBtn}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="xl:hidden fixed inset-0 z-40 bg-[#0B1F33]/30 backdrop-blur-[2px]"
                        onClick={closeMenus}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
