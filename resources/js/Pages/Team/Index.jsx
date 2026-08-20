import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import { Users, Camera } from 'lucide-react';

export default function Index({ members = [] }) {
    return (
        <>
            <Head title="Équipe" />

            <PageHero
                eyebrow="Notre Équipe"
                icon={Users}
                title="L’Équipe Dirigeante"
                description="Des professionnels engagés au service de la croissance de nos clients."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {members.map((member, idx) => (
                        <RevealOnScroll key={member.id} delay={staggerDelay(idx, 0.1)}>
                            <div className="group bg-white border border-slate-100 hover:border-[#0B4F71]/25 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-500 text-center">
                                <div className="h-52 bg-[#F6FAFC] flex items-center justify-center border-b border-slate-100 overflow-hidden relative">
                                    {member.photo_path ? (
                                        <img
                                            src={`/storage/${member.photo_path}`}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-slate-300">
                                            <Camera className="w-8 h-8" />
                                            <span className="text-[10px] font-semibold uppercase tracking-wide">Photo à venir</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-sm font-extrabold text-slate-900">{member.name}</h3>
                                    <span className="text-xs text-[#0B4F71] font-semibold block mt-1.5">{member.role_title}</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
