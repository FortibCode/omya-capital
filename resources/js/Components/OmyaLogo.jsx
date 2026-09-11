import React from 'react';

/**
 * Renders the real OMYA CAPITAL logo file (public/images/omya-capital.jpeg,
 * background-removed) instead of a hand-drawn recreation, so the mark on
 * screen is always identical to the official artwork.
 * `light` is a plain white recolor of the same file, for dark backgrounds
 * (header-over-hero, footer) where the navy original wouldn't read.
 */
export default function OmyaLogo({ variant = 'dark', className = '', height = 40 }) {
    const src = variant === 'light' ? '/images/omya-capital-light.png' : '/images/omya-capital-dark.png';

    return (
        <img
            src={src}
            alt="OMYA CAPITAL"
            height={height}
            style={{ height, width: 'auto' }}
            className={`select-none ${className}`}
        />
    );
}
