import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
import SocialLinks, { hasSocialLinks } from '@/Components/SocialLinks';
import { useLanguage, SERVICE_SLUG_ORDER } from '@/Context/LanguageContext';
import { PhoneCall, Mail, MapPin, Share2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Contact() {
    const { t } = useLanguage();
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
        'w-full bg-white/5 border border-white/15 text-white text-sm rounded-xl p-3.5 transition-all duration-300 focus:bg-white/10 focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]/20 focus:outline-none placeholder:text-white/40 font-medium';

    const coordonnees = [
        { icon: PhoneCall, title: t.contact.phoneLabel, value: '+242 05098 75 41' },
        { icon: Mail, title: t.contact.emailLabel, value: 'contact@omya-capital.com' },
        {
            icon: MapPin,
            title: t.contact.addressLabel,
            value: '76 avenue Amilcar Cabral, Centre-ville, Immeuble Villarecci, en face du Radisson',
        },
    ];

    return (
        <>
            <Head title={t.nav.contact} />

            <PageHero
                title={t.contact.heroTitle}
                description={t.contact.heroDescription}
            />

            {/* Coordonnées & Formulaire — fond sombre & glassmorphism */}
            <section className="relative bg-[#0B1F33] py-20 lg:py-32 overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33] via-[#0B2A45]/70 to-[#0B1F33] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {coordonnees.map((item, idx) => (
                            <RevealOnScroll key={item.title} delay={staggerDelay(idx, 0.1)}>
                                <div className="group h-full bg-white/5 border border-white/15 hover:border-[#38bdf8]/40 backdrop-blur-xl rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-1 shadow-2xl relative overflow-hidden">
                                    <div className="w-14 h-14 rounded-2xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center mx-auto mb-5 text-[#38bdf8] transition-transform duration-500 group-hover:scale-110 shadow-lg">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-base font-extrabold text-white mb-3 tracking-tight">{item.title}</h3>
                                    <p className="text-sm text-white/75 font-medium leading-relaxed">{item.value}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Formulaire */}
                        <RevealOnScroll direction="right" className="lg:col-span-7">
                            <div className="relative overflow-hidden bg-white/5 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-xl">
                                <div className="relative z-10 p-8 lg:p-12">
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">{t.contact.formTitle}</h2>
                                    <p className="text-sm text-white/60 mb-8 font-medium">{t.contact.formSubtitle}</p>

                                    {flash?.success ? (
                                        <div className="text-center py-10 space-y-4">
                                            <CheckCircle2 className="w-14 h-14 text-[#38bdf8] mx-auto" />
                                            <h3 className="text-xl font-extrabold text-white">{t.contact.successTitle}</h3>
                                            <p className="text-sm text-white/70">{flash.success}</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">{t.contact.nameLabel}</label>
                                                    <input type="text" required value={data.name} onChange={(e) => setData('name', e.target.value)} className={inputClass} placeholder={t.contact.namePlaceholder} />
                                                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">{t.contact.phoneFieldLabel}</label>
                                                    <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className={inputClass} placeholder={t.contact.phonePlaceholder} />
                                                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">{t.contact.emailFieldLabel}</label>
                                                <input type="email" required value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputClass} placeholder={t.contact.emailPlaceholder} />
                                                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">{t.contact.subjectLabel}</label>
                                                <select value={data.subject} onChange={(e) => setData('subject', e.target.value)} className={`${inputClass} bg-[#0B1F33]`}>
                                                    <option value="" className="bg-[#0B1F33] text-white">{t.contact.subjectPlaceholder}</option>
                                                    {SERVICE_SLUG_ORDER.map((slug) => (
                                                        <option key={slug} value={t.servicesContent[slug].title} className="bg-[#0B1F33] text-white">
                                                            {t.servicesContent[slug].title}
                                                        </option>
                                                    ))}
                                                    <option value={t.contact.subjectOther} className="bg-[#0B1F33] text-white">{t.contact.subjectOther}</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">{t.contact.messageLabel}</label>
                                                <textarea
                                                    required
                                                    rows={5}
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    className={`${inputClass} resize-none`}
                                                    placeholder={t.contact.messagePlaceholder}
                                                />
                                                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="group w-full inline-flex items-center justify-center gap-3 bg-white text-[#0B1F33] font-extrabold text-sm py-4 px-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 disabled:opacity-60"
                                            >
                                                <span>{processing ? t.contact.sendingBtn : t.contact.sendBtn}</span>
                                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Réseaux sociaux */}
                        <RevealOnScroll direction="left" delay={0.15} className="lg:col-span-5">
                            <div className="bg-white/5 border border-white/15 rounded-3xl p-8 lg:p-10 space-y-6 backdrop-blur-xl shadow-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
                                        <Share2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-white">{t.contact.socialTitle}</h3>
                                </div>
                                <SocialLinks tone="dark" />
                                {!hasSocialLinks && (
                                    <p className="text-sm text-white/60 italic font-medium">{t.contact.socialText}</p>
                                )}
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>
        </>
    );
}

Contact.layout = (page) => <PublicLayout>{page}</PublicLayout>;
