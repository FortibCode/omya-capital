import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import { Building2, ImageIcon } from 'lucide-react';

export default function Partners({ partners = [] }) {
    return (
        <>
            <Head title="Partenaires" />

            <PageHero eyebrow="Réseau Partenaire" icon={Building2} title="Nos Partenaires" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {partners.map((p, idx) => (
                        <RevealOnScroll key={p.id} delay={staggerDelay(idx, 0.1)}>
                            <div className="group bg-white border border-slate-100 hover:border-[#0B4F71]/25 rounded-2xl p-10 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-500 text-center">
                                <div className="w-24 h-24 rounded-2xl bg-[#F6FAFC] border border-slate-200 flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-105">
                                    {p.logo_path ? (
                                        <img src={`/storage/${p.logo_path}`} alt={p.name} className="max-w-[70%] max-h-[70%] object-contain" />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>
                                <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </>
    );
}

Partners.layout = (page) => <PublicLayout>{page}</PublicLayout>;
