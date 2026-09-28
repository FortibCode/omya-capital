import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';

export default function BaselineHero({ onMenuOpen, onOpenModal }) {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "En tant que pionnier de la croissance du secteur privé, nous façonnons le paysage économique de la sous-région en investissant notre capital, expérience et expertise là où ils ont le plus d’impact.",
            signature: "Redéfinir l’investissement en Afrique Centrale",
            bgOverlay: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(11,31,51,0.5) 100%)',
        },
        {
            title: "Nous structurons les financements stratégiques et accompagnons les leaders pour accélérer la création de valeur durable.",
            signature: "Finance d’Entreprise & Conseil Stratégique",
            bgOverlay: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(11,31,51,0.5) 100%)',
        },
        {
            title: "Un partenaire engagé aux côtés des entreprises et institutions pour dynamiser l’économie régionale.",
            signature: "Levée de Fonds, Fusions & Acquisitions",
            bgOverlay: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(11,31,51,0.5) 100%)',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const slide = slides[currentSlide];

    return (
        <section aria-label="Baseline Hero" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-white bg-black">
            {/* ── Background Video & Overlay ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center"
                >
                    <source src="/videos/finance_coins.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
                <div
                    className="absolute inset-0 transition-all duration-1000 z-10 pointer-events-none"
                    style={{ background: slide.bgOverlay }}
                />
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
