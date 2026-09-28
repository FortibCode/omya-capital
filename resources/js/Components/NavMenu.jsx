import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import OmyaLogo from '@/Components/OmyaLogo';
import SocialLinks from '@/Components/SocialLinks';
import { useLanguage, SERVICE_SLUG_ORDER } from '@/Context/LanguageContext';
import { X, ArrowUpRight, ChevronDown, Building2, Target, Compass, ShieldCheck, Landmark, Handshake, RefreshCcw, Newspaper, BookOpen, Megaphone } from 'lucide-react';

// ─── Live clock ─────────────────────────────────────────────────────────────
function useClock() {
    const fmt = (now) => {
        const h = now.getHours() % 12 || 12;
        const m = String(now.getMinutes()).padStart(2, '0');
        const ampm = now.getHours() < 12 ? 'am' : 'pm';
        const day = now.getDate();
        const month = now.toLocaleString('fr-FR', { month: 'long' });
        const year = now.getFullYear();
        return {
            time: `${h}:${m}${ampm}`,
            date: `${day} ${month}, ${year}`,
        };
    };

    const [clock, setClock] = useState(() => fmt(new Date()));

    useEffect(() => {
        const id = setInterval(() => setClock(fmt(new Date())), 1000);
        return () => clearInterval(id);
    }, []);

    return clock;
}

export default function NavMenu({ isOpen, onClose, onContact }) {
    const { t } = useLanguage();
    const { url } = usePage();
    const clock = useClock();
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

    // Full navigation structure containing ALL old navbar links & sub-items
    const mainNav = [
        { key: 'home', label: t.nav.home, href: route('home') },
        {
            key: 'about',
            label: t.nav.about,
            href: route('about'),
            children: [
                { label: 'Présentation', href: '/about#presentation' },
                { label: 'Notre Mission', href: '/about#mission' },
                { label: 'Notre Vision', href: '/about#vision' },
                { label: 'Nos Valeurs', href: '/about#valeurs' },
            ],
        },
        {
            key: 'services',
            label: t.nav.services,
            href: route('services.index'),
            children: SERVICE_SLUG_ORDER.map((slug) => ({
                label: t.servicesContent[slug]?.title,
                href: `/services#${slug}`,
            })),
        },
        { key: 'team', label: t.nav.team, href: route('team') },
        { key: 'partners', label: t.nav.partners, href: route('partners') },
        {
            key: 'news',
            label: t.nav.news,
            href: route('news.index'),
            children: [
                { label: 'Actualités & Presse', href: '/news' },
                { label: 'Publications & Analyses', href: '/news?category=publications' },
                { label: 'Communiqués officiels', href: '/news?category=communiques' },
            ],
        },
        { key: 'documents', label: t.nav.documents, href: route('documents.index') },
        { key: 'contact', label: t.nav.contact, href: route('contact') },
    ];

    function handleNavClick(item) {
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="navmenu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[115] flex flex-col bg-[#0B1F33] text-white overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu de navigation"
                >
                    {/* Subtle dot pattern */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                            backgroundSize: '28px 28px',
                        }}
                    />

                    {/* ── Top Header ── */}
                    <div className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6 border-b border-white/10">
                        <Link href={route('home')} onClick={onClose} className="flex items-center py-1">
                            <img
                                src="/images/omya-capital-light.png"
                                alt="OMYA CAPITAL"
                                className="h-9 sm:h-11 w-auto select-none"
                            />
                        </Link>

                        <button
                            onClick={onClose}
                            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20"
                        >
                            <X size={16} />
                            <span>Fermer</span>
                        </button>
                    </div>

                    {/* ── Main Navigation List ── */}
                    <nav className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-6 sm:px-12 py-8 flex flex-col justify-center">
                        <ul className="space-y-3">
                            {mainNav.map((item, idx) => {
                                const hasChildren = item.children && item.children.length > 0;
                                const isExpanded = expandedCategory === item.key;

                                return (
                                    <li key={item.key} className="border-b border-white/5 pb-2">
                                        <motion.div
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.05 + idx * 0.04, duration: 0.4 }}
                                            className="flex flex-col"
                                        >
                                            <div className="flex items-center justify-between">
                                                {item.href ? (
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => handleNavClick(item)}
                                                        className="group flex items-center py-2 text-left"
                                                    >
                                                        <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white/80 group-hover:text-white transition-colors font-poppins">
                                                            {item.label}
                                                        </span>
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() => handleNavClick(item)}
                                                        className="group flex items-center py-2 text-left"
                                                    >
                                                        <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white/80 group-hover:text-white transition-colors font-poppins">
                                                            {item.label}
                                                        </span>
                                                    </button>
                                                )}

                                                {hasChildren && (
                                                    <button
                                                        onClick={() => handleToggleCategory(item.key)}
                                                        className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all"
                                                        aria-label="Afficher les sous-rubriques"
                                                    >
                                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : ''}`} />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Sub-items accordion */}
                                            {hasChildren && isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="pl-6 sm:pl-10 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-white/10 mt-2"
                                                >
                                                    {item.children.map((sub, sIdx) => (
                                                        <Link
                                                            key={sIdx}
                                                            href={sub.href}
                                                            onClick={onClose}
                                                            className="flex items-center p-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-bold transition-all font-poppins"
                                                        >
                                                            <span>{sub.label}</span>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* ── Footer of Nav Menu Overlay ── */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 px-6 sm:px-12 py-6 bg-black/20">
                        <div className="flex items-center gap-6">
                            <span className="text-xs uppercase tracking-widest text-white/50">
                                BRAZZAVILLE • {clock.time}
                            </span>
                            <SocialLinks tone="dark" />
                        </div>

                        <Link
                            href={route('contact')}
                            onClick={onClose}
                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#38bdf8] hover:text-white transition-colors"
                        >
                            <span>DÉMARRER UN PROJET</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
