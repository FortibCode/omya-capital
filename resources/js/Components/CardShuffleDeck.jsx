import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useInView from '@/Hooks/useInView';

/**
 * CardShuffleDeck:
 * Creates a 3D deck-shuffling / page-flipping animation effect.
 * The top card lifts, rotates in 3D space (like flipping a book page or shuffling playing cards),
 * and moves to the back of the deck to reveal the next card.
 */
export default function CardShuffleDeck({ cards = [], interval = 3500, hint = 'Cliquer pour battre les cartes' }) {
    // Only the rotation offset is state — the deck itself is derived from `cards`
    // on every render. Copying `cards` into state froze the initial props, so a
    // language change left the captions in the previous language until a reload.
    const [offset, setOffset] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const rootRef = useRef(null);
    const inView = useInView(rootRef);

    const count = cards?.length ?? 0;
    const handleShuffle = () => {
        if (count > 1) setOffset((previous) => (previous + 1) % count);
    };

    // Auto shuffle every interval unless hovered or scrolled out of view
    useEffect(() => {
        if (isHovered || !inView || count <= 1) return;
        const timer = setInterval(() => {
            setOffset((previous) => (previous + 1) % count);
        }, interval);
        return () => clearInterval(timer);
    }, [isHovered, inView, count, interval]);

    if (count === 0) return null;

    const deck = Array.from({ length: count }, (_, i) => cards[(offset + i) % count]);

    return (
        <div
            ref={rootRef}
            className="relative w-full max-w-md mx-auto aspect-[4/5] cursor-pointer"
            onClick={handleShuffle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Ambient glow underneath the deck */}
            <div className="absolute inset-0 rounded-3xl transform scale-95 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(11,79,113,0.3) 0%, transparent 70%)' }} />

            {/* Stacked Cards */}
            <AnimatePresence mode="popLayout">
                {deck.map((card, index) => {
                    // Position in stack: 0 is top card, 1 is middle, 2 is back
                    const position = index;
                    const isTop = position === 0;

                    // 3D Stack Offset transforms
                    const rotateZ = position === 0 ? 0 : position === 1 ? -4 : 4;
                    const translateX = position === 0 ? 0 : position === 1 ? -8 : 8;
                    const translateY = position === 0 ? 0 : position === 1 ? 8 : 16;
                    const scale = 1 - position * 0.04;
                    const zIndex = deck.length - position;

                    return (
                        <motion.div
                            key={card.id || card.title || card.image}
                            layout
                            initial={{
                                opacity: 0,
                                rotateY: -45,
                                x: 140,
                                y: -20,
                                scale: 0.9,
                            }}
                            animate={{
                                opacity: 1,
                                rotateY: 0,
                                rotateZ: rotateZ,
                                x: translateX,
                                y: translateY,
                                scale: scale,
                                zIndex: zIndex,
                            }}
                            exit={{
                                opacity: 0,
                                rotateY: 50,
                                rotateZ: 12,
                                x: -160,
                                y: 30,
                                scale: 0.85,
                                transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                            }}
                            transition={{
                                layout: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.4 },
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="absolute inset-0 rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/60 bg-[#0B1F33]"
                        >
                            {/* Card Image */}
                            <img
                                src={card.image}
                                alt={card.title || 'OMYA Capital'}
                                className="w-full h-full object-cover object-center"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/85 via-[#0B1F33]/25 to-transparent" />

                            {/* Card caption — name and role of the person shown */}
                            <div className="absolute bottom-6 left-6 right-6 z-10">
                                {card.subtitle && (
                                    <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/70 block">
                                        {card.subtitle}
                                    </span>
                                )}
                                <h4 className="text-base font-black text-white leading-tight mt-1">
                                    {card.title}
                                </h4>
                            </div>

                            {/* Book page fold effect line */}
                            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {/* Click / Tap visual hint */}
            <div className="absolute -bottom-8 left-0 right-0 text-center pointer-events-none">
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
                    {hint}
                </span>
            </div>
        </div>
    );
}
