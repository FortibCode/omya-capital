import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import { Building2, Target, Compass, ShieldCheck, Award, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

const VALEURS = [
    {
        icon: ShieldCheck,
        title: 'Probité, Intégrité, Responsabilité',
        desc: 'Agir avec respect.',
    },
    {
        icon: Award,
        title: 'Excellence',
        desc: 'Toujours se former et être informé.',
    },
    {
        icon: HeartHandshake,
        title: 'Engagement',
        desc: 'Loyauté envers nos clients, partenaires, employés.',
    },
    {
        icon: Sparkles,
        title: 'Innovation',
        desc: "Transformer le présent et penser l'avenir.",
    },
];

const NAV_ITEMS = [
    { id: 'presentation', label: 'Présentation', icon: Building2 },
    { id: 'mission', label: 'Mission', icon: Target },
    { id: 'vision', label: 'Vision', icon: Compass },
    { id: 'valeurs', label: 'Valeurs', icon: ShieldCheck },
];

export default function Index() {
    return (
        <>
            <Head title="À Propos" />

            <PageHero eyebrow="À Propos" icon={Building2} title="OMYA Capital" description="Redéfinir l’investissement en Afrique Centrale." />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {/* In-page nav */}
                <div className="flex flex-wrap justify-center gap-2 mb-20 bg-white p-2 rounded-2xl border border-slate-100 shadow-md shadow-slate-900/5 max-w-3xl mx-auto sticky top-24 lg:top-32 z-30">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-[#0B4F71] hover:bg-[#F6FAFC] transition-colors duration-300"
                            >
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </a>
                        );
                    })}
                </div>

                <div className="max-w-5xl mx-auto space-y-24 lg:space-y-32">
                    {/* Présentation */}
                    <RevealOnScroll as="section" id="presentation" className="scroll-mt-40">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-7">Présentation</h2>
                        <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
                            OMYA Capital est un cabinet de conseil financier de référence, dédié aux opérateurs économiques privés et aux institutions d&rsquo;Afrique centrale. Nous accompagnons nos clients dans la structuration, le financement et l&rsquo;exécution de leurs projets stratégiques et dirigeons nos actions vers les acteurs à fort potentiel de croissance afin de transformer ceux-ci en champions régionaux.
                        </p>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                            OMYA Capital se positionne comme un véritable partenaire en matière de création de valeur et d&rsquo;essor économique de la sous-région.
                        </p>
                    </RevealOnScroll>

                    {/* Mission */}
                    <RevealOnScroll
                        as="section"
                        id="mission"
                        className="scroll-mt-40 bg-white border border-slate-100 rounded-2xl p-8 lg:p-14 shadow-sm shadow-slate-900/5"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#F6FAFC] border border-slate-200 flex items-center justify-center text-[#0B4F71] mb-7">
                            <Target className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-7">Mission</h2>
                        <p className="text-lg text-slate-700 leading-relaxed italic font-medium">
                            « Être acteur du progrès en Afrique. Impacter positivement notre environnement à travers nos investissements et notre expertise en agissant avec diligence et rigueur dans les meilleurs standards internationaux. »
                        </p>
                    </RevealOnScroll>

                    {/* Vision */}
                    <RevealOnScroll
                        as="section"
                        id="vision"
                        className="scroll-mt-40 bg-white border border-slate-100 rounded-2xl p-8 lg:p-14 shadow-sm shadow-slate-900/5"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#F6FAFC] border border-slate-200 flex items-center justify-center text-[#0B4F71] mb-7">
                            <Compass className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-7">Vision</h2>
                        <p className="text-lg text-slate-700 leading-relaxed italic font-medium">
                            « Devenir la plus grande société régionale d&rsquo;investissement en Afrique centrale à travers l&rsquo;accompagnement stratégique, financier des acteurs publics et privés. »
                        </p>
                    </RevealOnScroll>

                    {/* Valeurs */}
                    <section id="valeurs" className="scroll-mt-40">
                        <RevealOnScroll className="text-center mb-14">
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Nos Valeurs</h2>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
                                Ce sont ces principes qui guident nos décisions au quotidien.
                            </p>
                        </RevealOnScroll>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {VALEURS.map(({ icon: Icon, title, desc }, i) => (
                                <RevealOnScroll key={i} delay={staggerDelay(i)}>
                                    <div className="group bg-white border border-slate-100 hover:border-[#0B4F71]/25 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1">
                                        <div className="w-11 h-11 rounded-xl bg-[#F6FAFC] border border-slate-200 flex items-center justify-center text-[#0B4F71] mb-5 transition-colors duration-500 group-hover:bg-[#0B4F71] group-hover:text-white">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-base font-extrabold text-slate-900 mb-2">{title}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </section>
                </div>

                {/* CTA Bottom */}
                <RevealOnScroll className="text-center mt-24">
                    <Link
                        href={route('contact')}
                        className="group inline-flex items-center gap-2 bg-[#0B4F71] hover:bg-[#093D58] text-white font-extrabold text-xs py-4 px-8 rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <span>Prendre contact avec nos équipes</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </RevealOnScroll>
            </div>
        </>
    );
}

Index.layout = (page) => <PublicLayout>{page}</PublicLayout>;
