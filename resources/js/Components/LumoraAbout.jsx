import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from '@/Components/RevealOnScroll';
import CarouselArrow from '@/Components/CarouselArrow';

const EASE = [0.22, 1, 0.36, 1];

export default function LumoraAbout() {
    const { t } = useLanguage();
    const reducedMotion = useReducedMotion();

    // `index` is the panel on screen; `direction` only decides which way the
    // next one slides in, so it is kept beside it rather than derived.
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    // Every string here is the firm's own, read from the same entries the
    // À propos page renders so the two can never drift apart. The photographs
    // are the client's, cropped and compressed for the web under /images/about.
    const CARDS = [
        {
            id: 'presentation',
            title: t.about.presTitle,
            image: '/images/about/presentation.jpg',
            // One panel colour per element, so the change registers at a
            // glance. All four are drawn from the brand palette and all four
            // clear 5:1 contrast against the white copy they carry.
            color: '#0B4F71',
            content: t.home.aboutP1,
        },
        {
            id: 'mission',
            title: t.about.missionTitle,
            image: '/images/about/mission.jpg',
            color: '#152F4C',
            content: t.about.missionQuote,
        },
        {
            id: 'vision',
            title: t.about.visionTitle,
            image: '/images/about/vision.jpg',
            color: '#1C6B8C',
            content: t.about.visionQuote,
        },
        {
            id: 'valeurs',
            title: t.about.valeursTitle,
            image: '/images/about/valeurs.jpg',
            color: '#5C4418',
            // Shown as a list rather than a paragraph: each value is a name
            // and its definition.
            items: t.about.valeurs,
        },
    ];

    const count = CARDS.length;
    const card = CARDS[index];

    // Warm the next photograph as soon as the current one is on screen, so the
    // panel never swaps to an empty frame while its image downloads.
    const nextImage = CARDS[(index + 1) % count].image;
    useEffect(() => {
        const preload = new Image();
        preload.src = nextImage;
    }, [nextImage]);

    const go = (next, way) => {
        setDirection(way);
        setIndex((next + count) % count);
    };
    const goPrev = () => go(index - 1, -1);
    const goNext = () => go(index + 1, 1);

    // ── Transition ──
    // The band slides the way the visitor is heading, then hands over to its
    // children: the photograph settles out of a slow zoom while the name, the
    // text and the button rise one after the other. Exits stay short so the
    // swap never feels sluggish. Visitors who ask for reduced motion get the
    // same sequence as a plain cross-fade, with nothing moving.
    const shift = reducedMotion ? 0 : 56;
    const lift = reducedMotion ? 0 : 20;
    const zoom = reducedMotion ? 1 : 1.07;

    const band = {
        enter: (way) => ({ opacity: 0, x: way * shift }),
        center: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: EASE,
                when: 'beforeChildren',
                delayChildren: 0.08,
                staggerChildren: 0.1,
            },
        },
        exit: (way) => ({
            opacity: 0,
            x: way * -shift,
            transition: { duration: 0.24, ease: 'easeIn' },
        }),
    };

    const photo = {
        enter: { opacity: 0, scale: zoom },
        center: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
        exit: { opacity: 0, transition: { duration: 0.25 } },
    };

    const piece = {
        enter: { opacity: 0, y: lift },
        center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };

    // min-h-screen: this is a stacked panel. One shorter than the viewport
    // sticks at the top and leaves the panel underneath showing below it,
    // which breaks the one-panel-at-a-time illusion.
    return (
        <section className="relative overflow-hidden text-white min-h-screen flex items-center shadow-[0_-24px_60px_rgba(0,0,0,0.55)]">
            {/* Full-bleed brand key visual. The section is wide, so the artwork is
                shown close to whole rather than cropped to a sliver. */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/bg-about-omya.jpeg')" }}
            />

            <div className="relative z-10 w-full">

                {/* No visible heading: the carousel opens the section on its
                    own. The title stays for screen readers and search engines,
                    which would otherwise meet an unnamed section. */}
                <h2 className="sr-only">À Propos</h2>

                {/* ── Carousel band: photograph and title on one side, the text
                       on the other, with a chevron at each extreme. Held to a
                       max width so the artwork still frames it. ── */}
                <RevealOnScroll direction="up" delay={0.25} duration={0.9} start="top 90%" className="pt-16 lg:pt-20 px-5 sm:px-8">
                    {/* Solid backdrop: the whole band fades out before the next one
                        fades in, and without it the artwork behind would
                        flash through during the hand-over. */}
                    <div className="relative max-w-[1400px] mx-auto overflow-hidden bg-[#0A2236] shadow-2xl shadow-black/50">
                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.div
                                key={card.id}
                                custom={direction}
                                variants={band}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="grid md:grid-cols-2"
                            >
                                {/* Photograph with the element's name over it */}
                                <div className="relative overflow-hidden min-h-[280px] md:min-h-[480px]">
                                    <motion.img
                                        variants={photo}
                                        src={card.image}
                                        alt=""
                                        aria-hidden="true"
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    {/* Keeps the name legible whatever sits behind it */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-[#0A0A0C]/30 to-transparent" />
                                    <motion.h3
                                        variants={piece}
                                        className="absolute left-5 right-14 bottom-7 md:left-12 md:right-20 md:bottom-10 text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-white"
                                    >
                                        {card.title}
                                    </motion.h3>
                                </div>

                                {/* The firm's own words on a flat brand panel.
                                    Text at the top, the action anchored at the
                                    bottom — the eye lands on the copy first and
                                    leaves on the button. */}
                                <div
                                    style={{ backgroundColor: card.color }}
                                    className="flex flex-col justify-between px-6 py-10 sm:px-10 md:px-16 md:pt-16 md:pb-14 min-h-[280px] md:min-h-[480px]"
                                >
                                    <motion.div variants={piece} className="w-full">
                                        {card.content && (
                                            <p className="text-base md:text-lg lg:text-xl text-white/90 font-normal leading-relaxed">
                                                {card.content}
                                            </p>
                                        )}

                                        {card.items && (
                                            <ul className="space-y-3">
                                                {card.items.map((item) => (
                                                    <li key={item.title} className="text-base md:text-lg lg:text-xl text-white/90 font-normal leading-relaxed">
                                                        <span className="font-bold text-white">{item.title}</span>
                                                        {' : '}
                                                        {item.desc}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>

                                    <motion.div variants={piece} className="mt-10 md:mt-8">
                                        <Link
                                            href={`${route('about')}#${card.id}`}
                                            style={{ '--pill-ink': card.color }}
                                            className="pill-ghost group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/60 bg-transparent text-white text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                        >
                                            <span>EN SAVOIR PLUS</span>
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Chevrons at the two extremes. Below md the band is
                            stacked, so they ride on the photograph instead of
                            the panel edges. */}
                        <CarouselArrow
                            direction="prev"
                            onClick={goPrev}
                            label="Élément précédent"
                            className="absolute left-1 md:left-4 top-[140px] md:top-1/2 -translate-y-1/2"
                        />
                        <CarouselArrow
                            direction="next"
                            onClick={goNext}
                            label="Élément suivant"
                            className="absolute right-1 md:right-4 top-[140px] md:top-1/2 -translate-y-1/2"
                        />
                    </div>
                </RevealOnScroll>

                {/* ── Position markers ── */}
                <div className="flex items-center justify-center gap-2 pt-8 pb-16 lg:pb-20">
                    {CARDS.map((item, i) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => go(i, i > index ? 1 : -1)}
                            aria-label={item.title}
                            aria-current={i === index}
                            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                                i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
