import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Bare chevron sitting at one edge of a carousel.
 *
 * Shared by the home page's À propos band and the partners page, so the two
 * cannot drift apart: a fix to the hover, the focus ring or the nudge lands on
 * both.
 */
export default function CarouselArrow({ direction, onClick, label, className = '' }) {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
    const nudge = direction === 'prev' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1';

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={`group z-20 p-2 text-white/75 hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${className}`}
        >
            <Icon className={`w-7 h-7 md:w-10 md:h-10 transition-transform duration-300 ${nudge}`} strokeWidth={1.5} />
        </button>
    );
}
