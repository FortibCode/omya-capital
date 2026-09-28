import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll from '@/Components/RevealOnScroll';
import { useLanguage } from '@/Context/LanguageContext';
import { FileText, Eye, Download, Calendar } from 'lucide-react';

export default function Index({ documents = [] }) {
    const { t } = useLanguage();

    return (
        <>
            <Head title={t.documents.heroTitle} />

            <PageHero
                title={t.documents.heroTitle}
            />

            <section className="relative bg-[#0B1F33] py-20 lg:py-32 overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33] via-[#0B2A45]/70 to-[#0B1F33] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {documents.length > 0 ? (
                        <RevealOnScroll>
                            <div className="bg-white/5 border border-white/15 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-white/10 text-left border-b border-white/15">
                                                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">{t.documents.tableHeaders.document}</th>
                                                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">{t.documents.tableHeaders.type}</th>
                                                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">{t.documents.tableHeaders.date}</th>
                                                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">{t.documents.tableHeaders.description}</th>
                                                <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-wider text-[#38bdf8]">{t.documents.tableHeaders.actions}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {documents.map((doc) => (
                                                <tr
                                                    key={doc.id}
                                                    className="transition-colors duration-300 hover:bg-white/10"
                                                >
                                                    <td className="px-6 py-5 font-bold text-white">{doc.name}</td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 uppercase tracking-wider">
                                                            {doc.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-white/70">
                                                        <span className="inline-flex items-center gap-1.5 font-medium">
                                                            <Calendar className="w-4 h-4 text-[#38bdf8]" />
                                                            {new Date(doc.published_at).toLocaleDateString('fr-FR')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-white/70 max-w-xs font-medium">{doc.description}</td>
                                                    <td className="px-6 py-5">
                                                        {doc.file_path ? (
                                                            <div className="flex items-center justify-end gap-3">
                                                                <a
                                                                    href={`/storage/${doc.file_path}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38bdf8] hover:text-white transition-colors duration-300 uppercase tracking-wider"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                    {t.documents.consult}
                                                                </a>
                                                                <a
                                                                    href={route('documents.download', doc.id)}
                                                                    className="inline-flex items-center gap-2 text-xs font-extrabold bg-white text-[#0B1F33] py-2.5 px-4 rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg"
                                                                >
                                                                    <Download className="w-3.5 h-3.5" />
                                                                    {t.documents.download}
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-white/40 italic">{t.documents.soon}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ) : (
                        <RevealOnScroll>
                            <div className="relative overflow-hidden bg-white/5 border border-white/15 backdrop-blur-xl rounded-3xl p-16 text-center max-w-2xl mx-auto shadow-2xl">
                                <FileText className="w-12 h-12 text-[#38bdf8]/50 mx-auto mb-4 relative z-10" />
                                <p className="text-base text-white/70 relative z-10 font-medium">{t.documents.empty}</p>
                            </div>
                        </RevealOnScroll>
                    )}
                </div>
            </section>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
