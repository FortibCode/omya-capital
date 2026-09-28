import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/Utils/gsapSetup';

// Directional starting offsets
const DIRECTIONS = {
    up:    { y: 40, x: 0 },
    down:  { y: -40, x: 0 },
    left:  { y: 0, x: 50 },
    right: { y: 0, x: -50 },
    scale: { scale: 0.93, y: 0, x: 0 },
    none:  { y: 0, x: 0 },
};

/**
 * Institutional GSAP ScrollTrigger reveal component.
 * Supports directional animations, parallax, title reveals, stagger, and prefers-reduced-motion.
 * 
 * Props:
 *   direction   — 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'
 *   type        — 'default' | 'title' | 'paragraph' | 'card' | 'image' | 'parallax'
 *   delay       — start delay in seconds
 *   duration    — animation duration in seconds
 *   distance    — override default translation distance in px
 *   once        — play once only (default true)
 *   amount      — IntersectionObserver threshold (0-1) — maps to ScrollTrigger start
 *   stagger     — if > 0 and children exist, animate children with stagger
 *   start       — override ScrollTrigger start string (e.g. 'top 80%')
 */
export default function RevealOnScroll({
    children,
    as: Tag = 'div',
    direction = 'up',
    type = 'default',
    delay = 0,
    duration = 1.1,
    distance,
    once = true,
    amount = 0.15,
    className = '',
    style,
    stagger = 0,
    start,
    ...rest
}) {
    const elRef = useRef(null);

    useEffect(() => {
        if (!elRef.current) return;

        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            gsap.set(elRef.current, { opacity: 1, y: 0, x: 0, scale: 1 });
            return;
        }

        const ctx = gsap.context(() => {
            const offset = DIRECTIONS[direction] || DIRECTIONS.up;
            const startY = distance !== undefined && (direction === 'up' || direction === 'down')
                ? (direction === 'down' ? -distance : distance)
                : offset.y;
            const startX = distance !== undefined && (direction === 'left' || direction === 'right')
                ? (direction === 'right' ? -distance : distance)
                : offset.x;

            const fromVars = {
                opacity: 0,
                y: startY,
                x: startX,
                scale: direction === 'scale' ? 0.93 : 1,
            };

            const triggerStart = start || `top ${Math.round((1 - amount) * 100)}%`;

            const baseToVars = {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration: duration,
                delay: delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elRef.current,
                    start: triggerStart,
                    toggleActions: once ? 'play none none none' : 'play reverse play reverse',
                },
            };

            if (type === 'parallax') {
                gsap.fromTo(
                    elRef.current,
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: elRef.current.parentElement || elRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.5,
                        },
                    }
                );
            } else if (type === 'image') {
                gsap.fromTo(
                    elRef.current,
                    { opacity: 0, scale: 1.06 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: duration + 0.2,
                        delay: delay,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: elRef.current,
                            start: triggerStart,
                            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
                        },
                    }
                );
            } else if (stagger > 0 && elRef.current.children.length > 0) {
                gsap.fromTo(
                    elRef.current.children,
                    { opacity: 0, y: 40, scale: 0.96 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: duration,
                        delay: delay,
                        stagger: stagger,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: elRef.current,
                            start: triggerStart,
                            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
                        },
                    }
                );
            } else {
                gsap.fromTo(elRef.current, fromVars, baseToVars);
            }
        }, elRef);

        return () => ctx.revert();
    }, [direction, type, delay, duration, distance, once, amount, stagger, start]);

    return (
        <Tag ref={elRef} className={className} style={style} {...rest}>
            {children}
        </Tag>
    );
}

/**
 * Helper to compute staggered animation delay for grid or list items.
 * index × base + start (default base = 0.25s for suspenseful 1-by-1 reveals)
 */
export function staggerDelay(index, base = 0.25, start = 0) {
    return start + index * base;
}
