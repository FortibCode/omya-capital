import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import { useLanguage } from '@/Context/LanguageContext';
import { Calendar, Download } from 'lucide-react';

/** The three sections, each a real route declared in web.php. */
const TYPES = [
    { key: 'actualite', route: 'news.index' },
    { key: 'publication', route: 'news.publications' },
    { key: 'communique', route: 'news.communiques' },
];

/** Dates follow the language the visitor is reading in. */
const LOCALES = { fr: 'fr-FR', en: 'en-GB', pt: 'pt-PT' };

export default function Index({ activeType = 'actualite', posts = [] }) {
    const { t, lang } = useLanguage();
    const label = t.news.types[activeType] || t.news.types.actualite;

    const formatDate = (value) => {
        if (!value) return null;
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return null;
        return date.toLocaleDateString(LOCALES[lang] || LOCALES.fr, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title={label} />

            <div className="relative text-white">
                {/* Fixed rather than tiled: the page is taller than one screen,
                    so a `cover` background on the element itself would blow the
                    artwork up several times its size. */}
                <div
                    aria-hidden="true"
                    className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: "url('/images/bg-services-omya.jpeg')" }}
                />
                {/* The artwork carries the OMYA CAPITAL mark across its middle
                    in near-white, and white type landed straight on it. */}
                <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#0A0A0C]/75 pointer-events-none" />

                {/* The header is fixed and there is no hero to sit under it, so
                    the title clears it by hand: the bar ends at 114px on phones
                    and 104px from sm up. */}
                <div className="relative z-10 max-w-[1150px] mx-auto px-5 sm:px-8 pt-[150px] lg:pt-[176px] pb-20 lg:pb-28">

                    <RevealOnScroll direction="down" delay={0.1} duration={0.9} className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                            {label}
                        </h1>
                    </RevealOnScroll>

                    {/* ── The three sections ── */}
                    <RevealOnScroll
                        direction="up"
                        delay={0.2}
                        duration={0.9}
                        className="mt-10 lg:mt-12 flex flex-wrap justify-center gap-3"
                    >
                        {TYPES.map(({ key, route: routeName }) => {
                            const isActive = key === activeType;
                            return (
                                <Link
                                    key={key}
                                    href={route(routeName)}
                                    aria-current={isActive ? 'page' : undefined}
                                    style={isActive ? undefined : { '--pill-ink': '#0B1F33' }}
                                    className={
                                        isActive
                                            ? 'inline-flex items-center px-7 py-3 rounded-full bg-white text-[#0B1F33] text-xs font-extrabold uppercase tracking-widest'
                                            : 'pill-ghost inline-flex items-center px-7 py-3 rounded-full border border-white/50 bg-transparent text-white/85 text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
                                    }
                                >
                                    {t.news.types[key]}
                                </Link>
                            );
                        })}
                    </RevealOnScroll>

                    {/* ── What is published, if anything is ── */}
                    {/* Every card sits on its own opaque panel: the artwork
                        behind is busy, and body copy laid straight on it would
                        not hold up. */}
                    <div className="mt-12 lg:mt-16">
                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                                {posts.map((post, idx) => {
                                    const date = formatDate(post.published_at);
                                    return (
                                        <RevealOnScroll
                                            key={post.id}
                                            direction="up"
                                            delay={staggerDelay(idx, 0.1)}
                                            duration={0.9}
                                            start="top 94%"
                                        >
                                            <article className="h-full flex flex-col bg-[#0B1F33] shadow-2xl shadow-black/50 px-7 py-8">
                                                {date && (
                                                    <div className="flex items-center gap-2 text-xs text-white/55">
                                                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                                                        <time dateTime={post.published_at}>{date}</time>
                                                    </div>
                                                )}

                                                <h2 className="mt-4 text-lg sm:text-xl font-bold leading-snug text-white">
                                                    {post.title}
                                                </h2>

                                                {post.excerpt && (
                                                    <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed flex-1">
                                                        {post.excerpt}
                                                    </p>
                                                )}

                                                {post.attachment_path && (
                                                    <a
                                                        href={`/storage/${post.attachment_path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white hover:text-white/70 transition-colors duration-300 focus-visible:outline-none focus-visible:underline"
                                                    >
                                                        <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                                                        <span>{t.news.download}</span>
                                                    </a>
                                                )}
                                            </article>
                                        </RevealOnScroll>
                                    );
                                })}
                            </div>
                        ) : (
                            <RevealOnScroll direction="up" delay={0.3} duration={0.9}>
                                <p className="bg-[#0B1F33] shadow-2xl shadow-black/50 px-6 py-16 sm:py-20 text-center text-base sm:text-lg text-white/75">
                                    {t.news.empty}
                                </p>
                            </RevealOnScroll>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
