import React, { useEffect, useRef, createContext, useContext, useState } from 'react';

/** Context that gates hero/above-the-fold reveals until the loader finishes. */
export const ReadyContext = createContext(false);
export function useReady() { return useContext(ReadyContext); }

/**
 * LineReveal
 * Splits text into visual lines and slides each up from an overflow:hidden clip.
 * Works as a simple wrapper — pass text or children that fit on 1–4 lines.
 *
 * Props
 *   text        — raw string to split by ' / ' (each part = one line)
 *   lines       — OR pass lines as an array directly
 *   delay       — overall start delay (ms), default 0
 *   lineStagger — per-line stagger (ms), default 90
 *   duration    — each line duration (ms), default 900
 *   className   — passed to the outer wrapper
 *   ready       — if false, won't animate until true (used for hero gating)
 */
export function LineReveal({ text, lines: linesProp, delay = 0, lineStagger = 90, duration = 900, className = '', ready = true, as: Tag = 'h2' }) {
    const lines = linesProp ?? (text ? text.split(' / ') : []);
    const refs = useRef([]);
    const observed = useRef(false);

    useEffect(() => {
        if (!ready || observed.current) return;
        const targets = refs.current.filter(Boolean);
        if (!targets.length) return;

        // Reset initial state
        targets.forEach((el) => {
            el.style.transform = 'translateY(105%)';
            el.style.opacity = '0';
        });

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    observed.current = true;
                    observer.disconnect();
                    targets.forEach((el, i) => {
                        const ms = delay + i * lineStagger;
                        el.style.transition = `transform ${duration}ms cubic-bezier(0.215,0.61,0.355,1) ${ms}ms, opacity ${duration}ms ease ${ms}ms`;
                        el.style.transform = 'translateY(0%)';
                        el.style.opacity = '1';
                    });
                }
            },
            { threshold: 0.1 }
        );

        if (targets[0]) observer.observe(targets[0].closest('[data-reveal-host]') || targets[0]);

        return () => observer.disconnect();
    }, [ready, delay, lineStagger, duration]);

    return (
        <Tag className={className} data-reveal-host>
            {lines.map((line, i) => (
                <span
                    key={i}
                    style={{ display: 'block', overflow: 'hidden', lineHeight: 'inherit' }}
                >
                    <span
                        ref={(el) => (refs.current[i] = el)}
                        style={{ display: 'block', transform: 'translateY(105%)', opacity: 0, willChange: 'transform, opacity' }}
                    >
                        {line}
                    </span>
                </span>
            ))}
        </Tag>
    );
}

/**
 * WordReveal
 * Splits text into words, each slides up + fades in with per-word stagger.
 * Ideal for large statement paragraphs.
 */
export function WordReveal({ text, delay = 0, wordStagger = 35, duration = 700, className = '', style = {}, as: Tag = 'p' }) {
    const words = text.split(' ');
    const refs = useRef([]);
    const hostRef = useRef(null);
    const observed = useRef(false);

    useEffect(() => {
        const targets = refs.current.filter(Boolean);
        if (!targets.length) return;

        targets.forEach((el) => {
            el.style.transform = 'translateY(24px)';
            el.style.opacity = '0';
        });

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    observed.current = true;
                    observer.disconnect();
                    targets.forEach((el, i) => {
                        const ms = delay + i * wordStagger;
                        el.style.transition = `transform ${duration}ms cubic-bezier(0.165,0.84,0.44,1) ${ms}ms, opacity ${duration}ms ease ${ms}ms`;
                        el.style.transform = 'translateY(0)';
                        el.style.opacity = '1';
                    });
                }
            },
            { threshold: 0.1 }
        );

        if (hostRef.current) observer.observe(hostRef.current);

        return () => observer.disconnect();
    }, [delay, wordStagger, duration]);

    return (
        <Tag ref={hostRef} className={className} style={{ overflow: 'hidden', ...style }}>
            {words.map((word, i) => (
                <span key={i} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                    <span
                        ref={(el) => (refs.current[i] = el)}
                        style={{ display: 'inline-block', transform: 'translateY(24px)', opacity: 0, willChange: 'transform, opacity' }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </Tag>
    );
}

/**
 * SpringReveal
 * Single-element entrance reveal: translateY(offset) + opacity 0→1
 * Triggers once on IntersectionObserver.
 */
export function SpringReveal({ children, delay = 0, offsetY = 28, duration = 700, className = '', as: Tag = 'div' }) {
    const elRef = useRef(null);
    const observed = useRef(false);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        el.style.transform = `translateY(${offsetY}px)`;
        el.style.opacity = '0';

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    observed.current = true;
                    observer.disconnect();
                    setTimeout(() => {
                        el.style.transition = `transform ${duration}ms cubic-bezier(0.22,1,0.36,1), opacity ${duration}ms ease`;
                        el.style.transform = 'translateY(0)';
                        el.style.opacity = '1';
                    }, delay);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay, offsetY, duration]);

    return (
        <Tag ref={elRef} className={className} style={{ willChange: 'transform, opacity' }}>
            {children}
        </Tag>
    );
}
