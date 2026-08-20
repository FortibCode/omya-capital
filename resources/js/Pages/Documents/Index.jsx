import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll from '@/Components/RevealOnScroll';
import { FileText, Eye, Download, Calendar } from 'lucide-react';

export default function Index({ documents = [] }) {
    return (
        <>
            <Head title="Documents" />

            <PageHero eyebrow="Bibliothèque de Documents" icon={FileText} title="Documents" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {documents.length > 0 ? (
                    <RevealOnScroll className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#F6FAFC] text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                        <th className="px-6 py-4">Document</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Description</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {documents.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-[#F8FAFC] transition-colors duration-300">
                                            <td className="px-6 py-4 font-bold text-slate-900">{doc.name}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#F6FAFC] text-[#0B4F71] border border-slate-200 uppercase">
                                                    {doc.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(doc.published_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 max-w-xs">{doc.description}</td>
                                            <td className="px-6 py-4">
                                                {doc.file_path ? (
                                                    <div className="flex items-center justify-end gap-3">
                                                        <a
                                                            href={`/storage/${doc.file_path}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F71] hover:text-[#093D58]"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            Consulter
                                                        </a>
                                                        <a
                                                            href={route('documents.download', doc.id)}
                                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F71] hover:text-[#093D58]"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                            Télécharger
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">Bientôt disponible</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </RevealOnScroll>
                ) : (
                    <RevealOnScroll className="bg-[#F8FAFC] border border-dashed border-slate-200 rounded-2xl p-16 text-center max-w-2xl mx-auto">
                        <FileText className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                        <p className="text-sm text-slate-500">Aucun document disponible pour le moment.</p>
                    </RevealOnScroll>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
