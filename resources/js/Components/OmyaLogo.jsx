import React from 'react';

/**
 * Renders the real OMYA CAPITAL logo file (public/images/omya-capital.jpeg,
 * background-removed) instead of a hand-drawn recreation, so the mark on
 * screen is always identical to the official artwork.
 * `light` is a plain white recolor of the same file, for dark backgrounds
 * (header-over-hero, footer) where the navy original wouldn't read.
 */
export default function OmyaLogo({ variant = 'dark', className = '', height = 40, fluid = false }) {
    const src = variant === 'light' ? '/images/omya-capital-light.png' : '/images/omya-capital-dark.png';

    // `fluid` drops the pinned pixel height so the caller can size the mark
    // relative to its container — needed wherever the panel around it shrinks
    // on small screens. The artwork itself is untouched in both modes.
    if (fluid) {
        return <img src={src} alt="OMYA CAPITAL" className={`select-none ${className}`} />;
    }

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
