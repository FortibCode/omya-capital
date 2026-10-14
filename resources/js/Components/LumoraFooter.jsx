import React from 'react';
import { Link } from '@inertiajs/react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import { useLanguage, SERVICE_SLUG_ORDER } from '@/Context/LanguageContext';
import SocialLinks, { hasSocialLinks } from '@/Components/SocialLinks';
import RevealOnScroll from '@/Components/RevealOnScroll';
import {
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_EMAIL_HREF,
    COMPANY_MAP_LINK,
    COMPANY_PHONE,
    COMPANY_PHONE_HREF,
} from '@/Constants/company';

/** One entry in the navigation column. */
function FooterLink({ href, children }) {
    return (
        <li>
            <Link
                href={href}
                className="inline-block text-slate-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
            >
                {children}
            </Link>
        </li>
    );
}

export default function LumoraFooter() {
    const { t } = useLanguage();

    // Every page the footer points at is a real route, declared in web.php.
    const navLinks = [
        { href: route('home'), label: t.nav.home },
        { href: route('about'), label: t.nav.about },
        { href: route('services.index'), label: t.nav.services },
        { href: route('team'), label: t.nav.team },
        { href: route('partners'), label: t.nav.partners },
        { href: route('news.index'), label: t.nav.news },
        { href: route('documents.index'), label: t.nav.documents },
        { href: route('contact'), label: t.nav.contact },
    ];

    return (
        <footer className="relative bg-[#0B1F33] text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 lg:pt-20 pb-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">

                    {/* ── The firm ── */}
                    <RevealOnScroll direction="up" delay={0.1} duration={1} className="lg:col-span-4">
                        {/* The white-on-transparent logo needs no plate behind
                            it on this navy, unlike the dark variant. */}
                        <img
                            src="/images/omya-capital-light.png"
                            alt="OMYA CAPITAL"
                            className="h-11 sm:h-12 w-auto select-none object-contain"
                        />
                        <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#F97316]">
                            {t.tagline}
                        </p>
                        <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-sm">
                            {t.footer.description}
                        </p>
                    </RevealOnScroll>

                    {/* ── Navigation ── */}
                    <RevealOnScroll direction="up" delay={0.25} duration={1} className="lg:col-span-2">
                        <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
                            {t.footer.navTitle}
                        </h4>
                        <ul className="mt-5 space-y-3 text-sm">
                            {navLinks.map((link) => (
                                <FooterLink key={link.href} href={link.href}>
                                    {link.label}
                                </FooterLink>
                            ))}
                        </ul>
                    </RevealOnScroll>

                    {/* ── Services ── */}
                    <RevealOnScroll direction="up" delay={0.4} duration={1} className="lg:col-span-3">
                        <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
                            {t.footer.servicesTitle}
                        </h4>
                        <ul className="mt-5 space-y-3 text-sm">
                            {SERVICE_SLUG_ORDER.map((slug) => (
                                <FooterLink key={slug} href={`/services#${slug}`}>
                                    {t.servicesContent[slug]?.title}
                                </FooterLink>
                            ))}
                        </ul>
                    </RevealOnScroll>

                    {/* ── Contact ── */}
                    <RevealOnScroll direction="up" delay={0.55} duration={1} className="lg:col-span-3">
                        <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
                            {t.footer.contactTitle}
                        </h4>

                        <ul className="mt-5 space-y-4 text-sm text-slate-300">
                            <li>
                                <a href={COMPANY_PHONE_HREF} className="flex items-start gap-3 hover:text-white transition-colors duration-200">
                                    <PhoneCall className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                                    <span>{COMPANY_PHONE}</span>
                                </a>
                            </li>
                            <li>
                                <a href={COMPANY_EMAIL_HREF} className="flex items-start gap-3 hover:text-white transition-colors duration-200 break-all">
                                    <Mail className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                                    <span>{COMPANY_EMAIL}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={COMPANY_MAP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 hover:text-white transition-colors duration-200"
                                >
                                    <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{COMPANY_ADDRESS}</span>
                                </a>
                            </li>
                        </ul>

                        {/* Shown only once at least one profile address is
                            filled in, so the footer never carries icons that
                            lead nowhere. */}
                        {hasSocialLinks && (
                            <div className="mt-7 pt-6 border-t border-white/10">
                                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                                    {t.footer.followTitle}
                                </span>
                                <div className="mt-3">
                                    <SocialLinks tone="dark" />
                                </div>
                            </div>
                        )}
                    </RevealOnScroll>

                </div>

                {/* ── Bottom bar ── */}
                <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                    <p>© {new Date().getFullYear()} OMYA CAPITAL. {t.footer.copyright}</p>
                    <a href={COMPANY_EMAIL_HREF} className="hover:text-white transition-colors duration-200">
                        {COMPANY_EMAIL}
                    </a>
                </div>

            </div>
        </footer>
    );
}
