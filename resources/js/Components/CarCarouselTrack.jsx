import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/Context/LanguageContext';

/**
 * CarCarouselTrack:
 * Animated circuit track where cards continuously drive and swap positions,
 * simulating a fleet of vehicles on a road. Spinning wheels, road markings,
 * and smooth position-swapping Framer Motion transitions.
 */
export default function CarCarouselTrack({ items = [], renderItem, autoPlay = true, interval = 3400, showWheels = true }) {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!autoPlay || isHovered || items.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, interval);
        return () => clearInterval(timer);
    }, [autoPlay, isHovered, items.length, interval]);

    if (!items || items.length === 0) return null;

    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);

    // Prepare 3 visible items wrapped around the array
    const visibleCount = Math.min(items.length, 3);
    const visibleItems = [];
    for (let i = 0; i < visibleCount; i++) {
        const itemIdx = (currentIndex + i) % items.length;
        visibleItems.push({
            data: items[itemIdx],
            key: String(items[itemIdx].id ?? itemIdx),
            originalIndex: itemIdx,
        });
    }

    return (
        <div
            className="relative w-full max-w-6xl mx-auto py-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ── Cards container with position-swapping animated track ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <AnimatePresence mode="popLayout">
                    {visibleItems.map((item) => (
                        <motion.div
                            key={item.key}
                            layout
                            initial={{ opacity: 0, x: 120, scale: 0.9, rotateY: 12 }}
                            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, x: -120, scale: 0.9, rotateY: -12 }}
                            transition={{
                                layout: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.4 },
                                x: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                                rotateY: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                            }}
                            style={{ perspective: 800 }}
                            className="relative group flex flex-col"
                        >
                            {/* Card Content */}
                            <div className="flex-1">
                                {renderItem(item.data, item.originalIndex)}
                            </div>

                            {/* ── Vehicle Chassis & Spinning Wheels under each card ── */}
                            {showWheels && (
                                <div className="relative mt-2 pb-5">
                                    {/* Chassis body bar */}
                                    <div className="absolute left-6 right-6 bottom-3.5 h-1 bg-gradient-to-r from-[#0B1F33]/30 via-[#0B4F71] to-[#0B1F33]/30 rounded-full shadow-sm shadow-[#0B4F71]/40" />

                                    {/* Left Wheel */}
                                    <div className="absolute left-4 bottom-0.5 flex items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                                            className="w-7 h-7 rounded-full border-[2.5px] border-[#0B4F71] bg-[#0B1F33] flex items-center justify-center shadow-lg shadow-[#0B4F71]/50"
                                        >
                                            {/* Wheel spokes */}
                                            <div className="w-2 h-2 rounded-full bg-white/80 shadow-sm" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-px h-full bg-white/30 absolute" />
                                                <div className="h-px w-full bg-white/30 absolute" />
                                            </div>
                                            <div className="absolute inset-[3px] border border-dashed border-white/40 rounded-full" />
                                        </motion.div>
                                        {/* Ground shadow */}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-black/20 blur-sm" />
                                    </div>

                                    {/* Right Wheel */}
                                    <div className="absolute right-4 bottom-0.5 flex items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                                            className="w-7 h-7 rounded-full border-[2.5px] border-[#0B4F71] bg-[#0B1F33] flex items-center justify-center shadow-lg shadow-[#0B4F71]/50"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-white/80 shadow-sm" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-px h-full bg-white/30 absolute" />
                                                <div className="h-px w-full bg-white/30 absolute" />
                                            </div>
                                            <div className="absolute inset-[3px] border border-dashed border-white/40 rounded-full" />
                                        </motion.div>
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-black/20 blur-sm" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* ── Road Track Line ── */}
            {showWheels && (
                <div className="relative mt-1 mb-4 mx-4">
                    {/* Main road surface */}
                    <div className="h-2 bg-gradient-to-r from-transparent via-[#0B2A45]/60 to-transparent rounded-full shadow-inner" />
                    {/* Dashed center line — animated scrolling */}
                    <div className="absolute inset-0 flex items-center overflow-hidden">
                        <motion.div
                            animate={{ x: ['-50%', '0%'] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="flex gap-6 shrink-0"
                            style={{ width: '200%' }}
                        >
                            {Array.from({ length: 24 }).map((_, i) => (
                                <div key={i} className="w-6 h-px bg-white/50 shrink-0" />
                            ))}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* ── Controls & Indicators ── */}
            <div className="flex items-center justify-between mt-6 px-2">
                <button
                    onClick={handlePrev}
                    aria-label={t.common.prev}
                    className="w-11 h-11 rounded-full bg-white border border-[#0B4F71]/20 text-[#0B4F71] flex items-center justify-center shadow-md hover:bg-[#0B4F71] hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Pagination dots */}
                <div className="flex items-center gap-2">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-2 rounded-full transition-all duration-500 ${
                                i === currentIndex
                                    ? 'w-8 bg-[#0B4F71]'
                                    : 'w-2 bg-[#0B4F71]/25 hover:bg-[#0B4F71]/50'
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    aria-label={t.common.next}
                    className="w-11 h-11 rounded-full bg-white border border-[#0B4F71]/20 text-[#0B4F71] flex items-center justify-center shadow-md hover:bg-[#0B4F71] hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
