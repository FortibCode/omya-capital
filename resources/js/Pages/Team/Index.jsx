import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import RevealOnScroll from '@/Components/RevealOnScroll';
import { useLanguage, translateMember } from '@/Context/LanguageContext';

/** Where a member's portrait actually lives, whichever way it was recorded. */
function photoUrl(member) {
    const path = member.photo_path;
    if (!path) return null;
    if (path.startsWith('/') || path.startsWith('http')) return path;
    if (path.startsWith('images/')) return `/${path}`;
    return `/storage/${path}`;
}

export default function Index({ members = [] }) {
    const { t, lang } = useLanguage();

    // Only the people actually recorded in the `team_members` table. There is
    // no stand-in list: an empty table means an empty section, never invented
    // colleagues.
    const people = members.map((member) => translateMember(member, lang));

    return (
        <>
            <Head title={t.nav.team} />

            <div className="relative text-white">
                {/* The image runs the whole page, the way the artwork does on
                    À propos and Services. Fixed rather than tiled: the page is
                    taller than one screen, and a `cover` background on the
                    element itself would blow the photograph up several times
                    its size. Pinned to the viewport it stays whole while the
                    content scrolls over it. */}
                <div
                    aria-hidden="true"
                    className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: "url('/images/bg-team-omya.jpg')" }}
                />

                {/* A photograph has bright patches wherever it likes, so the
                    names and roles need this to stay readable over it. */}
                <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#0A0A0C]/75 pointer-events-none" />

                {/* The header is fixed and there is no hero to sit under it, so
                    the title clears it by hand: the bar ends at 114px on phones
                    and 104px from sm up. */}
                <div className="relative z-10 max-w-[1250px] mx-auto px-5 sm:px-8 pt-[150px] lg:pt-[176px] pb-20 lg:pb-28">

                    <RevealOnScroll direction="down" delay={0.1} duration={0.9} className="mb-12 lg:mb-16 text-center">
                        <h1 className="max-w-5xl mx-auto text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                            {t.team.heroTitle}
                        </h1>
                    </RevealOnScroll>

                    {people.length === 0 ? (
                        <p className="text-center text-white/60 text-base">—</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-x-10">
                            {people.map((member, idx) => {
                                const url = photoUrl(member);

                                return (
                                    <RevealOnScroll
                                        key={member.id ?? member.name ?? idx}
                                        direction="up"
                                        delay={0.1 + idx * 0.12}
                                        duration={0.9}
                                        start="top 92%"
                                        className="text-center"
                                    >
                                        {/* object-top: the portraits are cropped
                                            to one shape from sources of several
                                            ratios, and heads sit at the top. */}
                                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0B2A45] shadow-2xl shadow-black/50">
                                            {url ? (
                                                <img
                                                    src={url}
                                                    alt={member.name}
                                                    loading="lazy"
                                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                                />
                                            ) : null}
                                        </div>

                                        <h2 className="mt-5 text-lg sm:text-xl font-bold text-white leading-snug">
                                            {member.name}
                                        </h2>
                                        {member.role_title && (
                                            <p className="mt-1.5 text-sm sm:text-base text-white/80 leading-relaxed">
                                                {member.role_title}
                                            </p>
                                        )}
                                    </RevealOnScroll>
                                );
                            })}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
