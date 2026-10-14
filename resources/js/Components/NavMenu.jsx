import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import SocialLinks from '@/Components/SocialLinks';
import { useLanguage, SERVICE_SLUG_ORDER } from '@/Context/LanguageContext';
import { X, ChevronDown } from 'lucide-react';
import { COMPANY_EMAIL, COMPANY_EMAIL_HREF, COMPANY_PHONE, COMPANY_PHONE_HREF } from '@/Constants/company';

/**
 * The same soft black the contact panel uses. Neutral rather than navy, so it
 * sits on any of the site's backdrops — the gold artwork, the sunset, the
 * infrastructure photograph — without taking a colour cast from the page it
 * happens to open over.
 */
const PANEL = '#14161A';

export default function NavMenu({ isOpen, onClose }) {
    const { t } = useLanguage();
    const { url } = usePage();
    const [expandedCategory, setExpandedCategory] = useState(null);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    const handleToggleCategory = (catKey) => {
        setExpandedCategory(expandedCategory === catKey ? null : catKey);
    };

    // Every href here is built from a named route, never typed by hand: the
    // sub-items used to point at /about#… and /news?category=… , which are not
    // routes this application declares — seven of the eight were 404s.
    const mainNav = [
        { key: 'home', label: t.nav.home, href: route('home') },
        {
            key: 'about',
            label: t.nav.about,
            href: route('about'),
            children: [
                { label: t.about.presTitle, href: `${route('about')}#presentation` },
                { label: t.about.missionTitle, href: `${route('about')}#mission` },
                { label: t.about.visionTitle, href: `${route('about')}#vision` },
                { label: t.about.valeursTitle, href: `${route('about')}#valeurs` },
            ],
        },
        {
            key: 'services',
            label: t.nav.services,
            href: route('services.index'),
            children: SERVICE_SLUG_ORDER.map((slug) => ({
                label: t.servicesContent[slug]?.title,
                href: `${route('services.index')}#${slug}`,
            })),
        },
        { key: 'team', label: t.nav.team, href: route('team') },
        { key: 'partners', label: t.nav.partners, href: route('partners') },
        {
            key: 'news',
            label: t.nav.news,
            href: route('news.index'),
            children: [
                { label: t.news.types.actualite, href: route('news.index') },
                { label: t.news.types.publication, href: route('news.publications') },
                { label: t.news.types.communique, href: route('news.communiques') },
            ],
        },
        { key: 'documents', label: t.nav.documents, href: route('documents.index') },
        { key: 'contact', label: t.nav.contact, href: route('contact') },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment key="navmenu">
                    {/* Dims the page the panel opens over, and closes on a click
                        anywhere outside — the usual way out of a drawer. */}
                    <motion.div
                        key="scrim"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onClick={onClose}
                        className="fixed inset-0 z-[114] bg-black/60"
                        aria-hidden="true"
                    />

                    <motion.div
                        key="panel"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        style={{ backgroundColor: PANEL }}
                        className="fixed inset-y-0 left-0 z-[115] w-full max-w-[25rem] flex flex-col text-white overflow-y-auto shadow-2xl shadow-black/60"
                        role="dialog"
                        aria-modal="true"
                        aria-label={t.nav.menuLabel}
                    >
                        {/* ── Top of the panel ── */}
                        <div className="flex items-center justify-between px-7 py-6">
                            <Link href={route('home')} onClick={onClose} className="flex items-center py-1">
                                <img
                                    src="/images/omya-capital-light.png"
                                    alt="OMYA CAPITAL"
                                    className="h-9 w-auto select-none"
                                />
                            </Link>

                            <button
                                onClick={onClose}
                                aria-label={t.nav.closeLabel}
                                className="p-2 -mr-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* ── The pages ── */}
                        {/* No rules between the entries: the spacing separates
                            them, and eight hairlines in a narrow column read as
                            a table rather than a menu. */}
                        <nav className="flex-1 px-7 py-6">
                            <ul>
                                {mainNav.map((item, idx) => {
                                    const hasChildren = item.children && item.children.length > 0;
                                    const isExpanded = expandedCategory === item.key;
                                    // The page you are already on, marked rather
                                    // than left to look like every other line.
                                    const isCurrent = url === new URL(item.href, 'http://x').pathname;

                                    return (
                                        <li key={item.key}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.08 + idx * 0.035, duration: 0.4 }}
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <Link
                                                        href={item.href}
                                                        onClick={onClose}
                                                        aria-current={isCurrent ? 'page' : undefined}
                                                        className="group block py-2.5 min-w-0"
                                                    >
                                                        <span
                                                            className={`text-2xl sm:text-[1.75rem] font-bold tracking-tight transition-colors duration-300 ${
                                                                isCurrent ? 'text-white' : 'text-white/70 group-hover:text-white'
                                                            }`}
                                                        >
                                                            {item.label}
                                                        </span>
                                                    </Link>

                                                    {hasChildren && (
                                                        <button
                                                            onClick={() => handleToggleCategory(item.key)}
                                                            aria-expanded={isExpanded}
                                                            aria-label={`${item.label} — ${t.nav.subsectionsLabel}`}
                                                            className="shrink-0 p-2 -mr-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                                        >
                                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                                        </button>
                                                    )}
                                                </div>

                                                {hasChildren && isExpanded && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pb-3 pl-1 flex flex-col gap-2.5">
                                                            {item.children.map((sub) => (
                                                                <Link
                                                                    key={sub.href + sub.label}
                                                                    href={sub.href}
                                                                    onClick={onClose}
                                                                    className="text-sm text-white/55 hover:text-white underline-offset-4 hover:underline transition-colors duration-300 focus-visible:outline-none focus-visible:underline"
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* ── Bottom of the panel ── */}
                        {/* The firm's actual phone and address, which is what a
                            visitor opening a menu on a finance site tends to be
                            after. */}
                        <div className="px-7 pb-8 pt-4 flex flex-col gap-5">
                            <div className="flex flex-col gap-2 text-sm">
                                <a href={COMPANY_PHONE_HREF} className="text-white/70 hover:text-white transition-colors duration-300 w-fit">
                                    {COMPANY_PHONE}
                                </a>
                                <a href={COMPANY_EMAIL_HREF} className="text-white/70 hover:text-white transition-colors duration-300 w-fit">
                                    {COMPANY_EMAIL}
                                </a>
                            </div>

                            <SocialLinks tone="dark" />
                        </div>
                    </motion.div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
}
