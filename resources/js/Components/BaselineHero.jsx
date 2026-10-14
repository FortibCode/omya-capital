import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';
import useInView from '@/Hooks/useInView';

// Scrim layers over the footage. The three clips were shot with different
// colour casts (bright blue, navy/gold, black/gold); a single navy tint pulls
// them to the brand palette so the hero reads as one piece rather than three
// stock clips. The side gradient keeps the headline legible whatever frame is
// underneath, and both are plain gradients — no per-frame filter cost.
const SCRIM_TINT = 'linear-gradient(180deg, rgba(11,31,51,0.58) 0%, rgba(8,24,40,0.72) 100%)';
const SCRIM_TEXT =
    'linear-gradient(100deg, rgba(5,16,28,0.92) 0%, rgba(5,16,28,0.74) 38%, rgba(5,16,28,0.34) 68%, rgba(5,16,28,0.18) 100%)';
const SCRIM_FOOT = 'linear-gradient(0deg, rgba(5,16,28,0.75) 0%, rgba(5,16,28,0) 28%)';

const SLIDES = [
    {
        video: '/videos/finance_coins.mp4',
        title: "En tant que pionnier de la croissance du secteur privé, nous façonnons le paysage économique de la sous-région en investissant notre capital, expérience et expertise là où ils ont le plus d’impact.",
        signature: "Redéfinir l’investissement en Afrique Centrale",
    },
    {
        video: '/videos/video-capital.mp4',
        title: "Nous structurons les financements stratégiques et accompagnons les leaders pour accélérer la création de valeur durable.",
        signature: "Finance d’Entreprise & Conseil Stratégique",
    },
    {
        video: '/videos/video-capital-1.mp4',
        title: "Un partenaire engagé aux côtés des entreprises et institutions pour dynamiser l’économie régionale.",
        signature: "Levée de Fonds, Fusions & Acquisitions",
    },
];

export default function BaselineHero({ onMenuOpen, onOpenModal }) {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const sectionRef = useRef(null);
    const videoRefs = useRef([]);
    const inView = useInView(sectionRef);

    // The three clips weigh ~8 MB together, so they are fetched one at a time
    // rather than all at once on first paint: the opening clip loads with the
    // page, each following one only shortly before it is needed.
    const [loaded, setLoaded] = useState(() => new Set([0]));

    // Visitors who ask their system for reduced motion get the still frame
    // instead of looping footage — and are spared the download entirely.
    const [reducedMotion, setReducedMotion] = useState(false);
    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReducedMotion(query.matches);
        sync();
        query.addEventListener('change', sync);
        return () => query.removeEventListener('change', sync);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded((current) => (current.has(1) ? current : new Set(current).add(1)));
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const next = (currentSlide + 1) % SLIDES.length;
        setLoaded((current) => (current.has(next) ? current : new Set(current).add(next)));
    }, [currentSlide]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    // The hero is a sticky stack panel: it stays inside the viewport while the
    // next sections climb over it, so the intersection observer alone would keep
    // reporting it visible and the clip would decode behind an opaque panel.
    // Treat it as hidden once a full screen has been scrolled past.
    const [covered, setCovered] = useState(false);
    useEffect(() => {
        const onScroll = () => setCovered(window.scrollY > window.innerHeight * 0.9);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Only the visible clip decodes frames. The others stay paused, and every
    // clip stops once the hero is scrolled away or covered.
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;
            if (index === currentSlide && inView && !covered) {
                const started = video.play();
                if (started?.catch) started.catch(() => {});
            } else {
                video.pause();
            }
        });
    }, [currentSlide, inView, covered, loaded]);

    const slides = SLIDES;
    const slide = slides[currentSlide];

    return (
        <section ref={sectionRef} aria-label="Baseline Hero" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-white bg-black">
            {/* ── Background Videos & Overlay ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {reducedMotion && (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url(/images/hero-poster.jpg)' }}
                    />
                )}
                {!reducedMotion && slides.map((item, index) => (
                    <video
                        key={item.video}
                        ref={(el) => {
                            videoRefs.current[index] = el;
                        }}
                        src={loaded.has(index) ? item.video : undefined}
                        poster={index === 0 ? '/images/hero-poster.jpg' : undefined}
                        loop
                        muted
                        playsInline
                        preload={index === 0 ? 'auto' : 'none'}
                        aria-hidden="true"
                        tabIndex={-1}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1200ms] ease-in-out"
                        style={{ opacity: index === currentSlide ? 1 : 0 }}
                    />
                ))}
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: SCRIM_TINT }} />
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: SCRIM_TEXT }} />
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: SCRIM_FOOT }} />
            </div>

            {/* ── CENTER / MAIN HERO BODY ── */}
            <div className="relative z-10 max-w-[1700px] mx-auto w-full px-6 sm:px-12 lg:px-16 pt-32 sm:pt-40 pb-12 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl"
                    >
                        <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.75] sm:leading-[1.8] tracking-normal font-poppins select-none">
                            {slide.title}
                        </h1>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── HERO BOTTOM BAR (Signature) ── */}
            <div className="relative z-20 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 pb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentSlide}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.5 }}
                        className="text-xs sm:text-base font-semibold tracking-widest text-white/95 uppercase font-poppins"
                    >
                        {slide.signature}
                    </motion.p>
                </AnimatePresence>
            </div>
        </section>
    );
}
