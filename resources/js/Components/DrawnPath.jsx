import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * A flowing zigzag line connecting `nodeCount` evenly-spaced points, drawn
 * progressively as the given container scrolls through the viewport.
 * Purely decorative (aria-hidden) — content alignment is handled by the
 * caller giving each "row"/"column" an equal share of this box (100/nodeCount).
 */
export default function DrawnPath({ nodeCount = 4, orientation = 'vertical', swing, containerRef, className = '' }) {
    const pathRef = useRef(null);
    const isHorizontal = orientation === 'horizontal';
    const half = (swing ?? (isHorizontal ? 12 : 32));

    const nodes = Array.from({ length: nodeCount }, (_, i) => {
        const along = ((i + 0.5) / nodeCount) * 100;
        const across = i % 2 === 0 ? 50 - half : 50 + half;
        return isHorizontal ? { x: along, y: across } : { x: across, y: along };
    });

    let d = `M ${nodes[0].x},${nodes[0].y}`;
    for (let i = 1; i < nodes.length; i++) {
        const prev = nodes[i - 1];
        const curr = nodes[i];
        d += isHorizontal
            ? ` C ${(prev.x + curr.x) / 2},${prev.y} ${(prev.x + curr.x) / 2},${curr.y} ${curr.x},${curr.y}`
            : ` C ${prev.x},${(prev.y + curr.y) / 2} ${curr.x},${(prev.y + curr.y) / 2} ${curr.x},${curr.y}`;
    }

    useGSAP(
        () => {
            const path = pathRef.current;
            const trigger = containerRef?.current;
            if (!path || !trigger) return;

            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

            gsap.to(path, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger,
                    start: 'top 78%',
                    end: 'bottom 60%',
                    scrub: 0.6,
                },
            });
        },
        { scope: containerRef, dependencies: [nodeCount] },
    );

    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} aria-hidden="true">
            <path ref={pathRef} d={d} fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        </svg>
    );
}
