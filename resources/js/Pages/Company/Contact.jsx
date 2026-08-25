import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PageHero from '@/Components/PageHero';
import RevealOnScroll, { staggerDelay } from '@/Components/RevealOnScroll';
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
        'w-full bg-[#F8FAFC] border border-[#0B4F71]/15 text-[#0B1F33] text-sm rounded-xl p-3 transition-all duration-300 focus:bg-white focus:border-[#0B4F71] focus:ring-2 focus:ring-[#0B4F71]/20 focus:outline-none placeholder:text-[#0B2A45]/30';

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
                eyebrow={t.contact.heroEyebrow}
                icon={PhoneCall}
                title={t.contact.heroTitle}
                description={t.contact.heroDescription}
            />

            {/* Coordonnées — fond blanc */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {coordonnees.map((item, idx) => (
                            <RevealOnScroll key={item.title} delay={staggerDelay(idx, 0.1)}>
                                <div className="group h-full bg-gradient-to-br from-[#F0F6FA] to-white border border-[#0B4F71]/10 hover:border-[#0B4F71]/30 rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0B4F71]/10 relative overflow-hidden">
                                    <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#0B4F71]/5 group-hover:bg-[#0B4F71]/10 transition-colors duration-500 pointer-events-none" />
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B2A45] to-[#0B4F71] flex items-center justify-center mx-auto mb-5 text-white transition-transform duration-500 group-hover:scale-110 shadow-md shadow-[#0B4F71]/25">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-base font-extrabold text-[#0B1F33] mb-3">{item.title}</h3>
                                    <p className="text-sm text-[#0B2A45]/65 font-medium">{item.value}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Formulaire */}
                        <RevealOnScroll direction="right">
                            <div className="relative overflow-hidden bg-white rounded-3xl border border-[#0B4F71]/10 shadow-xl shadow-[#0B1F33]/8">
                                <div className="relative z-10 p-8 lg:p-10">
                                    <h2 className="text-2xl font-extrabold text-[#0B1F33] mb-2">{t.contact.formTitle}</h2>
                                    <p className="text-xs text-[#0B2A45]/55 mb-8">{t.contact.formSubtitle}</p>

                                    {flash?.success ? (
                                        <div className="text-center py-10 space-y-4">
                                            <CheckCircle2 className="w-14 h-14 text-[#0B4F71] mx-auto" />
                                            <h3 className="text-xl font-extrabold text-[#0B1F33]">{t.contact.successTitle}</h3>
                                            <p className="text-sm text-[#0B2A45]/55">{flash.success}</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-[#0B2A45]/70 mb-1.5">{t.contact.nameLabel}</label>
                                                    <input type="text" required value={data.name} onChange={(e) => setData('name', e.target.value)} className={inputClass} placeholder={t.contact.namePlaceholder} />
                                                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-[#0B2A45]/70 mb-1.5">{t.contact.phoneFieldLabel}</label>
                                                    <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className={inputClass} placeholder={t.contact.phonePlaceholder} />
                                                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-[#0B2A45]/70 mb-1.5">{t.contact.emailFieldLabel}</label>
                                                <input type="email" required value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputClass} placeholder={t.contact.emailPlaceholder} />
                                                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-[#0B2A45]/70 mb-1.5">{t.contact.subjectLabel}</label>
                                                <select value={data.subject} onChange={(e) => setData('subject', e.target.value)} className={inputClass}>
                                                    <option value="">{t.contact.subjectPlaceholder}</option>
                                                    {SERVICE_SLUG_ORDER.map((slug) => (
                                                        <option key={slug}>{t.servicesContent[slug].title}</option>
                                                    ))}
                                                    <option>{t.contact.subjectOther}</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-[#0B2A45]/70 mb-1.5">{t.contact.messageLabel}</label>
                                                <textarea
                                                    required
                                                    rows={5}
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    className={`${inputClass} resize-none`}
                                                    placeholder={t.contact.messagePlaceholder}
                                                />
                                                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="group w-full inline-flex items-center justify-center gap-2 bg-[#0B4F71] hover:bg-[#093D58] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-[#0B4F71]/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
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
                        <RevealOnScroll direction="left" delay={0.15}>
                            <div className="bg-gradient-to-br from-[#F0F6FA] to-white border border-[#0B4F71]/10 rounded-2xl p-8 space-y-4 hover:border-[#0B4F71]/25 transition-colors duration-300">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2A45] to-[#0B4F71] flex items-center justify-center text-white">
                                        <Share2 className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base font-extrabold text-[#0B1F33]">{t.contact.socialTitle}</h3>
                                </div>
                                <p className="text-xs text-[#0B2A45]/45 italic">{t.contact.socialText}</p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>
        </>
    );
}

Contact.layout = (page) => <PublicLayout>{page}</PublicLayout>;
