import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Stacking scroll panel.
 *
 * Each panel sticks in place once it is fully on screen, so the next one climbs
 * over it instead of pushing it away. While a panel is being covered it recedes
 * — scales down slightly and dims — to read as moving behind.
 *
 * The sticky offset is measured rather than fixed at 0: a panel taller than the
 * viewport must scroll normally until its bottom arrives, otherwise `top: 0`
 * would pin its heading and everything below it would be unreachable.
 *
 * Progress is computed from the panel's *layout* position rather than with
 * `useScroll`: once the panel is stuck its bounding box stops moving, so any
 * viewport-relative measurement reads a constant and the effect never fires.
 *
 * The depth effect is skipped on small screens and whenever the visitor asks
 * for reduced motion; the stacking itself still works there.
 */
export default function StackSection({ children, zIndex = 0, depth = true }) {
    const ref = useRef(null);
    const [stickyTop, setStickyTop] = useState(0);
    const [wideScreen, setWideScreen] = useState(false);
    const reducedMotion = useReducedMotion();
    const progress = useMotionValue(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Layout top of the panel: sum of the preceding siblings' heights, plus
        // where the stack itself starts. Reading the panel's own rect would give
        // the stuck position instead.
        const layoutTop = () => {
            let offset = 0;
            for (let sib = el.previousElementSibling; sib; sib = sib.previousElementSibling) {
                offset += sib.offsetHeight;
            }
            const parent = el.parentElement.getBoundingClientRect();
            return parent.top + window.scrollY + offset;
        };

        let frame = 0;
        let coverStart = 0;
        let span = 1;

        const update = () => {
            frame = 0;
            progress.set(Math.min(1, Math.max(0, (window.scrollY - coverStart) / span)));
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        const measure = () => {
            const viewport = window.innerHeight;
            span = viewport;
            coverStart = layoutTop() + el.offsetHeight - viewport;
            setStickyTop(Math.min(0, viewport - el.offsetHeight));
            setWideScreen(window.innerWidth >= 768);
            update();
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', measure);
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', measure);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [progress]);

    const scale = useTransform(progress, [0, 1], [1, 0.93]);
    const dim = useTransform(progress, [0, 1], [0, 0.55]);
    const depthActive = depth && wideScreen && !reducedMotion;

    return (
        <motion.div
            ref={ref}
            className="sticky"
            style={{
                top: stickyTop,
                zIndex,
                ...(depthActive ? { scale } : null),
            }}
        >
            {children}

            {depthActive && (
                <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-[#0A0A0C]"
                    style={{ opacity: dim }}
                />
            )}
        </motion.div>
    );
}
