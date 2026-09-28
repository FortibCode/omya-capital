import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/Context/LanguageContext';
import RevealOnScroll from '@/Components/RevealOnScroll';

export default function LumoraServices({ onOpenModal }) {
    const { t } = useLanguage();

    const SERVICES_DATA = [
        {
            id: 'financement-de-projets',
            eyebrow: 'FINANCEMENT DE PROJETS',
            title: 'Mobilisation de capitaux & ingénierie financière.',
            content: "Structuration et levée de fonds propres, quasi-fonds propres et dettes syndiquées pour les grands projets d'infrastructures et d'entreprises.",
            detailText: "Une expertise complète allant du modèle financier aux négociations avec les bailleurs de fonds internationaux.",
            bullets: [
                'Levée de fonds propres & quasi-fonds propres',
                'Structuration de dette syndiquée et obligataire',
                'Partenariats Public-Privé (PPP)',
            ],
        },
        {
            id: 'fusions-acquisitions',
            eyebrow: 'FUSIONS & ACQUISITIONS',
            title: "Accompagnement stratégique M&A et cessions.",
            content: "Conseil exclusif à la vente et à l'achat, évaluation d'entreprises, négociation et due diligence approfondie pour les leaders régionaux.",
            detailText: "Accompagnement de A à Z dans l'exécution de transactions complexes en Afrique Centrale.",
            bullets: [
                'Cessions d\'entreprises et restructuration du capital',
                'Acquisitions stratégiques et croissances externes',
                'Évaluation financière et due diligence',
            ],
        },
        {
            id: 'restructuration',
            eyebrow: 'RESTRUCTURATION',
            title: 'Réorganisation financière & gestion des crises.',
            content: "Reprofilage de dettes bancaires, optimisation du besoin en fonds de roulement (BFR) et plans de redressement pour préserver la valeur.",
            detailText: "Intervention rapide et rigoureuse auprès des créanciers pour stabiliser et relancer l'activité.",
            bullets: [
                'Renégociation et reprofilage de dette corporate',
                'Optimisation du besoin en fonds de roulement (BFR)',
                'Redressement financier et opérationnel',
            ],
        },
        {
            id: 'conseil-strategique',
            eyebrow: 'CONSEIL STRATÉGIQUE',
            title: 'Gouvernance & assistance aux organes de direction.',
            content: "Accompagnement des conseils d'administration dans l'élaboration de plans stratégiques quinquennaux et l'alignement sur les standards.",
            detailText: "Mise en place de comités de gouvernance, cartographie des risques et préparation aux levées de fonds.",
            bullets: [
                'Élaboration de plans stratégiques quinquennaux',
                'Revue des cadres de gouvernance et conformité',
                'Gestion et cartographie des risques financiers',
            ],
        },
    ];

    const handleCardClick = (service) => {
        if (onOpenModal) {
            onOpenModal({
                title: service.title,
                subtitle: service.eyebrow,
                description: service.detailText,
                points: service.bullets,
                category: "NOS SERVICES",
            });
        }
    };

    return (
        <section className="relative mt-0 pt-0 pb-0 overflow-hidden bg-[#F4F6F8] text-slate-900 border-t border-slate-200/80">
            <div className="w-full max-w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[620px]">

                    {/* ── Left Side (Desktop): Cards & Header Section ── */}
                    <div className="lg:col-span-8 order-2 lg:order-1 p-6 sm:p-10 lg:p-14 flex flex-col justify-between bg-[#F4F6F8]">
                        
                        <div>
                            {/* ── 01. Header Row with HR line (Slides down, delay 0.25s) ── */}
                            <RevealOnScroll direction="down" delay={0.25} duration={0.9} className="flex items-center gap-4 mb-8">
                                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0B2A45] shrink-0">
                                    CE QUE NOUS FAISONS DE MIEUX
                                </span>
                                <div className="h-px bg-slate-300/80 flex-1" />
                            </RevealOnScroll>

                            {/* ── 02. 4 White Cards Grid (Sequential 1-by-1 entrance: 0.45s, 0.68s, 0.91s, 1.14s) ── */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                {SERVICES_DATA.map((service, idx) => {
                                    const serviceDelay = 0.45 + idx * 0.28;
                                    return (
                                         <RevealOnScroll
                                             key={service.id}
                                             direction="up"
                                             delay={serviceDelay}
                                             duration={1.1}
                                             start="top 88%"
                                         >
                                             <div
                                                 onClick={() => handleCardClick(service)}
                                                 className="group cursor-pointer bg-white rounded-lg p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[280px] h-full"
                                             >
                                                 <div>
                                                     <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B2A45] mb-3 block">
                                                         {service.eyebrow}
                                                     </span>

                                                     <h3 className="text-lg sm:text-xl font-bold text-[#0B2A45] mb-3 leading-snug group-hover:text-[#F97316] transition-colors">
                                                         {service.title}
                                                     </h3>

                                                     <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mb-6">
                                                         {service.content}
                                                     </p>
                                                 </div>

                                                 <div className="pt-2 border-t border-slate-100 flex items-center">
                                                     <Link
                                                         href={`/services#${service.id}`}
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

                        {/* ── 03. Centered CTA Button at bottom (Enters last) ── */}
                        <RevealOnScroll direction="up" delay={1.54} duration={1.1} start="top 88%" className="text-center pt-2">
                            <Link
                                href={route('contact')}
                                className="inline-flex items-center gap-3 px-8 py-3.5 rounded bg-[#0B2A45] hover:bg-[#07192A] text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow"
                            >
                                <span>DEMANDER UNE ÉTUDE</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </RevealOnScroll>

                    </div>

                    {/* ── 04. Right Side (Desktop): Dark Blue Boardroom Banner (Slides in from right, delay 0.1s, duration 1.1s) ── */}
                    <RevealOnScroll
                        direction="left"
                        delay={0.1}
                        duration={1.1}
                        className="lg:col-span-4 order-1 lg:order-2 relative flex flex-col items-center justify-center p-8 sm:p-12 text-center overflow-hidden min-h-[380px] lg:min-h-full"
                    >
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                            style={{ backgroundImage: "url('/images/image-capital-1.jpg')" }}
                        />
                        {/* Dark Blue Overlay */}
                        <div className="absolute inset-0 bg-[#0B2238]/85 backdrop-blur-[0.5px]" />

                        {/* Centered Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3">
                                Nos Services
                            </h2>
                            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-200/90">
                                EXPERTISES & SOLUTIONS
                            </p>
                        </div>
                    </RevealOnScroll>

                </div>
            </div>
        </section>
    );
}



