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

            <PageHero eyebrow={t.documents.heroEyebrow} icon={FileText} title={t.documents.heroTitle} />

            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {documents.length > 0 ? (
                        <RevealOnScroll>
                            <div className="bg-white border border-[#0B4F71]/10 rounded-2xl overflow-hidden shadow-xl shadow-[#0B1F33]/8">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #0B4F71 100%)' }} className="text-left">
                                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-white/80">{t.documents.tableHeaders.document}</th>
                                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-white/80">{t.documents.tableHeaders.type}</th>
                                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-white/80">{t.documents.tableHeaders.date}</th>
                                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-white/80">{t.documents.tableHeaders.description}</th>
                                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-white/80">{t.documents.tableHeaders.actions}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#0B4F71]/8">
                                            {documents.map((doc, idx) => (
                                                <tr
                                                    key={doc.id}
                                                    className={`transition-colors duration-300 hover:bg-[#F0F6FA] ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FBFD]'}`}
                                                >
                                                    <td className="px-6 py-4 font-bold text-[#0B1F33]">{doc.name}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0B4F71]/10 text-[#0B4F71] border border-[#0B4F71]/15 uppercase">
                                                            {doc.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#0B2A45]/55">
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {new Date(doc.published_at).toLocaleDateString('fr-FR')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#0B2A45]/55 max-w-xs">{doc.description}</td>
                                                    <td className="px-6 py-4">
                                                        {doc.file_path ? (
                                                            <div className="flex items-center justify-end gap-3">
                                                                <a
                                                                    href={`/storage/${doc.file_path}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F71] hover:text-[#0B1F33] transition-colors duration-300"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                    {t.documents.consult}
                                                                </a>
                                                                <a
                                                                    href={route('documents.download', doc.id)}
                                                                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-[#0B2A45] to-[#0B4F71] text-white py-1.5 px-3 rounded-lg hover:opacity-90 transition-opacity duration-300"
                                                                >
                                                                    <Download className="w-3.5 h-3.5" />
                                                                    {t.documents.download}
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-[#0B2A45]/35 italic">{t.documents.soon}</span>
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
                            <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1F33] to-[#0B4F71] rounded-2xl p-16 text-center max-w-2xl mx-auto shadow-xl shadow-[#0B1F33]/20">
                                <div
                                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                                        backgroundSize: '24px 24px',
                                    }}
                                />
                                <FileText className="w-10 h-10 text-white/30 mx-auto mb-4 relative z-10" />
                                <p className="text-sm text-white/55 relative z-10">{t.documents.empty}</p>
                            </div>
                        </RevealOnScroll>
                    )}
                </div>
            </section>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
