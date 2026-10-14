import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * SpotlightCursor
 *
 * Three colours, each doing a job rather than decorating:
 *   — BLUE  the ambient halo and the core dot, the brand accent
 *   — WHITE the ring, which is what the eye actually follows
 *   — BLACK a one-pixel edge on either side of that ring
 *
 * The black matters more than it looks: the site runs white type on dark
 * artwork in most places, but the partner plates and the logo panels are
 * near-white. A plain white ring disappears on those. Outlined in black it
 * stays visible on anything.
 */
const BLUE = '56, 189, 248';
const WHITE = '255, 255, 255';
const BLACK = '0, 0, 0';
export default function SpotlightCursor() {
    const [visible, setVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

    // High responsiveness physics spring
    const springConfig = { damping: 30, stiffness: 400, mass: 0.4 };
    const spotlightX = useSpring(mouseX, springConfig);
    const spotlightY = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setVisible(false);
            return;
        }

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!visible) setVisible(true);

            const target = e.target;
            if (target && target instanceof Element) {
                const isInteractive = Boolean(
                    target.closest('a, button, input, select, textarea, [role="button"], .interactive-hover')
                );
                setIsHovered(isInteractive);
            }
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const handleMouseLeave = () => setVisible(false);
        const handleMouseEnter = () => setVisible(true);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, visible]);

    if (!visible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
            {/* Large Ambient Radial Spotlight Beam */}
            <motion.div
                className="absolute rounded-full pointer-events-none mix-blend-screen"
                style={{
                    x: spotlightX,
                    y: spotlightY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: isHovered ? 650 : 520,
                    height: isHovered ? 650 : 520,
                    background: isHovered
                        ? `radial-gradient(circle, rgba(${BLUE}, 0.22) 0%, rgba(${BLACK}, 0.14) 40%, transparent 70%)`
                        : `radial-gradient(circle, rgba(${BLUE}, 0.15) 0%, rgba(${BLACK}, 0.08) 45%, transparent 70%)`,
                    transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease',
                }}
            />

            {/* Precision Spotlight Ring & Core Cursor Pointer */}
            <motion.div
                className="absolute rounded-full pointer-events-none border"
                style={{
                    x: spotlightX,
                    y: spotlightY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: isClicked ? 24 : isHovered ? 54 : 34,
                    height: isClicked ? 24 : isHovered ? 54 : 34,
                    borderColor: `rgba(${WHITE}, ${isHovered ? 0.95 : 0.8})`,
                    backgroundColor: isHovered ? `rgba(${BLUE}, 0.18)` : `rgba(${BLACK}, 0.12)`,
                    // Two hairlines of black, outside and inside the white ring,
                    // then the blue glow.
                    boxShadow: isHovered
                        ? `0 0 0 1px rgba(${BLACK}, 0.5), inset 0 0 0 1px rgba(${BLACK}, 0.35), 0 0 25px rgba(${BLUE}, 0.6)`
                        : `0 0 0 1px rgba(${BLACK}, 0.45), inset 0 0 0 1px rgba(${BLACK}, 0.3), 0 0 15px rgba(${BLUE}, 0.35)`,
                    transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
            >
                {/* Center precision micro dot */}
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                        backgroundColor: `rgb(${BLUE})`,
                        boxShadow: `0 0 0 1px rgba(${BLACK}, 0.55), 0 0 8px rgba(${BLUE}, 0.9)`,
                    }}
                />
            </motion.div>
        </div>
    );
}
