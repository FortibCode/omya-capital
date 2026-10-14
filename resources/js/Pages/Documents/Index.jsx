import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import { useLanguage } from '@/Context/LanguageContext';
import { Eye, Download } from 'lucide-react';

/** Dates follow the language the visitor is reading in. */
const LOCALES = { fr: 'fr-FR', en: 'en-GB', pt: 'pt-PT' };

export default function Index({ documents = [] }) {
    const { t, lang } = useLanguage();

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
            <Head title={t.documents.heroTitle} />

            <div className="relative text-white">
                {/* Fixed rather than tiled: the page is taller than one screen,
                    so a `cover` background on the element itself would blow the
                    artwork up several times its size. */}
                <div
                    aria-hidden="true"
                    className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: "url('/images/bg-about-omya.jpeg')" }}
                />
                {/* The artwork carries the OMYA CAPITAL mark across its middle
                    in near-white, and white type landed straight on it. */}
                <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#0A0A0C]/75 pointer-events-none" />

                {/* The header is fixed and there is no hero to sit under it, so
                    the title clears it by hand: the bar ends at 114px on phones
                    and 104px from sm up. */}
                <div className="relative z-10 max-w-[1150px] mx-auto px-5 sm:px-8 pt-[150px] lg:pt-[176px] pb-20 lg:pb-28">

                    <RevealOnScroll direction="down" delay={0.1} duration={0.9} className="mb-12 lg:mb-16 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                            {t.documents.heroTitle}
                        </h1>
                    </RevealOnScroll>

                    {/* One opaque row per document rather than a table: a table
                        has to scroll sideways on a phone, and these are five
                        fields that read perfectly well stacked. The artwork
                        behind is busy, so each row carries its own panel. */}
                    {documents.length > 0 ? (
                        <div className="space-y-5">
                            {documents.map((doc, idx) => {
                                const date = formatDate(doc.published_at);
                                return (
                                    <RevealOnScroll
                                        key={doc.id}
                                        direction="up"
                                        delay={staggerDelay(idx, 0.08)}
                                        duration={0.9}
                                        start="top 94%"
                                    >
                                        <article className="bg-[#0B1F33] shadow-2xl shadow-black/50 px-6 py-7 sm:px-9 sm:py-8 grid gap-5 md:grid-cols-12 md:items-center">
                                            <div className="md:col-span-7">
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/55">
                                                    {doc.type && (
                                                        <span className="font-extrabold uppercase tracking-widest text-white/75">
                                                            {doc.type}
                                                        </span>
                                                    )}
                                                    {date && <time dateTime={doc.published_at}>{date}</time>}
                                                </div>

                                                <h2 className="mt-3 text-lg sm:text-xl font-bold leading-snug text-white">
                                                    {doc.name}
                                                </h2>

                                                {doc.description && (
                                                    <p className="mt-2 text-sm sm:text-base text-white/75 leading-relaxed">
                                                        {doc.description}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="md:col-span-5 flex flex-wrap items-center gap-5 md:justify-end">
                                                {doc.file_path ? (
                                                    <>
                                                        <a
                                                            href={`/storage/${doc.file_path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/85 hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:underline"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            <span>{t.documents.consult}</span>
                                                        </a>
                                                        <a
                                                            href={route('documents.download', doc.id)}
                                                            style={{ '--pill-ink': '#0B1F33' }}
                                                            className="pill-ghost group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/60 bg-transparent text-white text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                                        >
                                                            <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                                                            <span>{t.documents.download}</span>
                                                        </a>
                                                    </>
                                                ) : (
                                                    // Recorded but not yet uploaded: say so rather
                                                    // than offer a download that cannot happen.
                                                    <span className="text-xs font-bold uppercase tracking-widest text-white/45">
                                                        {t.documents.soon}
                                                    </span>
                                                )}
                                            </div>
                                        </article>
                                    </RevealOnScroll>
                                );
                            })}
                        </div>
                    ) : (
                        <RevealOnScroll direction="up" delay={0.2} duration={0.9}>
                            <p className="bg-[#0B1F33] shadow-2xl shadow-black/50 px-6 py-16 sm:py-20 text-center text-base sm:text-lg text-white/75">
                                {t.documents.empty}
                            </p>
                        </RevealOnScroll>
                    )}

                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
