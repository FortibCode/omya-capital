import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import { Newspaper, BookOpen, Megaphone, Calendar, Download } from 'lucide-react';

const TYPE_META = {
    actualite: { label: 'Actualités', icon: Newspaper, route: 'news.index' },
    publication: { label: 'Publications', icon: BookOpen, route: 'news.publications' },
    communique: { label: 'Communiqués', icon: Megaphone, route: 'news.communiques' },
};

export default function Index({ activeType = 'actualite', posts = [] }) {
    const meta = TYPE_META[activeType] || TYPE_META.actualite;
    const Icon = meta.icon;

    return (
        <>
            <Head title={meta.label} />

            <PageHero eyebrow="Actualités & Publications" icon={Icon} title={meta.label} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {/* Type switcher */}
                <RevealOnScroll className="flex flex-wrap justify-center gap-2 mb-16">
                    {Object.entries(TYPE_META).map(([key, m]) => {
                        const TabIcon = m.icon;
                        const isActive = key === activeType;
                        return (
                            <Link
                                key={key}
                                href={route(m.route)}
                                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                                    isActive
                                        ? 'bg-[#0B4F71] text-white border-[#0B4F71] shadow-md'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#0B4F71]/40 hover:text-[#0B4F71]'
                                }`}
                            >
                                <TabIcon className="w-4 h-4" />
                                {m.label}
                            </Link>
                        );
                    })}
                </RevealOnScroll>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.map((post, idx) => (
                            <RevealOnScroll key={post.id} delay={staggerDelay(idx, 0.1)}>
                                <div className="group bg-white border border-slate-100 hover:border-[#0B4F71]/25 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-500 h-full flex flex-col">
                                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>
                                            {new Date(post.published_at).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-[#0B4F71] transition-colors duration-300">
                                        {post.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-5 flex-1">{post.excerpt}</p>
                                    {post.attachment_path && (
                                        <a
                                            href={`/storage/${post.attachment_path}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F71] hover:text-[#093D58] mt-auto"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Télécharger le document</span>
                                        </a>
                                    )}
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                ) : (
                    <RevealOnScroll className="bg-[#F8FAFC] border border-dashed border-slate-200 rounded-2xl p-16 text-center max-w-2xl mx-auto">
                        <Icon className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                        <p className="text-sm text-slate-500">Aucun contenu publié pour le moment dans cette rubrique.</p>
                    </RevealOnScroll>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
