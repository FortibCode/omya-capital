import React, { useRef, useEffect } from 'react';
import { gsap } from '@/Utils/gsapSetup';

/**
 * Two cards that arrive separately and close into one horizontal block.
 *
 * At rest the pair is a plain two-column grid with no gap, so the finished
 * state is exactly what it would be without any animation — the motion only
 * decides how the two halves get there. Both start above their slot and at
 * different heights, so they are apart vertically; each is also pushed out
 * past its own side, so a horizontal gap stands open between them. Scrolling
 * closes both gaps at once: the media card comes down and over to the left,
 * the body card down and over to the right, and they meet flush.
 *
 * `reverse` mirrors the whole figure: the media card sits on the right and the
 * two travel the other way.
 *
 * Travelling outward means the cards briefly sit past the page's own width, so
 * whatever wraps them has to clip horizontally (overflow-x) or the page gains
 * a sideways scrollbar.
 *
 * The movement is tied to the scrollbar (scrub) rather than played on entry —
 * scrolling back up rewinds it. A block that is already on screen when the
 * page loads has no scroll left to drive it, so it plays once on a timer
 * instead of sitting there half-assembled.
 */
export default function ConvergingSplit({
    id,
    media,
    body,
    reverse = false,
    className = '',
    mediaClassName = '',
    bodyClassName = '',
    bodyStyle,
}) {
    const rootRef = useRef(null);
    const mediaRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        const mediaEl = mediaRef.current;
        const bodyEl = bodyRef.current;
        if (!root || !mediaEl || !bodyEl) return;

        const mm = gsap.matchMedia();

        mm.add(
            {
                wide: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
                narrow: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
                still: '(prefers-reduced-motion: reduce)',
            },
            (context) => {
                const { wide, still } = context.conditions;

                // Nothing moves for visitors who ask for that; the block is
                // simply there.
                if (still) {
                    gsap.set([mediaEl, bodyEl], { clearProps: 'all' });
                    return;
                }

                // Below md the grid is a single column, so there is no left
                // and right to converge from — only the vertical gap closes.
                const spread = wide ? 13 : 0;        // % of its own width, outward
                const mediaDrop = wide ? -120 : -70;
                const bodyDrop = wide ? -215 : -140; // further up: the two start apart
                const way = reverse ? -1 : 1;

                const travel = () => ({ y: 0, xPercent: 0, scale: 1, duration: 1, ease: 'power2.out' });

                // Opacity resolves in the first third of the travel, so what
                // glides into place is a solid card rather than a ghost of one
                // washing over the artwork behind it.
                const fade = () => ({ opacity: 1, duration: 0.3, ease: 'power2.out' });

                // Already on screen with no scroll left to drive it: play once.
                const onScreenAtLoad =
                    root.getBoundingClientRect().top < window.innerHeight * 0.45;

                const timeline = gsap.timeline({
                    scrollTrigger: onScreenAtLoad
                        ? undefined
                        : {
                              trigger: root,
                              start: 'top 92%',
                              end: 'top 38%',
                              // Lags a little behind the wheel, which is what
                              // keeps the two cards gliding rather than
                              // tracking the scrollbar step for step.
                              scrub: 1.1,
                          },
                });

                // The two cards start pushed outward, so the gap between them
                // closes rather than the pair crossing over one another: the
                // media card takes the minus sign and travels toward the left
                // slot, and `way` turns the whole figure round when it sits on
                // the right instead.
                //
                // Every tween gets its own vars object: `fromTo` hangs the
                // start values off the object it is handed, so two tweens
                // sharing one would both begin from whichever came last.
                timeline
                    .fromTo(mediaEl, { y: mediaDrop, xPercent: way * -spread, scale: 0.96 }, travel(), 0)
                    .fromTo(mediaEl, { opacity: 0 }, fade(), 0)
                    // The body card leaves fractionally later, so the pair
                    // reads as two arrivals rather than one sliding panel.
                    .fromTo(bodyEl, { y: bodyDrop, xPercent: way * spread, scale: 0.96 }, travel(), 0.14)
                    .fromTo(bodyEl, { opacity: 0 }, fade(), 0.14);

                return () => timeline.kill();
            }
        );

        return () => mm.revert();
    }, [reverse]);

    return (
        <section ref={rootRef} id={id} className={`relative grid md:grid-cols-2 ${className}`}>
            <div
                ref={mediaRef}
                className={`relative ${reverse ? 'md:order-2' : ''} ${mediaClassName}`}
            >
                {media}
            </div>

            <div
                ref={bodyRef}
                style={bodyStyle}
                className={`relative ${reverse ? 'md:order-1' : ''} ${bodyClassName}`}
            >
                {body}
            </div>
        </section>
    );
}
