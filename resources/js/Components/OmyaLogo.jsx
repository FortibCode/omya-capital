import React from 'react';

export default function OmyaLogo({ variant = 'dark', className = '', height = 40 }) {
    const isLight = variant === 'light';
    const mainColor = isLight ? '#FFFFFF' : '#0F2C59';
    const subColor = isLight ? '#7DD3FC' : '#0284C7';

    return (
        <div className={`inline-flex flex-col items-center select-none ${className}`}>
            <svg
                height={height}
                viewBox="0 0 280 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-auto max-h-[50px]"
            >
                {/* O: Split parenthesis circle */}
                <path
                    d="M 28 8 A 20 20 0 0 1 28 42 M 16 8 A 20 20 0 0 0 16 42"
                    stroke={mainColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* M: Geometric M */}
                <path
                    d="M 52 42 V 8 L 68 28 L 84 8 V 42"
                    stroke={mainColor}
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Y: Geometric Y */}
                <path
                    d="M 100 8 L 114 24 V 42 M 128 8 L 114 24"
                    stroke={mainColor}
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* A: Open Chevron A (no horizontal crossbar) */}
                <path
                    d="M 144 42 L 160 8 L 176 42"
                    stroke={mainColor}
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Subtitle: C A P I T A L */}
                <text
                    x="114"
                    y="60"
                    textAnchor="middle"
                    fill={subColor}
                    fontSize="13"
                    fontWeight="600"
                    letterSpacing="8"
                    fontFamily="Inter, system-ui, sans-serif"
                >
                    CAPITAL
                </text>
            </svg>
        </div>
    );
}
