import React from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/Context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from '@/Components/RevealOnScroll';

export default function LumoraAbout({ onOpenModal }) {
    const { t } = useLanguage();

    const CARDS = [
        {
            id: 'presentation',
            eyebrow: 'PRÉSENTATION',
            title: 'Conseil financier indépendant en Afrique Centrale.',
            content: "OMYA Capital accompagne les institutions publiques, les entreprises leaders et les investisseurs privés dans la réussite de leurs opérations stratégiques et haut de bilan.",
            detailText: "Une expertise éprouvée en ingénierie financière, restructuration de dette et levée de capitaux.",
            bulletPoints: [
                'Cabinet indépendant de conseil financier',
                'Expertise dédiée à l\'Afrique Centrale',
                'Accompagnement d\'acteurs publics & privés',
            ],
        },
        {
            id: 'mission',
            eyebrow: 'NOTRE MISSION',
            title: 'Accompagner et structurer les grands projets de la région.',
            content: "Notre mission est d'orienter et de sécuriser les capitaux vers des projets d'infrastructures et d'entreprises à fort impact économique en Afrique Centrale.",
            detailText: "Une démarche fondée sur la rigueur d'analyse, l'éthique et les meilleurs standards internationaux.",
            bulletPoints: [
                'Acteur du progrès en Afrique',
                'Investissements & ingénierie de haut niveau',
                'Standards et rigueur internationaux',
            ],
        },
        {
            id: 'vision',
            eyebrow: 'NOTRE VISION',
            title: 'Bâtir la banque d\'affaires de référence de la sous-région.',
            content: "Affirmer notre position de partenaire privilégié des décideurs pour développer des champions économiques régionaux résilients et autonomes.",
            detailText: "Créer des ponts solides entre les opportunités locales et les marchés financiers internationaux.",
            bulletPoints: [
                'Référence régionale d\'investissement',
                'Création de champions économiques',
                'Partenaire privilégié des décideurs',
            ],
        },
        {
            id: 'valeurs',
            eyebrow: 'NOS VALEURS',
            title: 'Indépendance, Rigueur, Confidentialité & Engagement.',
            content: "Quatre principes cardinaux qui guident chacune de nos interventions et garantissent une totale neutralité, sans aucun conflit d'intérêts.",
            detailText: "Un engagement total sur le long terme pour bâtir une relation de confiance durable avec nos clients.",
            bulletPoints: [
                'Indépendance & Éthique irréprochable',
                'Excellence & Rigueur d\'exécution',
                'Engagement & Confidentialité',
            ],
        },
    ];

    const handleCardClick = (card) => {
        if (onOpenModal) {
            onOpenModal({
                title: card.title,
                subtitle: card.eyebrow,
                description: card.detailText,
                points: card.bulletPoints,
                category: "À PROPOS D'OMYA CAPITAL",
            });
        }
    };

    return (
        <section className="relative mt-0 pt-0 pb-0 overflow-hidden bg-[#F4F6F8] text-slate-900">
            <div className="w-full max-w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[620px]">

                    {/* ── 01. Left Side Banner (Slides in from left, delay 0.1s, duration 1.1s) ── */}
                    <RevealOnScroll
                        direction="right"
                        delay={0.1}
                        duration={1.1}
                        className="lg:col-span-4 relative flex flex-col items-center justify-center p-8 sm:p-12 text-center overflow-hidden min-h-[380px] lg:min-h-full"
                    >
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                            style={{ backgroundImage: "url('/images/about_title_bg.png')" }}
                        />
                        {/* Dark Blue Overlay */}
                        <div className="absolute inset-0 bg-[#0B2238]/85 backdrop-blur-[0.5px]" />

                        {/* Centered Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3">
                                À Propos
                            </h2>
                            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-200/90">
                                DÉCOUVRIR NOTRE CABINET
                            </p>
                        </div>
                    </RevealOnScroll>

                    {/* ── Right Side: Cards & Header Section ── */}
                    <div className="lg:col-span-8 p-6 sm:p-10 lg:p-14 flex flex-col justify-between bg-[#F4F6F8]">
                        
                        <div>
                            {/* ── 02. Header Row with HR line (Slides down, delay 0.25s) ── */}
                            <RevealOnScroll direction="down" delay={0.25} duration={0.9} className="flex items-center gap-4 mb-8">
                                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0B2A45] shrink-0">
                                    DÉCOUVRIR NOTRE CABINET
                                </span>
                                <div className="h-px bg-slate-300/80 flex-1" />
                            </RevealOnScroll>

                            {/* ── 03. 4 White Cards Grid (Sequential 1-by-1 entrance, suspenseful stagger) ── */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                {CARDS.map((card, idx) => {
                                    const cardDelay = 0.45 + idx * 0.28;
                                    return (
                                        <RevealOnScroll
                                            key={card.id}
                                            direction="up"
                                            delay={cardDelay}
                                            duration={1.1}
                                            start="top 88%"
                                        >
                                            <div
                                                onClick={() => handleCardClick(card)}
                                                className="group cursor-pointer bg-white rounded-lg p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[280px] h-full"
                                            >
                                                <div>
                                                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B2A45] mb-3 block">
                                                        {card.eyebrow}
                                                    </span>

                                                    <h3 className="text-lg sm:text-xl font-bold text-[#0B2A45] mb-3 leading-snug group-hover:text-[#F97316] transition-colors">
                                                        {card.title}
                                                    </h3>

                                                    <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mb-6">
                                                        {card.content}
                                                    </p>
                                                </div>

                                                <div className="pt-2 border-t border-slate-100 flex items-center">
                                                    <Link
                                                        href={`/about#${card.id}`}
                                                        className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#F97316] group-hover:text-[#EA580C] group-hover:underline"
                                                    >
                                                        <span>EN SAVOIR PLUS</span>
                                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </RevealOnScroll>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── 04. Centered CTA Button at bottom (Enters last) ── */}
                        <RevealOnScroll direction="up" delay={1.54} duration={1.1} start="top 88%" className="text-center pt-2">
                            <Link
                                href={route('contact')}
                                className="inline-flex items-center gap-3 px-8 py-3.5 rounded bg-[#0B2A45] hover:bg-[#07192A] text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow"
                            >
                                <span>DÉCOUVRIR OMYA CAPITAL</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </RevealOnScroll>

                    </div>

                </div>
            </div>
        </section>
    );
}



