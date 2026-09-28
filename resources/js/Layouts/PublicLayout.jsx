import React, { useState, useEffect, useRef } from 'react';
import HeaderNav from '@/Components/HeaderNav';
import IntroLoader from '@/Components/IntroLoader';
import NavMenu from '@/Components/NavMenu';
import SpotlightCursor from '@/Components/SpotlightCursor';
import LumoraFooter from '@/Components/LumoraFooter';
import { ReadyContext } from '@/Components/AnimationPrimitives';
import { AnimatePresence, motion } from 'framer-motion';
import { usePage, router } from '@inertiajs/react';
import { LanguageProvider, useLanguage } from '@/Context/LanguageContext';
import Lenis from 'lenis';

// ─── Lenis singleton ────────────────────────────────────────────────────────
let lenisInstance = null;
let lenisRafId = null;

function getLenis() {
    if (lenisInstance) return lenisInstance;
    lenisInstance = new Lenis({ smoothWheel: true, lerp: 0.08 });
    function raf(t) {
        lenisInstance.raf(t);
        lenisRafId = requestAnimationFrame(raf);
    }
    lenisRafId = requestAnimationFrame(raf);
    return lenisInstance;
}

function stopScroll(lenis) {
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
}

function startScroll(lenis) {
    lenis?.start();
    document.documentElement.style.removeProperty('overflow');
}

// ─── Inner Layout Component ──────────────────────────────────────────────────
function InnerLayout({ children, hideFooter, hideNav }) {
    const { url } = usePage();
    const [ready, setReady] = useState(false);
    const [navMenuOpen, setNavMenuOpen] = useState(false);
    const lenisRef = useRef(null);

    useEffect(() => {
        lenisRef.current = getLenis();
        stopScroll(lenisRef.current);

        // Safety fallback: Ensure page unveils and unlocks scroll even if loader transition is delayed
        const fallback = setTimeout(() => {
            setReady(true);
            startScroll(lenisRef.current);
        }, 2000);

        return () => clearTimeout(fallback);
    }, []);

    function handleLoaderDone() {
        setReady(true);
        startScroll(lenisRef.current);
    }

    useEffect(() => {
        if (navMenuOpen) stopScroll(lenisRef.current);
        else if (ready) startScroll(lenisRef.current);
    }, [navMenuOpen, ready]);

    const handleOpenModal = () => {
        setNavMenuOpen(false);
        router.visit(route('contact'));
    };

    return (
        <ReadyContext.Provider value={ready}>
            {/* ── Spotlight Cursor Effect ── */}
            <SpotlightCursor />

            {/* ── Lumora Dark Intro Loader ── */}
            <IntroLoader onDone={handleLoaderDone} />

            {/* ── Fullscreen Overlay Nav Menu ── */}
            <NavMenu
                isOpen={navMenuOpen}
                onClose={() => setNavMenuOpen(false)}
                onContact={handleOpenModal}
            />

            {/* ── Top Header Navigation ── */}
            {!hideNav && (
                <HeaderNav
                    onMenuOpen={() => setNavMenuOpen(true)}
                    onOpenModal={handleOpenModal}
                />
            )}

            {/* ── Main View Area ── */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={url}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } }}
                    className="flex-grow min-h-screen"
                >
                    {React.cloneElement(children, { onOpenModal: handleOpenModal, onMenuOpen: () => setNavMenuOpen(true) })}
                </motion.main>
            </AnimatePresence>

            {/* ── Lumora Dark Footer ── */}
            {!hideFooter && <LumoraFooter onOpenModal={handleOpenModal} />}
        </ReadyContext.Provider>
    );
}

// ─── Export PublicLayout Root ────────────────────────────────────────────────
export default function PublicLayout({ children, hideFooter = false, hideNav = false }) {
    return (
        <LanguageProvider>
            <div className="min-h-screen bg-[#0B1F33] text-white font-sans flex flex-col selection:bg-[#38bdf8] selection:text-[#0B1F33]">
                <InnerLayout hideFooter={hideFooter} hideNav={hideNav}>
                    {children}
                </InnerLayout>
            </div>
        </LanguageProvider>
    );
}
