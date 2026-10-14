import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import RevealOnScroll from '@/Components/RevealOnScroll';
import CarouselArrow from '@/Components/CarouselArrow';
import { useLanguage } from '@/Context/LanguageContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * The film behind the page. Set BACKGROUND_VIDEO to null to fall back to the
 * still on its own; nothing else needs changing, because the tint, the
 * contrast and the layout are the same either way.
 *
 * The file is a re-encode of the supplied business_partnership.mp4 with the
 * sound track dropped — it can never be heard, since autoplay only works
 * muted — at 906KB instead of 2.7MB. The still is its own first second, so
 * there is no jump when the film takes over, and it is what shows while the
 * film loads, when autoplay is refused, and when the visitor has asked for
 * less motion.
 */
const BACKGROUND_VIDEO = '/videos/partners-bg.mp4';
const BACKGROUND_STILL = '/images/partners-bg-poster.jpg';

/** How long each partner holds the frame before the next one slides in. */
const AUTO_ADVANCE_MS = 4500;
const EASE = [0.22, 1, 0.36, 1];

export default function Partners({ partners = [] }) {
    const { t } = useLanguage();
    const reducedMotion = useReducedMotion();
    const playFilm = BACKGROUND_VIDEO && !reducedMotion;

    const count = partners.length;
    // `index` is the mark on screen; `direction` only decides which way the
    // next one slides in, so it is kept beside it rather than derived.
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [held, setHeld] = useState(false);

    const go = (next, way) => {
        setDirection(way);
        setIndex((next + count) % count);
    };

    // Advance on its own, but not while the visitor is pointing at it or
    // tabbing through it — taking the control away mid-reach is maddening —
    // and never for someone who has asked for less motion.
    useEffect(() => {
        if (reducedMotion || held || count < 2) return;
        const timer = setInterval(() => {
            setDirection(1);
            setIndex((i) => (i + 1) % count);
        }, AUTO_ADVANCE_MS);
        return () => clearInterval(timer);
    }, [reducedMotion, held, count]);

    // The plate slides the way the visitor is heading and the mark settles out
    // of a slow rise behind it. Exits stay short so the swap never drags.
    const shift = reducedMotion ? 0 : 64;
    const plate = {
        enter: (way) => ({ opacity: 0, x: way * shift }),
        center: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.55, ease: EASE, when: 'beforeChildren', delayChildren: 0.08 },
        },
        exit: (way) => ({ opacity: 0, x: way * -shift, transition: { duration: 0.26, ease: 'easeIn' } }),
    };
    const mark = {
        enter: { opacity: 0, y: reducedMotion ? 0 : 14, scale: reducedMotion ? 1 : 0.97 },
        center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };

    const current = partners[index];

    // Built once: the plate renders it inside a link or inside a plain box,
    // and writing it twice would be two things to keep in step.
    const mark_img = current?.logo_path ? (
        <motion.img
            variants={mark}
            src={`/storage/${current.logo_path}`}
            // The only place the name is left: nothing prints it, so a screen
            // reader would meet an unnamed image otherwise.
            alt={current.name}
            className="max-h-[100px] sm:max-h-[135px] max-w-[66%] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
    ) : null;

    return (
        <>
            <Head title={t.nav.partners} />

            <div className="relative text-white">
                {/* Fixed rather than tiled: the page is taller than one screen,
                    so a `cover` background on the element itself would blow the
                    artwork up several times its size. */}
                {playFilm ? (
                    <video
                        aria-hidden="true"
                        className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
                        src={BACKGROUND_VIDEO}
                        poster={BACKGROUND_STILL}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                        style={{ backgroundImage: `url('${BACKGROUND_STILL}')` }}
                    />
                )}

                {/* The brightest pixel in the film is pure white — the sun in
                    the windows. This brings it to rgb(67,76,85), so the type
                    clears 8.7:1 at every moment of every frame. */}
                <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#0A0A0C]/75 pointer-events-none" />

                {/* The header is fixed and there is no hero to sit under it, so
                    the title clears it by hand: the bar ends at 114px on phones
                    and 104px from sm up. */}
                <div className="relative z-10 max-w-[1150px] mx-auto px-5 sm:px-8 pt-[150px] lg:pt-[176px] pb-20 lg:pb-28">

                    <RevealOnScroll direction="down" delay={0.1} duration={0.9} className="mb-12 lg:mb-16 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                            {t.partners.heroTitle}
                        </h1>
                    </RevealOnScroll>

                    {/* ── The marks, one at a time ── */}
                    {/* The plate is #F7F7F7 rather than white because the OMYA
                        INVEST file is not transparent — it carries that exact
                        shade, which on white drew a grey box around the mark.
                        All three marks are dark on light and would be
                        near-invisible on the film behind. */}
                    {count === 0 ? (
                        <p className="text-center text-white/60 text-base">—</p>
                    ) : (
                        <RevealOnScroll direction="up" delay={0.2} duration={0.9}>
                            <div
                                className="relative flex items-center justify-center gap-1 sm:gap-8 lg:gap-14"
                                onMouseEnter={() => setHeld(true)}
                                onMouseLeave={() => setHeld(false)}
                                onFocusCapture={() => setHeld(true)}
                                onBlurCapture={() => setHeld(false)}
                            >
                                {/* Flanking the plate needs width to spare.
                                    On a phone they would sit 4px off its edge,
                                    so below sm they move down beside the dots
                                    and the plate takes the full column. */}
                                <CarouselArrow
                                    direction="prev"
                                    onClick={() => go(index - 1, -1)}
                                    label="Partenaire précédent"
                                    className="hidden sm:block shrink-0"
                                />

                                {/* Fixed height, so the arrows and the plate do
                                    not jump as marks of different shapes come
                                    and go. */}
                                <div className="relative w-full sm:flex-1 max-w-[430px] h-[270px] sm:h-[330px]">
                                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                                        <motion.div
                                            key={current.id ?? current.name ?? index}
                                            custom={direction}
                                            variants={plate}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="absolute inset-0 bg-[#F7F7F7] shadow-2xl shadow-black/50"
                                        >
                                            {/* The whole plate is the target
                                                when the record carries an
                                                address, and a plain box when it
                                                does not — so a partner without
                                                a site never offers a click that
                                                leads nowhere. */}
                                            {current.website_url ? (
                                                <a
                                                    href={current.website_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${current.name} — ${t.partners.visitLabel}`}
                                                    className="group absolute inset-0 flex items-center justify-center px-8 py-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B4F71]"
                                                >
                                                    {mark_img}
                                                </a>
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center px-8 py-10">
                                                    {mark_img}
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <CarouselArrow
                                    direction="next"
                                    onClick={() => go(index + 1, 1)}
                                    label="Partenaire suivant"
                                    className="hidden sm:block shrink-0"
                                />
                            </div>

                            {/* ── Position markers ── */}
                            {count > 1 && (
                                <div className="flex items-center justify-center gap-4 sm:gap-2 pt-7 sm:pt-8">
                                    <CarouselArrow
                                        direction="prev"
                                        onClick={() => go(index - 1, -1)}
                                        label="Partenaire précédent"
                                        className="sm:hidden"
                                    />
                                    {partners.map((partner, i) => (
                                        <button
                                            key={partner.id ?? partner.name ?? i}
                                            type="button"
                                            onClick={() => go(i, i > index ? 1 : -1)}
                                            aria-label={partner.name}
                                            aria-current={i === index}
                                            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                                                i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                                            }`}
                                        />
                                    ))}
                                    <CarouselArrow
                                        direction="next"
                                        onClick={() => go(index + 1, 1)}
                                        label="Partenaire suivant"
                                        className="sm:hidden"
                                    />
                                </div>
                            )}
                        </RevealOnScroll>
                    )}

                    {/* ── CTA ── */}
                    {/* On its own solid panel, like the About and Services pages:
                        the film behind is busy and moving. */}
                    <RevealOnScroll
                        direction="up"
                        delay={0.1}
                        duration={0.9}
                        start="top 95%"
                        className="mt-16 lg:mt-24 text-center bg-[#0B1F33] shadow-2xl shadow-black/50 px-6 py-14 sm:py-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                            {t.partners.ctaTitle}
                        </h2>
                        <Link
                            href={route('contact')}
                            style={{ '--pill-ink': '#0B1F33' }}
                            className="pill-ghost group mt-8 inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/60 bg-transparent text-white text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            <span>{t.partners.ctaBtn}</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </RevealOnScroll>

                </div>
            </div>
        </>
    );
}

Partners.layout = (page) => <PublicLayout>{page}</PublicLayout>;
