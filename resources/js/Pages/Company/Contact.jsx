import React, { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import RevealOnScroll from '@/Components/RevealOnScroll';
import { useLanguage, translateService } from '@/Context/LanguageContext';
import { PhoneCall, Mail, MapPin, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import {
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_EMAIL_HREF,
    COMPANY_MAP_LINK,
    COMPANY_PHONE,
    COMPANY_PHONE_HREF,
} from '@/Constants/company';

/** The dot-and-rule step marker at the top of the panel. */
function Steps({ step }) {
    return (
        <div aria-hidden="true" className="flex items-center gap-4 mb-9">
            {[1, 2].map((n) => (
                <React.Fragment key={n}>
                    {n === 2 && <span className="flex-1 h-px bg-white/25" />}
                    <span
                        className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                            step >= n
                                ? 'bg-white text-[#14161A] border-white'
                                : 'border-white/40 text-white/60'
                        }`}
                    >
                        {n}
                    </span>
                </React.Fragment>
            ))}
        </div>
    );
}

export default function Contact({ services = [] }) {
    const { t, lang } = useLanguage();
    const { flash } = usePage().props;
    const [step, setStep] = useState(1);

    // The subjects are the firm's actual services, read from the same table the
    // services page and the footer read, plus a catch-all. Nothing here is
    // invented, and adding a service in the database adds it to this list.
    const subjects = [
        ...services.map((service) => translateService(service, lang).title),
        t.contact.subjectOther,
    ];

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
            onSuccess: () => {
                reset();
                setStep(1);
            },
        });
    };

    const field =
        'w-full bg-white/5 border border-white/20 text-white text-sm sm:text-base p-3.5 transition-colors duration-300 focus:bg-white/10 focus:border-white focus:outline-none placeholder:text-white/40';

    const details = [
        { icon: PhoneCall, label: t.contact.phoneLabel, value: COMPANY_PHONE, href: COMPANY_PHONE_HREF },
        { icon: Mail, label: t.contact.emailLabel, value: COMPANY_EMAIL, href: COMPANY_EMAIL_HREF },
        { icon: MapPin, label: t.contact.addressLabel, value: COMPANY_ADDRESS, href: COMPANY_MAP_LINK, external: true },
    ];

    return (
        <>
            <Head title={t.nav.contact} />

            <div className="relative text-white">
                {/* Fixed rather than tiled: the page is taller than one screen,
                    so a `cover` background on the element itself would blow the
                    photograph up several times its size. */}
                <div
                    aria-hidden="true"
                    className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: "url('/images/bg-contact-omya.jpg')" }}
                />
                {/* Lighter than on the other pages: this photograph is already
                    dark — its brightest pixel is 123/255 — so half the veil is
                    enough for the title beside the panel, and the facade stays
                    plainly visible instead of being washed out. */}
                <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#0A0A0C]/50 pointer-events-none" />

                {/* The header is fixed and there is no hero to sit under it, so
                    the title clears it by hand: the bar ends at 114px on phones
                    and 104px from sm up. */}
                <div className="relative z-10 max-w-[1250px] mx-auto px-5 sm:px-8 pt-[150px] lg:pt-[176px] pb-20 lg:pb-28">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

                        {/* ── What the firm is and how to reach it ── */}
                        <RevealOnScroll direction="up" delay={0.1} duration={0.9} className="lg:col-span-5 lg:pt-6">
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                                {t.contact.heroTitle}
                            </h1>
                            <p className="mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-lg">
                                {t.contact.heroDescription}
                            </p>

                            {/* The real details, from the one place the footer
                                and the location block also read them. */}
                            <ul className="mt-10 space-y-6">
                                {details.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                            className="group flex items-start gap-4 focus-visible:outline-none"
                                        >
                                            <item.icon className="w-5 h-5 mt-1 shrink-0 text-white/70 transition-colors duration-300 group-hover:text-white" />
                                            <span>
                                                <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-white/55">
                                                    {item.label}
                                                </span>
                                                <span className="block mt-1 text-sm sm:text-base text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                                                    {item.value}
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </RevealOnScroll>

                        {/* ── The form, in two steps ── */}
                        <RevealOnScroll direction="up" delay={0.25} duration={0.9} className="lg:col-span-7">
                            <div className="bg-[#14161A]/95 shadow-2xl shadow-black/50 px-6 py-9 sm:px-10 sm:py-11">
                                {flash?.success ? (
                                    <div className="py-10 text-center">
                                        <CheckCircle2 className="w-12 h-12 mx-auto text-white" strokeWidth={1.5} />
                                        <p className="mt-5 text-lg font-bold text-white">{t.contact.successTitle}</p>
                                        <p className="mt-2 text-sm sm:text-base text-white/75">{flash.success}</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} noValidate>
                                        <Steps step={step} />

                                        {step === 1 ? (
                                            <fieldset>
                                                <legend className="text-lg sm:text-xl font-bold text-white mb-6">
                                                    {t.contact.step1Title}
                                                </legend>

                                                <div className="space-y-1">
                                                    {subjects.map((subject) => (
                                                        <label
                                                            key={subject}
                                                            className="flex items-center gap-3 py-3 cursor-pointer group"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="subject"
                                                                value={subject}
                                                                checked={data.subject === subject}
                                                                onChange={(e) => setData('subject', e.target.value)}
                                                                className="w-4 h-4 shrink-0 accent-white cursor-pointer"
                                                            />
                                                            <span className="text-sm sm:text-base text-white/85 group-hover:text-white transition-colors duration-200">
                                                                {subject}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>

                                                <div className="mt-9 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(2)}
                                                        style={{ '--pill-ink': '#14161A' }}
                                                        className="pill-ghost group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/60 bg-transparent text-white text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                                    >
                                                        <span>{t.contact.nextBtn}</span>
                                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </button>
                                                </div>
                                            </fieldset>
                                        ) : (
                                            <div>
                                                <p className="text-lg sm:text-xl font-bold text-white mb-6">
                                                    {t.contact.step2Title}
                                                </p>

                                                <div className="grid sm:grid-cols-2 gap-5">
                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-[0.18em] text-white/60 mb-2">
                                                            {t.contact.nameLabel}
                                                        </label>
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            placeholder={t.contact.namePlaceholder}
                                                            className={field}
                                                            required
                                                        />
                                                        {errors.name && <p className="mt-2 text-xs text-[#FCA5A5]">{errors.name}</p>}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-[0.18em] text-white/60 mb-2">
                                                            {t.contact.emailFieldLabel}
                                                        </label>
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            value={data.email}
                                                            onChange={(e) => setData('email', e.target.value)}
                                                            placeholder={t.contact.emailPlaceholder}
                                                            className={field}
                                                            required
                                                        />
                                                        {errors.email && <p className="mt-2 text-xs text-[#FCA5A5]">{errors.email}</p>}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="phone" className="block text-xs font-extrabold uppercase tracking-[0.18em] text-white/60 mb-2">
                                                            {t.contact.phoneFieldLabel}
                                                        </label>
                                                        <input
                                                            id="phone"
                                                            type="tel"
                                                            value={data.phone}
                                                            onChange={(e) => setData('phone', e.target.value)}
                                                            placeholder={t.contact.phonePlaceholder}
                                                            className={field}
                                                        />
                                                        {errors.phone && <p className="mt-2 text-xs text-[#FCA5A5]">{errors.phone}</p>}
                                                    </div>

                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-[0.18em] text-white/60 mb-2">
                                                            {t.contact.messageLabel}
                                                        </label>
                                                        <textarea
                                                            id="message"
                                                            rows={5}
                                                            value={data.message}
                                                            onChange={(e) => setData('message', e.target.value)}
                                                            placeholder={t.contact.messagePlaceholder}
                                                            className={`${field} resize-y`}
                                                            required
                                                        />
                                                        {errors.message && <p className="mt-2 text-xs text-[#FCA5A5]">{errors.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(1)}
                                                        className="group inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/75 hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:underline"
                                                    >
                                                        <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                                                        <span>{t.contact.backBtn}</span>
                                                    </button>

                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        style={{ '--pill-ink': '#14161A' }}
                                                        className="pill-ghost group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/60 bg-transparent text-white text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                                    >
                                                        <span>{processing ? t.contact.sendingBtn : t.contact.sendBtn}</span>
                                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </div>
        </>
    );
}

Contact.layout = (page) => <PublicLayout>{page}</PublicLayout>;
