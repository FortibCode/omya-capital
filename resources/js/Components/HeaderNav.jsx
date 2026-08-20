import React, { useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import OmyaLogo from '@/Components/OmyaLogo';

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
    Menu,
    X,
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

const ABOUT_ITEMS = [
    { key: 'presentation', title: 'Présentation', href: '/a-propos#presentation', icon: Building2 },
    { key: 'mission', title: 'Mission', href: '/a-propos#mission', icon: Target },
    { key: 'vision', title: 'Vision', href: '/a-propos#vision', icon: Compass },
    { key: 'valeurs', title: 'Valeurs', href: '/a-propos#valeurs', icon: ShieldCheck },
];

const SERVICE_ITEMS = [
    {
        key: 'financement-de-projets',
        title: 'Financement de projets',
        desc: 'Structuration et accès aux marchés de capitaux locaux et internationaux',
        href: '/services#financement-de-projets',
        icon: Landmark,
    },
    {
        key: 'fusions-acquisitions',
        title: 'Fusions & Acquisitions',
        desc: 'Accompagnement buy-side & sell-side, négociation et closing',
        href: '/services#fusions-acquisitions',
        icon: Handshake,
    },
    {
        key: 'restructuration',
        title: 'Restructuration',
        desc: 'Optimisation bilancielle, refinancement, plans de redressement',
        href: '/services#restructuration',
        icon: RefreshCcw,
    },
    {
        key: 'conseil-strategique',
        title: 'Conseil stratégique',
        desc: 'Business plan, valorisation, préparation à l’investissement',
        href: '/services#conseil-strategique',
        icon: Compass,
    },
];

const NEWS_ITEMS = [
    { key: 'actualites', title: 'Actualités', href: route('news.index'), icon: Newspaper },
    { key: 'publications', title: 'Publications', href: route('news.publications'), icon: BookOpen },
    { key: 'communiques', title: 'Communiqués', href: route('news.communiques'), icon: Megaphone },
];

export default function HeaderNav() {
    const { url } = usePage();

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

    // Safety net: since the header persists across page navigations (no remount),
    // any open dropdown/drawer must be force-closed whenever the route actually
    // changes — otherwise a stale menu can stay rendered on top of the new page.
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

    // The header stays transparent-over-dark only at the very top of the page,
    // with nothing else open — any dropdown/drawer/scroll makes it go opaque.
    const isOpaque = scrolled || mobileMenuOpen || Boolean(activeDropdown);

    const linkBase = isOpaque ? 'text-slate-800 hover:text-[#0B4F71]' : 'text-white hover:text-sky-200';
    const linkActive = isOpaque ? 'text-[#0B4F71]' : 'text-sky-200';
    const chevronIdle = isOpaque ? 'text-slate-400' : 'text-white/60';
    const underlineColor = isOpaque ? 'bg-[#0B4F71]' : 'bg-sky-300';

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
                                <span className="text-sky-300 font-extrabold">OMYA CAPITAL</span>
                                <span className="w-px h-3 bg-white/20" />
                                <span className="text-white/80 font-medium">Redéfinir l&rsquo;investissement en Afrique Centrale</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {[IconLinkedIn, IconFacebook, IconInstagram].map((Icon, i) => (
                                    <span
                                        key={i}
                                        title="Bientôt disponible"
                                        className="text-white/50 hover:text-sky-300 cursor-not-allowed transition-colors duration-200 relative group"
                                    >
                                        <Icon className="w-[18px] h-[18px]" />
                                        <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0B1F33] text-white text-[10px] font-semibold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 border border-white/10">
                                            Bientôt disponible
                                        </span>
                                    </span>
                                ))}
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
                                        Accueil
                                        {isCurrentRoute(route('home')) && (
                                            <motion.span layoutId="nav-active" className={`absolute left-4 right-4 -bottom-[1px] h-[3px] rounded-full ${underlineColor}`} />
                                        )}
                                    </Link>

                                    {[
                                        { id: 'about', label: 'À propos' },
                                        { id: 'services', label: 'Services' },
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
                                        Équipe
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
                                        Partenaires
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
                                            Actualités
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
                                        Documents
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
                                        Contact
                                    </Link>
                                </div>
                            </nav>

                            {/* DESKTOP CTA */}
                            <div className="hidden lg:flex items-center gap-3">
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
                                    <span>Prendre contact</span>
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
                                    {ABOUT_ITEMS.map((item) => {
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
                                <div className="text-[10px] font-extrabold tracking-[0.18em] text-[#B08D2C] uppercase mb-5">Nos expertises</div>
                                <div className="grid grid-cols-4 gap-6">
                                    {SERVICE_ITEMS.map((item) => {
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
                                    {NEWS_ITEMS.map((item) => {
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
                                <div className="px-5 py-5">
                                    <Link
                                        href={route('home')}
                                        onClick={closeMenus}
                                        className={`flex items-center justify-between py-4 border-b border-slate-100 ${
                                            isCurrentRoute(route('home')) ? 'text-[#0B4F71]' : 'text-[#0B1F33]'
                                        }`}
                                    >
                                        <span className="text-sm font-bold">Accueil</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>

                                    <div className="divide-y divide-slate-100">
                                        {/* À propos */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => toggleMobileSection('about')}
                                                className="w-full flex items-center justify-between py-4 text-left"
                                            >
                                                <span className="text-sm font-bold text-[#0B1F33]">À propos</span>
                                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileSection === 'about' ? 'rotate-180 text-[#0B4F71]' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileSection === 'about' && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                        <div className="pb-4 space-y-1">
                                                            {ABOUT_ITEMS.map((item) => {
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
                                                className="w-full flex items-center justify-between py-4 text-left"
                                            >
                                                <span className="text-sm font-bold text-[#0B1F33]">Services</span>
                                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileSection === 'services' ? 'rotate-180 text-[#0B4F71]' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileSection === 'services' && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                        <div className="pb-4 space-y-1">
                                                            {SERVICE_ITEMS.map((item) => {
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

                                        <Link href={route('team')} onClick={closeMenus} className="flex items-center justify-between py-4">
                                            <span className="text-sm font-bold text-[#0B1F33]">Équipe</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </Link>

                                        <Link href={route('partners')} onClick={closeMenus} className="flex items-center justify-between py-4">
                                            <span className="text-sm font-bold text-[#0B1F33]">Partenaires</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </Link>

                                        {/* Actualités */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => toggleMobileSection('actualites')}
                                                className="w-full flex items-center justify-between py-4 text-left"
                                            >
                                                <span className="text-sm font-bold text-[#0B1F33]">Actualités</span>
                                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileSection === 'actualites' ? 'rotate-180 text-[#0B4F71]' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileSection === 'actualites' && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                        <div className="pb-4 space-y-1">
                                                            {NEWS_ITEMS.map((item) => {
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

                                        <Link href={route('documents.index')} onClick={closeMenus} className="flex items-center justify-between py-4">
                                            <span className="text-sm font-bold text-[#0B1F33]">Documents</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </Link>

                                        <Link href={route('contact')} onClick={closeMenus} className="flex items-center justify-between py-4">
                                            <span className="text-sm font-bold text-[#0B1F33]">Contact</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </Link>
                                    </div>

                                    <div className="pt-5 border-t border-slate-100 mt-2">
                                        <Link
                                            href={route('contact')}
                                            onClick={closeMenus}
                                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#0B4F71] text-white text-xs font-extrabold"
                                        >
                                            <Mail className="w-4 h-4" />
                                            Prendre contact
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
