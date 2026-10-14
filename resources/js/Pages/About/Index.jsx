import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import RevealOnScroll from '@/Components/RevealOnScroll';
import OmyaLogo from '@/Components/OmyaLogo';
import ConvergingSplit from '@/Components/ConvergingSplit';
import { useLanguage } from '@/Context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function Index() {
    const { t } = useLanguage();

    // The same four entries the home page carousel shows, in the same order,
    // with the same colours and the same photographs — the two pages tell one
    // story. Every string is the firm's own, read from the shared translations.
    const SECTIONS = [
        {
            id: 'presentation',
            title: t.about.presTitle,
            image: '/images/about/presentation.jpg',
            color: '#0B4F71',
            paragraphs: [t.home.aboutP1, t.home.aboutP2],
        },
        {
            id: 'mission',
            title: t.about.missionTitle,
            image: '/images/about/mission.jpg',
            color: '#152F4C',
            paragraphs: [t.about.missionQuote],
        },
        {
            id: 'vision',
            title: t.about.visionTitle,
            image: '/images/about/vision.jpg',
            color: '#1C6B8C',
            paragraphs: [t.about.visionQuote],
        },
        {
            id: 'valeurs',
            title: t.about.valeursTitle,
            image: '/images/about/valeurs.jpg',
            color: '#5C4418',
            items: t.about.valeurs,
        },
    ];

    return (
        <>
            <Head title={t.nav.about} />

            {/* The header is fixed and this page has no hero to sit under it,
                so the opening statement clears it by hand. The bar ends at
                114px on phones and 104px from sm up; the rest is deliberate
                air above the statement. */}
            <div className="relative text-white">
                {/* Fixed rather than tiled: the page is several screens tall,
                    so a `cover` background on the element itself would blow the
                    artwork up to four times its size. Pinned to the viewport it
                    stays whole while the blocks scroll over it. */}
                <div
                    aria-hidden="true"
                    className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: "url('/images/bg-about-omya.jpeg')" }}
                />

                {/* The artwork carries the OMYA CAPITAL mark across its middle
                    in near-white, and the opening statement landed straight on
                    it at 1.0:1 — invisible. This darkens the top of the page and
                    fades out well below the statement. It runs the full width
                    and starts off-screen under the header, so it has no edge
                    anywhere a reader can see; everything below it sits on its
                    own opaque panel and needs no help. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-0 h-[125vh] pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(10,10,12,1) 0%, rgba(10,10,12,1) 58%, rgba(10,10,12,0) 100%)',
                    }}
                />

                {/* overflow-x-clip, not hidden: the two halves of each block start
                    pushed out past their own side and slide in, and `clip` on one
                    axis is the only form that leaves the other one visible. */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 pb-14 lg:pb-20 overflow-x-clip">

                    {/* ── Opening statement ── */}
                    {/* A full screen to itself: arriving on the page you get
                        the name and the sentence, and nothing else. The first
                        block starts below the fold, so it is met by scrolling
                        rather than glimpsed on landing. The padding clears the
                        fixed header, which ends at 114px on phones and 104px
                        from sm up; the statement then centres in what is left. */}
                    <RevealOnScroll
                        direction="up"
                        delay={0.1}
                        duration={1}
                        className="min-h-screen flex flex-col justify-center text-center pt-[114px] sm:pt-[104px]"
                    >
                        {/* The page's real heading: the firm's own mark rather
                            than its name set in the body typeface. The image
                            carries the name for screen readers; the span adds
                            the page it belongs to, which would otherwise be
                            handed a heading that says only the firm's name. */}
                        <h1 className="flex justify-center">
                            <OmyaLogo
                                variant="light"
                                fluid
                                hiRes
                                className="w-auto h-[80px] sm:h-[130px] lg:h-[180px]"
                            />
                            <span className="sr-only"> — {t.nav.about}</span>
                        </h1>

                        <p className="mt-8 lg:mt-10 mx-auto max-w-4xl text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
                            {t.about.introLead} {t.about.missionQuote}
                        </p>
                    </RevealOnScroll>

                    {/* Enough of a run-up that the first block is not glued to
                        the fold, and arrives as something you scrolled to. */}
                    <div className="mt-16 lg:mt-24 space-y-12 lg:space-y-16">
                    {SECTIONS.map((section, idx) => {
                        // Alternate which side the photograph sits on, so four
                        // stacked blocks do not read as one repeated template —
                        // and so the two cards converge the other way round.
                        const photoRight = idx % 2 === 1;

                        return (
                            <ConvergingSplit
                                key={section.id}
                                id={section.id}
                                reverse={photoRight}
                                className="scroll-mt-[150px] lg:scroll-mt-[200px]"
                                // The shadow rides on each card rather than on
                                // the section, so neither leaves an empty
                                // outline of its landing slot while it travels.
                                mediaClassName="overflow-hidden min-h-[280px] md:min-h-[480px] shadow-2xl shadow-black/50"
                                bodyClassName="flex items-center px-6 py-10 sm:px-10 md:px-14 md:py-12 min-h-[280px] md:min-h-[480px] shadow-2xl shadow-black/50"
                                bodyStyle={{ backgroundColor: section.color }}
                                media={
                                    <>
                                        <img
                                            src={section.image}
                                            alt=""
                                            aria-hidden="true"
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        {/* Keeps the name legible whatever sits behind it */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-[#0A0A0C]/30 to-transparent" />
                                        <h2 className="absolute left-5 right-5 bottom-7 md:left-12 md:right-12 md:bottom-10 text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-white">
                                            {section.title}
                                        </h2>
                                    </>
                                }
                                body={
                                    <div className="w-full max-w-xl">
                                        {section.paragraphs && (
                                            <div className="space-y-5">
                                                {section.paragraphs.map((text) => (
                                                    <p key={text} className="text-base md:text-lg text-white/90 leading-relaxed">
                                                        {text}
                                                    </p>
                                                ))}
                                            </div>
                                        )}

                                        {section.items && (
                                            <ul className="space-y-4">
                                                {section.items.map((item) => (
                                                    <li key={item.title} className="text-base md:text-lg text-white/90 leading-relaxed">
                                                        <span className="font-bold text-white">{item.title}</span>
                                                        {' : '}
                                                        {item.desc}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                }
                            />
                        );
                    })}

                    {/* ── CTA ── */}
                    {/* On its own solid panel, like the four blocks above: the
                        artwork behind carries the OMYA CAPITAL wordmark at its
                        centre, and white text landed straight on it. */}
                    <RevealOnScroll direction="up" delay={0.1} duration={0.9} start="top 95%" className="text-center bg-[#0B1F33] shadow-2xl shadow-black/50 px-6 py-14 sm:py-16">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                            {t.about.ctaTitle}
                        </h2>
                        <Link
                            href={route('contact')}
                            style={{ '--pill-ink': '#0B1F33' }}
                            className="pill-ghost group mt-8 inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/60 bg-transparent text-white text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            <span>{t.about.ctaBtn}</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </RevealOnScroll>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
