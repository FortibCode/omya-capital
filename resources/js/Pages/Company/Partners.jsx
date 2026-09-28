import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll from '@/Components/RevealOnScroll';
import CarCarouselTrack from '@/Components/CarCarouselTrack';
import { useLanguage } from '@/Context/LanguageContext';
import { Building2, ImageIcon } from 'lucide-react';

export default function Partners({ partners = [] }) {
    const { t } = useLanguage();

    return (
        <>
            <Head title={t.nav.partners} />

            <PageHero
                title={t.partners.heroTitle}
            />

            <section className="relative bg-[#0B1F33] py-20 lg:py-32 overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33] via-[#0B2A45]/70 to-[#0B1F33] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <RevealOnScroll>
                        <CarCarouselTrack
                            items={partners}
                            interval={3400}
                            renderItem={(p) => (
                                <div className="bg-white/5 border border-white/15 backdrop-blur-xl rounded-2xl shadow-2xl hover:border-[#38bdf8]/40 transition-all duration-500 hover:-translate-y-1 h-full min-h-[200px] flex items-center justify-center p-8">
                                    {p.logo_path ? (
                                        <img src={`/storage/${p.logo_path}`} alt={p.name} className="w-full h-full object-contain filter brightness-110" />
                                    ) : (
                                        <ImageIcon className="w-10 h-10 text-white/40" />
                                    )}
                                </div>
                            )}
                        />
                    </RevealOnScroll>
                </div>
            </section>
        </>
    );
}

Partners.layout = (page) => <PublicLayout>{page}</PublicLayout>;
