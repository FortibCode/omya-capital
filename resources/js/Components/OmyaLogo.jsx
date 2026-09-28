import React from 'react';

/**
 * Official OMYA CAPITAL logo component.
 * - variant="dark": Official Navy Blue logo (#132E43)
 * - variant="light": Official Pure White logo (#FFFFFF)
 */
export default function OmyaLogo({ variant = 'dark', className = '', height = 44, fluid = false }) {
    const src = variant === 'light' ? '/images/omya-capital-light.png' : '/images/omya-capital-dark.png';

    if (fluid) {
        return (
            <img
                src={src}
                alt="OMYA CAPITAL"
                className={`select-none object-contain ${className}`}
            />
        );
    }

    return (
        <img
            src={src}
            alt="OMYA CAPITAL"
            height={height}
            style={{ height, width: 'auto' }}
            className={`select-none object-contain ${className}`}
        />
    );
}
