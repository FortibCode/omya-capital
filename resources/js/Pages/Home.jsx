import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import BaselineHero from '@/Components/BaselineHero';
import StackSection from '@/Components/StackSection';
import LumoraAbout from '@/Components/LumoraAbout';
import LumoraServices from '@/Components/LumoraServices';
import { useLanguage } from '@/Context/LanguageContext';

export default function Home({ services = [], onOpenModal, onMenuOpen }) {
    const { t } = useLanguage();

    return (
        <>
            <Head title={t.nav.home} />

            {/* Stacked scroll: each panel sticks and the next climbs over it.
                No overflow/transform on this wrapper — either would break the
                sticky positioning the panels rely on. */}
            <div className="bg-[#0B1F33] text-white antialiased">
                {/* ── 01. BASELINE HERO ── */}
                <StackSection zIndex={1}>
                    <BaselineHero onMenuOpen={onMenuOpen} onOpenModal={onOpenModal} />
                </StackSection>

                {/* ── 02. SECTION À PROPOS ── */}
                <StackSection zIndex={2}>
                    <LumoraAbout onOpenModal={onOpenModal} />
                </StackSection>

                {/* ── 03. SECTION SERVICES — last panel, nothing covers it ── */}
                <StackSection zIndex={3} depth={false}>
                    <LumoraServices services={services} />
                </StackSection>
            </div>
        </>
    );
}

Home.layout = (page) => <PublicLayout>{page}</PublicLayout>;

