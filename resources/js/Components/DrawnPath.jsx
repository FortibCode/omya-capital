import React, { useEffect, useRef, useId } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Generates a smooth sinusoidal SVG path.
 * Uses 120 sample points so the wave is perfectly smooth.
 */
function buildSinePath(nodeCount, isHorizontal, amplitude) {
    // nodeCount - 1 half-periods so each node sits at a crest or trough
    const halfPeriods = nodeCount - 1;
    const steps = 120;
    let d = '';

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const angle = t * Math.PI * halfPeriods;
        const sine = Math.sin(angle);

        const along = t * 100;
        const across = 50 + sine * amplitude;

        const x = isHorizontal ? along : across;
        const y = isHorizontal ? across : along;

        d += i === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
    }
    return d;
}

export default function DrawnPath({
    nodeCount = 4,
    orientation = 'horizontal',
    swing,
    containerRef,
    className = '',
}) {
    const baseRef  = useRef(null);   // the wave revealed on scroll
    const glowRef  = useRef(null);   // soft ambient glow (always present once revealed)
    const streakRef = useRef(null);  // travelling light streak

    const isHorizontal = orientation === 'horizontal';
    const amplitude = swing ?? (isHorizontal ? 18 : 32);
    const d = buildSinePath(nodeCount, isHorizontal, amplitude);

    // Unique IDs so multiple instances never conflict
    const uid = useId().replace(/:/g, '');
    const filterId  = `sine-glow-${uid}`;
    const gradId    = `sine-grad-${uid}`;
    const grad2Id   = `sine-grad2-${uid}`;

    // `containerRef` lives on an ancestor element (the caller's wrapping div),
    // not inside this component's own subtree. React commits refs/layout
    // effects bottom-up, so `useGSAP`'s internal useLayoutEffect can fire
    // before that ancestor ref is attached. A plain `useEffect` always runs
    // after every layout effect/ref in the tree has settled, so we do the
    // actual GSAP setup there — wrapped in `contextSafe` so the tweens and
    // ScrollTrigger it creates are still tracked for cleanup on unmount.
    const { contextSafe } = useGSAP({ scope: containerRef, dependencies: [nodeCount] });

    useEffect(() => {
        contextSafe(() => {
            const base = baseRef.current;
            const glow = glowRef.current;
            const streak = streakRef.current;
            const trigger = containerRef?.current;
            if (!base || !trigger) return;

            const len = base.getTotalLength();

            /* ── 1. Scroll-driven reveal of the base wave ── */
            gsap.set(base, { strokeDasharray: len, strokeDashoffset: len });
            gsap.set(streak, { opacity: 0 });
            gsap.set(glow, { opacity: 0 });

            gsap.to(base, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger,
                    start: 'top 80%',
                    end: 'bottom 58%',
                    scrub: 0.7,
                    onEnter() {
                        // Fade in glow layer
                        gsap.to(glow, { opacity: 1, duration: 0.8 });

                        // Start the travelling streak after a short delay
                        gsap.to(streak, { opacity: 1, duration: 0.6, delay: 0.4 });
                    },
                },
            });

            /* ── 2. Travelling streak — repeats forever ── */
            // The "streak" is a short dash (25% of path) that loops the full length.
            const dashLen = len * 0.28; // visible portion

            gsap.set(streak, {
                strokeDasharray: `${dashLen} ${len}`,
                strokeDashoffset: dashLen, // start just off the beginning
            });

            gsap.to(streak, {
                strokeDashoffset: -len, // travel to end
                duration: 2.8,
                ease: 'none',
                repeat: -1,
            });
        })();
    }, [nodeCount, contextSafe]);

    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            aria-hidden="true"
        >
            <defs>
                {/* Glow blur filter */}
                <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="1.8" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Streak gradient — bright center, transparent edges */}
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#38BDF8" stopOpacity="0" />
                    <stop offset="20%"  stopColor="#38BDF8" stopOpacity="0.6" />
                    <stop offset="50%"  stopColor="#7DD3FC" stopOpacity="1" />
                    <stop offset="80%"  stopColor="#38BDF8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </linearGradient>

                {/* Glow ambient gradient */}
                <linearGradient id={grad2Id} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#0B4F71" stopOpacity="0.3" />
                    <stop offset="50%"  stopColor="#0EA5E9" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0B4F71" stopOpacity="0.3" />
                </linearGradient>
            </defs>

            {/* ── Layer 1: base wave (scroll-revealed) ── */}
            <path
                ref={baseRef}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.55"
            />

            {/* ── Layer 2: ambient glow pulse ── */}
            <path
                ref={glowRef}
                d={d}
                fill="none"
                stroke={`url(#${grad2Id})`}
                strokeWidth="2.5"
                strokeLinecap="round"
                filter={`url(#${filterId})`}
                opacity="0"
            />

            {/* ── Layer 3: bright travelling streak ── */}
            <path
                ref={streakRef}
                d={d}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="2"
                strokeLinecap="round"
                filter={`url(#${filterId})`}
                opacity="0"
            />
        </svg>
    );
}
