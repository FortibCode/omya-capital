import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import OmyaLogo from '@/Components/OmyaLogo';
import SocialLinks from '@/Components/SocialLinks';
import { useLanguage } from '@/Context/LanguageContext';
import { ChevronDown, Menu } from 'lucide-react';

/**
 * White progress line at top of viewport, filling up as the user scrolls.
 */
function TopScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-white z-[120] origin-left shadow-[0_0_12px_rgba(255,255,255,0.9)] pointer-events-none"
            style={{ scaleX }}
        />
    );
}

/**
 * Humanized Language Switcher (Clean, natural typography dropdown)
 */
function LanguageSelector() {
    const { lang, changeLanguage, languages } = useLanguage();
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const currentLang = languages[lang] || languages.fr;

    useEffect(() => {
        if (!open) return;
        const handlePointerDown = (event) => {
            if (!containerRef.current?.contains(event.target)) setOpen(false);
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 py-2 px-2 text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white transition-colors"
            >
                <span className="font-extrabold">{currentLang.code}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 bg-[#0B1F33] border border-white/20 rounded-xl shadow-2xl p-2 z-50 min-w-[160px]"
                    >
                        {Object.values(languages).map((l) => (
                            <button
                                key={l.code}
                                type="button"
                                onClick={() => {
                                    changeLanguage(l.code);
                                    setOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold text-left transition-all ${
                                    lang === l.code
                                        ? 'bg-[#0B4F71] text-white'
                                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <span className="text-base leading-none">{l.flag}</span>
                                <span>{l.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function HeaderNav({ onMenuOpen }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* ── White scroll progress indicator fixed at top ── */}
            <TopScrollProgress />

            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 text-white ${
                    scrolled
                        ? 'py-4 bg-[#0B2A45]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
                        : 'py-6 sm:py-8 bg-transparent'
                }`}
            >
                <div className="max-w-[1700px] mx-auto px-6 sm:px-12 relative flex items-center justify-between">
                    {/* ── LEFT: Official Social Media Colors ──
                        Hidden on phones: the logo is centred absolutely, so below ~640px
                        these icons run underneath it. They stay reachable in the menu
                        panel and the footer. */}
                    <div className="hidden sm:flex items-center">
                        <SocialLinks tone="dark" />
                    </div>

                    {/* ── CENTER: Logo OMYA CAPITAL ──
                        The white variant: this header sits over the dark hero video and
                        keeps a navy background once scrolled, so the navy logo was
                        invisible in both states. */}
                    <div className="static sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center">
                        <Link href={route('home')} className="flex items-center group py-1">
                            <OmyaLogo
                                variant="light"
                                height={58}
                                className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                                    scrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-16 lg:h-18'
                                }`}
                            />
                        </Link>
                    </div>

                    {/* ── RIGHT: Humanized Language Selector + Hamburger Menu Button ──
                        ml-auto keeps this block on the right even on phones, where the
                        social icons on the left are hidden and justify-between alone
                        would pull it back to the start. */}
                    <div className="flex items-center gap-4 sm:gap-6 ml-auto">
                        {/* Language Switcher */}
                        <LanguageSelector />

                        {/* Clean Humanized Hamburger Button */}
                        <button
                            type="button"
                            onClick={onMenuOpen}
                            aria-label="Ouvrir le menu de navigation"
                            className="flex items-center gap-2 py-2 px-1 text-white hover:text-[#38bdf8] font-bold text-xs uppercase tracking-widest transition-colors group"
                        >
                            <Menu className="w-6 h-6 transition-transform group-hover:scale-110" />
                        </button>
                    </div>
                </div>
            </motion.header>
        </>
    );
}

