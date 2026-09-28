import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

// ─── Singleton context ─────────────────────────────────────────────────────
export const LenisContext = createContext(null);

export function useLenis() {
    return useContext(LenisContext);
}

/**
 * Creates a single Lenis instance, starts the RAF loop, and returns
 * { lenis, stop, start } to be provided via LenisContext.
 * Call this once at the root (PublicLayout).
 */
export function createLenisInstance() {
    // Reset scroll position to top on fresh page load
    if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
    }

    const lenis = new Lenis({ smoothWheel: true, lerp: 0.075 });

    let rafId = null;

    function rafLoop(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(rafLoop);
    }

    rafId = requestAnimationFrame(rafLoop);

    function stop() {
        lenis.stop();
        document.documentElement.style.position = 'relative';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
    }

    function start() {
        lenis.start();
        document.documentElement.style.removeProperty('position');
        document.documentElement.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('height');
    }

    function destroy() {
        if (rafId) cancelAnimationFrame(rafId);
        lenis.destroy();
    }

    function scrollTo(id, offset = 0) {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
        start();
        setTimeout(() => {
            window.scrollTo({ top, behavior: 'smooth' });
        }, 50);
    }

    return { lenis, stop, start, destroy, scrollTo };
}
