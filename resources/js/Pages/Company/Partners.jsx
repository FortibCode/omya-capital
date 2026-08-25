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

            <PageHero eyebrow={t.partners.heroEyebrow} icon={Building2} title={t.partners.heroTitle} />

            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <CarCarouselTrack
                            items={partners}
                            interval={3400}
                            renderItem={(p) => (
                                <div className="bg-white border border-[#0B4F71]/10 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[#0B4F71]/10 hover:border-[#0B4F71]/25 transition-all duration-500 hover:-translate-y-1 h-full min-h-[200px] flex items-center justify-center p-8">
                                    {p.logo_path ? (
                                        <img src={`/storage/${p.logo_path}`} alt={p.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <ImageIcon className="w-10 h-10 text-[#0B4F71]/30" />
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
