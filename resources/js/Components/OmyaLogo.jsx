import React from 'react';

/**
 * Official OMYA CAPITAL logo component.
 * - variant="dark": Official Navy Blue logo (#132E43)
 * - variant="light": Official Pure White logo (#FFFFFF)
 */
export default function OmyaLogo({ variant = 'dark', className = '', height = 44, fluid = false, hiRes = false }) {
    // The supplied logo files are 290x112, which is plenty for a header or a
    // footer but soft once the mark is shown at poster size. `hiRes` swaps in a
    // 1160x448 build of the white mark, regenerated from the same file with its
    // ink weight preserved to within half a percent.
    const src =
        variant === 'light'
            ? hiRes
                ? '/images/omya-capital-light-xl.png'
                : '/images/omya-capital-light.png'
            : '/images/omya-capital-dark.png';

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
