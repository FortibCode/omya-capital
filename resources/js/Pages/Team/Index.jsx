import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll from '@/Components/RevealOnScroll';
import CarCarouselTrack from '@/Components/CarCarouselTrack';
import TeamCard from '@/Components/TeamCard';
import { useLanguage, translateMember } from '@/Context/LanguageContext';
import { Users } from 'lucide-react';

export default function Index({ members = [] }) {
    const { t, lang } = useLanguage();
    const displayMembers = (members.length > 0 ? members : [
        { id: 1, name: 'Christelle BASILUA SEMY', role_title: 'Directrice Générale', photo_path: 'images/christelle-basilua-semy.jpeg' },
        { id: 2, name: 'Suzick TOMA', role_title: 'Directrice de mission', photo_path: 'images/suzic-iwolo.jpeg' },
        { id: 3, name: 'Louis-Raymond GOMES', role_title: 'Conseiller Juridique', photo_path: 'images/louis-raymond-gomes.jpeg' },
        { id: 4, name: 'Sarah BONANA', role_title: 'Assistante Exécutive', photo_path: 'images/sarah-bonana.jpeg' },
    ]).map((m) => translateMember(m, lang));

    return (
        <>
            <Head title={t.nav.team} />

            <PageHero
                eyebrow={t.team.heroEyebrow}
                icon={Users}
                title={t.team.heroTitle}
                description={t.team.heroDescription}
            />

            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <CarCarouselTrack
                            items={displayMembers}
                            interval={3600}
                            showWheels={true}
                            renderItem={(member) => (
                                <TeamCard member={member} className="h-full" />
                            )}
                        />
                    </RevealOnScroll>
                </div>
            </section>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
