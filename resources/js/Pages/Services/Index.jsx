import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import RevealOnScroll from '@/Components/RevealOnScroll';
import { useLanguage, translateService } from '@/Context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function Index({ services = [] }) {
    const { t, lang } = useLanguage();

    // Nothing about the services is written here. Which ones exist and in what
    // order comes from the `services` table; their wording comes from the
    // shared translations, keyed by slug — the same two sources the home page
    // section and the footer read, so the three can never drift apart.
    const items = services.map((service) => translateService(service, lang));

    return (
        <>
            <Head title={t.nav.services} />

            <div className="relative text-white">
                {/* The same key visual the home page section carries. Fixed
                    rather than tiled: this page is several screens tall, and a
                    `cover` background on the element itself would blow the
                    artwork up several times its size. Pinned to the viewport it
                    stays whole while the content scrolls over it. */}
                <div
                    aria-hidden="true"
                    className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: "url('/images/bg-services-omya.jpeg')" }}
                />

                {/* The artwork carries the OMYA CAPITAL mark across its middle
                    in near-white, and white type landed straight on it: eight of
                    the nine blocks measured under 2:1. A flat 70% tint fixes
                    that at 7:1 while leaving the artwork plainly visible —
                    darkening it enough to read over is the point, hiding it is
                    not. */}
                <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#0A0A0C]/70 pointer-events-none" />

                <div className="relative z-10 max-w-[1150px] mx-auto px-5 sm:px-8 pb-14 lg:pb-20">

                    {/* ── Heading and the services themselves, laid out exactly as
                           on the home page: the name on the left, what it covers
                           on the right, straight on the artwork. The header is
                           fixed and there is no hero to sit under it, so the
                           padding clears it by hand — it ends at 114px on phones
                           and 104px from sm up. ── */}
                    <section className="min-h-screen flex flex-col justify-center pt-[114px] sm:pt-[104px]">
                        <RevealOnScroll direction="down" delay={0.1} duration={0.9} className="mb-10 lg:mb-14 text-center">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                                {t.services.heroTitle}
                            </h1>
                        </RevealOnScroll>

                        <div>
                            {items.map((service, idx) => (
                                <RevealOnScroll
                                    key={service.slug ?? service.id ?? idx}
                                    direction="up"
                                    delay={0.15 + idx * 0.1}
                                    duration={0.9}
                                    start="top 95%"
                                >
                                    {/* The slug is what the footer and the home
                                        page link to, so each row is an anchor. */}
                                    <div
                                        id={service.slug}
                                        className="scroll-mt-[150px] lg:scroll-mt-[200px] grid md:grid-cols-12 gap-3 md:gap-10 py-7 md:py-9"
                                    >
                                        <div className="md:col-span-5">
                                            <h2 className="text-xl sm:text-2xl font-bold leading-snug text-white">
                                                {service.title}
                                            </h2>
                                        </div>

                                        {/* Columns 7 to 12, so the block ends flush
                                            with the right edge instead of sitting
                                            mid-width. */}
                                        <div className="md:col-span-6 md:col-start-7">
                                            <p className="text-base md:text-lg text-white/85 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </section>

                    {/* ── CTA ── */}
                    {/* On its own solid panel, like the About page: the artwork
                        behind carries the wordmark and white text landed on it. */}
                    <RevealOnScroll
                        direction="up"
                        delay={0.1}
                        duration={0.9}
                        start="top 95%"
                        className="mt-16 lg:mt-24 text-center bg-[#0B1F33] shadow-2xl shadow-black/50 px-6 py-14 sm:py-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                            {t.services.ctaTitle}
                        </h2>
                        <Link
                            href={route('contact')}
                            style={{ '--pill-ink': '#0B1F33' }}
                            className="pill-ghost group mt-8 inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/60 bg-transparent text-white text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            <span>{t.services.ctaBtn}</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </RevealOnScroll>

                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
