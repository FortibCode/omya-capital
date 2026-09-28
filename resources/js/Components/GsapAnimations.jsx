import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/Utils/gsapSetup';

/**
 * GSAP Title Reveal Component
 * Supports subtle progressive text reveal with vertical translation and opacity fade-in.
 */
export function GsapTitle({
    children,
    as: Tag = 'h2',
    className = '',
    delay = 0,
    duration = 1.15,
    once = true,
    ...rest
}) {
    const elRef = useRef(null);

    useEffect(() => {
        if (!elRef.current) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            gsap.set(elRef.current, { opacity: 1, y: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                elRef.current,
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: duration,
                    delay: delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elRef.current,
                        start: 'top 85%',
                        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
                    },
                }
            );
        }, elRef);

        return () => ctx.revert();
    }, [delay, duration, once]);

    return (
        <Tag ref={elRef} className={className} {...rest}>
            {children}
        </Tag>
    );
}

/**
 * GSAP Subtle Parallax Component
 * Adds gentle, unhurried parallax scrolling effect on background imagery.
 */
export function GsapParallax({
    children,
    className = '',
    speed = 10, // percentage offset (-10% to +10%)
    ...rest
}) {
    const elRef = useRef(null);

    useEffect(() => {
        if (!elRef.current) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                elRef.current,
                { yPercent: -Math.abs(speed) },
                {
                    yPercent: Math.abs(speed),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: elRef.current.parentElement || elRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.2,
                    },
                }
            );
        }, elRef);

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={elRef} className={className} {...rest}>
            {children}
        </div>
    );
}

/**
 * GSAP Image Clip & Scale Reveal
 * Revealing images with a subtle scale (1.06 -> 1.0) and opacity fade.
 */
export function GsapImageReveal({
    src,
    alt = '',
    className = '',
    imgClassName = '',
    delay = 0,
    duration = 1.2,
    ...rest
}) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !imgRef.current) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            gsap.set(imgRef.current, { opacity: 1, scale: 1 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                imgRef.current,
                { opacity: 0, scale: 1.08 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: duration,
                    delay: delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [delay, duration]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`} {...rest}>
            <img ref={imgRef} src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
        </div>
    );
}
