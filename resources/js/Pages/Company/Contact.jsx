import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import { PhoneCall, Mail, MapPin, Share2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Contact() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const inputClass =
        'w-full bg-[#F8FAFC] border border-slate-200 text-slate-800 text-sm rounded-xl p-3 transition-colors duration-300 focus:border-[#0B4F71] focus:ring-1 focus:ring-[#0B4F71] focus:outline-none';

    return (
        <>
            <Head title="Contact" />

            <PageHero
                eyebrow="Prendre Contact"
                icon={PhoneCall}
                title="Parlons de votre Projet"
                description="Nos équipes sont disponibles pour vous écouter, analyser votre situation et vous proposer un accompagnement sur-mesure."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {/* Coordonnées */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: PhoneCall, title: 'Téléphone', value: '+242', muted: false },
                        { icon: Mail, title: 'E-mail', value: 'contact@omya-capital.com', muted: false },
                        { icon: MapPin, title: 'Siège Social', value: 'Adresse communiquée prochainement', muted: true },
                    ].map((item, idx) => (
                        <RevealOnScroll key={item.title} delay={staggerDelay(idx, 0.1)}>
                            <div
                                className={`group h-full bg-white border rounded-2xl p-8 shadow-sm text-center transition-all duration-500 hover:-translate-y-1 ${
                                    item.muted ? 'border-slate-100' : 'border-slate-100 hover:border-[#0B4F71]/25 hover:shadow-xl hover:shadow-slate-900/5'
                                }`}
                            >
                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-500 ${
                                        item.muted ? 'bg-slate-50 border border-slate-200 text-slate-400' : 'bg-[#F6FAFC] border border-slate-200 text-[#0B4F71] group-hover:bg-[#0B4F71] group-hover:text-white'
                                    }`}
                                >
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900 mb-3">{item.title}</h3>
                                <p className={`text-sm ${item.muted ? 'text-slate-400 italic' : 'text-slate-700 font-medium'}`}>{item.value}</p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Formulaire */}
                    <RevealOnScroll direction="right" className="bg-white border border-slate-100 rounded-2xl p-8 lg:p-10 shadow-sm shadow-slate-900/5">
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Envoyez-nous un message</h2>
                        <p className="text-xs text-slate-500 mb-8">Décrivez votre projet ou votre question, un conseiller vous répondra dans les meilleurs délais.</p>

                        {flash?.success ? (
                            <div className="text-center py-10 space-y-4">
                                <CheckCircle2 className="w-14 h-14 text-[#0B4F71] mx-auto" />
                                <h3 className="text-xl font-extrabold text-slate-900">Message envoyé avec succès !</h3>
                                <p className="text-sm text-slate-500">{flash.success}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Nom complet *</label>
                                        <input type="text" required value={data.name} onChange={(e) => setData('name', e.target.value)} className={inputClass} />
                                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Téléphone</label>
                                        <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className={inputClass} />
                                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Adresse e-mail *</label>
                                    <input type="email" required value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputClass} />
                                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Objet de votre demande</label>
                                    <select value={data.subject} onChange={(e) => setData('subject', e.target.value)} className={inputClass}>
                                        <option value="">— Sélectionner un sujet —</option>
                                        <option>Financement de projets</option>
                                        <option>Fusions & Acquisitions</option>
                                        <option>Restructuration</option>
                                        <option>Conseil stratégique</option>
                                        <option>Autre renseignement</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Votre message *</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className={`${inputClass} resize-none`}
                                    />
                                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group w-full inline-flex items-center justify-center gap-2 bg-[#0B4F71] hover:bg-[#093D58] disabled:opacity-60 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all duration-300"
                                >
                                    <span>{processing ? 'Envoi en cours…' : 'Envoyer mon message'}</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </form>
                        )}
                    </RevealOnScroll>

                    {/* Réseaux sociaux */}
                    <RevealOnScroll direction="left" delay={0.15} className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm shadow-slate-900/5 space-y-4">
                        <div className="flex items-center gap-2 text-[#0B4F71]">
                            <Share2 className="w-5 h-5" />
                            <h3 className="text-base font-extrabold text-slate-900">Réseaux Sociaux</h3>
                        </div>
                        <p className="text-xs text-slate-400 italic">Nos comptes officiels seront communiqués prochainement.</p>
                    </RevealOnScroll>
                </div>
            </div>
        </>
    );
}

Contact.layout = (page) => <PublicLayout>{page}</PublicLayout>;
