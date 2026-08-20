import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    // Very light parallax drift on the background image as the hero scrolls out of view
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <section
            ref={sectionRef}
            aria-label="OMYA Capital"
            className="relative overflow-hidden text-white min-h-screen flex items-center justify-center bg-[#0B1F33]"
        >
            {/* Background image — slow one-time zoom (Ken Burns) + light scroll parallax */}
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
                <div
                    className="absolute inset-0 bg-cover bg-center animate-kenburns"
                    style={{ backgroundImage: "url('/images/business_meeting.webp')" }}
                />
            </motion.div>

            {/* Institutional navy overlays for legibility and tone */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33]/80 via-[#0B1F33]/55 to-[#0B1F33]/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F33]/60 via-transparent to-[#0B1F33]/50" />

            {/* Content */}
            <motion.div
                style={{ opacity: contentOpacity }}
                className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 w-full text-center py-32"
            >
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                    className="flex items-center justify-center gap-3 mb-8"
                >
                    <span className="w-10 h-px bg-sky-300/60" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-sky-200">OMYA Capital</span>
                    <span className="w-10 h-px bg-sky-300/60" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.55, ease: EASE }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.35] tracking-tight text-white [text-wrap:balance]"
                >
                    En tant que pionnier de la croissance du secteur privé, nous façonnons le paysage économique de la sous-région en investissant notre capital, notre expérience et notre expertise là où ils ont le plus d&rsquo;impact.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
                    className="mt-7 text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#E7C873]"
                >
                    Redéfinir l&rsquo;investissement en Afrique Centrale
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
                    className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href={route('services.index')}
                        prefetch
                        className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-sky-50 text-[#0B1F33] font-extrabold text-sm py-3.5 px-8 rounded-xl shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <span>Découvrir nos services</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href={route('contact')}
                        prefetch
                        className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/15 text-white border border-white/40 hover:border-white/70 font-extrabold text-sm py-3.5 px-8 rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <span>Prendre contact</span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
