import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import { useLanguage } from '@/Context/LanguageContext';
import { Newspaper, BookOpen, Megaphone, Calendar, Download } from 'lucide-react';

const TYPE_META = {
    actualite: { icon: Newspaper, route: 'news.index' },
    publication: { icon: BookOpen, route: 'news.publications' },
    communique: { icon: Megaphone, route: 'news.communiques' },
};

function WaveDown({ fill = '#0B1F33' }) {
    return (
        <div className="w-full overflow-hidden leading-none pointer-events-none -mb-1">
            <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-12 sm:h-16" style={{ fill }}>
                <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" />
            </svg>
        </div>
    );
}

export default function Index({ activeType = 'actualite', posts = [] }) {
    const { t } = useLanguage();
    const meta = TYPE_META[activeType] || TYPE_META.actualite;
    const label = t.news.types[activeType] || t.news.types.actualite;
    const Icon = meta.icon;

    return (
        <>
            <Head title={label} />

            <PageHero eyebrow={t.news.heroEyebrow} icon={Icon} title={label} />

            {/* Tab switcher — fond blanc */}
            <div className="bg-white border-b border-[#0B4F71]/10 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="flex flex-wrap justify-center gap-2">
                        {Object.entries(TYPE_META).map(([key, m]) => {
                            const TabIcon = m.icon;
                            const isActive = key === activeType;
                            return (
                                <Link
                                    key={key}
                                    href={route(m.route)}
                                    className={`flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl border transition-all duration-300 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-[#0B2A45] to-[#0B4F71] text-white border-transparent shadow-md shadow-[#0B4F71]/25'
                                            : 'bg-white text-[#0B2A45]/60 border-[#0B4F71]/15 hover:border-[#0B4F71]/40 hover:text-[#0B4F71]'
                                    }`}
                                >
                                    <TabIcon className="w-4 h-4" />
                                    {t.news.types[key]}
                                </Link>
                            );
                        })}
                    </RevealOnScroll>
                </div>
            </div>

            {/* Content — fond blanc */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {posts.map((post, idx) => (
                                <RevealOnScroll key={post.id} delay={staggerDelay(idx, 0.1)}>
                                    <div className="group bg-gradient-to-br from-[#F0F6FA] to-white border border-[#0B4F71]/10 hover:border-[#0B4F71]/30 rounded-2xl p-7 hover:shadow-xl hover:shadow-[#0B4F71]/10 transition-all duration-500 h-full flex flex-col hover:-translate-y-1 overflow-hidden relative">
                                        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#0B4F71]/5 group-hover:bg-[#0B4F71]/10 transition-colors duration-500 pointer-events-none" />
                                        <div className="flex items-center gap-2 text-xs text-[#0B2A45]/45 mb-4">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>
                                                {new Date(post.published_at).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-extrabold text-[#0B1F33] mb-3 leading-snug group-hover:text-[#0B4F71] transition-colors duration-300">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs text-[#0B2A45]/55 leading-relaxed mb-5 flex-1">{post.excerpt}</p>
                                        {post.attachment_path && (
                                            <a
                                                href={`/storage/${post.attachment_path}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F71] hover:text-[#0B1F33] mt-auto transition-colors duration-300"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>{t.news.download}</span>
                                            </a>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0B2A45] to-[#0B4F71] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    ) : (
                        <RevealOnScroll>
                            <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1F33] to-[#0B4F71] rounded-2xl p-16 text-center max-w-2xl mx-auto shadow-xl shadow-[#0B1F33]/20">
                                <div
                                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                                        backgroundSize: '24px 24px',
                                    }}
                                />
                                <Icon className="w-10 h-10 text-white/30 mx-auto mb-4 relative z-10" />
                                <p className="text-sm text-white/60 relative z-10">{t.news.empty}</p>
                            </div>
                        </RevealOnScroll>
                    )}
                </div>
                <div className="mt-16">
                    <WaveDown fill="#0B1F33" />
                </div>
            </section>

            {/* Footer accent bleu */}
            <div className="h-24 lg:h-32 bg-[#0B1F33]" />
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
