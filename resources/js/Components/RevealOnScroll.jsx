import React from 'react';
import { motion } from 'framer-motion';

const DIRECTIONS = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { y: 0, x: 28 },
    right: { y: 0, x: -28 },
    none: { y: 0, x: 0 },
};

const EASE = [0.16, 1, 0.3, 1];

/**
 * Editorial fade + slide-up reveal, triggered once when the element enters the viewport.
 * Wraps framer-motion so every section shares the same premium, unhurried timing.
 */
export default function RevealOnScroll({
    children,
    as = 'div',
    direction = 'up',
    delay = 0,
    duration = 0.9,
    distance,
    once = true,
    amount = 0.25,
    className = '',
    ...rest
}) {
    const Component = motion[as] || motion.div;
    const offset = DIRECTIONS[direction] || DIRECTIONS.up;
    const initial = {
        opacity: 0,
        y: distance !== undefined && direction !== 'left' && direction !== 'right' ? distance : offset.y,
        x: distance !== undefined && (direction === 'left' || direction === 'right') ? distance * (direction === 'right' ? -1 : 1) : offset.x,
    };

    return (
        <Component
            initial={initial}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once, amount }}
            transition={{ duration, delay, ease: EASE }}
            className={className}
            {...rest}
        >
            {children}
        </Component>
    );
}

/**
 * Applies a staggered delay to direct children via RevealOnScroll —
 * pass `index` to offset each item in a list/grid.
 */
export function staggerDelay(index, base = 0.08, start = 0) {
    return start + index * base;
}
