import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import BaselineHero from '@/Components/BaselineHero';
import LumoraAbout from '@/Components/LumoraAbout';
import LumoraServices from '@/Components/LumoraServices';
import { useLanguage } from '@/Context/LanguageContext';

export default function Home({ onOpenModal, onMenuOpen }) {
    const { t } = useLanguage();

    return (
        <>
            <Head title={t.nav.home} />

            <div className="bg-white text-slate-900 antialiased">
                {/* ── 01. BASELINE HERO ── */}
                <BaselineHero onMenuOpen={onMenuOpen} onOpenModal={onOpenModal} />

                {/* ── SEPARATION INTER-SECTION GRISE ── */}
                <div className="w-full bg-[#f1f5f9] py-12 sm:py-16 border-y border-slate-300/30 flex items-center justify-center relative z-10 shadow-inner">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="w-16 h-1 bg-[#0B1F33] mx-auto rounded-full opacity-30" />
                    </div>
                </div>

                {/* ── 02. SECTION À PROPOS ── */}
                <LumoraAbout onOpenModal={onOpenModal} />

                {/* ── SEPARATION INTER-SECTION BLANCHE ── */}
                <div className="w-full bg-white py-12 sm:py-16 relative z-10" />

                {/* ── 03. SECTION SERVICES ── */}
                <LumoraServices onOpenModal={onOpenModal} />
            </div>
        </>
    );
}

Home.layout = (page) => <PublicLayout>{page}</PublicLayout>;

