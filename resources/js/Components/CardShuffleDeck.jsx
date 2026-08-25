import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CardShuffleDeck:
 * Creates a 3D deck-shuffling / page-flipping animation effect.
 * The top card lifts, rotates in 3D space (like flipping a book page or shuffling playing cards),
 * and moves to the back of the deck to reveal the next card.
 */
export default function CardShuffleDeck({ cards = [], interval = 3500, hint = 'Cliquer pour battre les cartes' }) {
    const [deck, setDeck] = useState(cards);
    const [isHovered, setIsHovered] = useState(false);

    // Auto shuffle every interval unless hovered
    useEffect(() => {
        if (isHovered || deck.length <= 1) return;
        const timer = setInterval(() => {
            handleShuffle();
        }, interval);
        return () => clearInterval(timer);
    }, [isHovered, deck.length, interval]);

    const handleShuffle = () => {
        setDeck((prevDeck) => {
            const newDeck = [...prevDeck];
            const topCard = newDeck.shift();
            newDeck.push(topCard);
            return newDeck;
        });
    };

    if (!cards || cards.length === 0) return null;

    return (
        <div
            className="relative w-full max-w-md mx-auto aspect-[4/5] cursor-pointer"
            onClick={handleShuffle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Ambient glow underneath the deck */}
            <div className="absolute inset-0 rounded-3xl bg-[#0B4F71]/30 blur-2xl transform scale-95 pointer-events-none" />

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

                            {/* Card Caption Badge */}
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                                <div>
                                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/70 block">
                                        {card.subtitle || 'OMYA CAPITAL'}
                                    </span>
                                    <h4 className="text-sm font-black text-white leading-tight mt-0.5">
                                        {card.title}
                                    </h4>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center text-white text-xs font-black shadow-md">
                                    0{position + 1}
                                </div>
                            </div>

                            {/* Book page fold effect line */}
                            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {/* Click / Tap visual hint */}
            <div className="absolute -bottom-8 left-0 right-0 text-center pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    {hint}
                </span>
            </div>
        </div>
    );
}
