import React, { useRef, useEffect } from 'react';
import { gsap } from '@/Utils/gsapSetup';
import { MapPin } from 'lucide-react';
import { COMPANY_ADDRESS_SHORT, COMPANY_MAP_EMBED } from '@/Constants/company';

export default function LumoraLocation() {
    const sectionRef = useRef(null);
    const mapEmbedUrl = COMPANY_MAP_EMBED;

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Section header badge
            const badge = section.querySelector('[data-loc-badge]');
            if (badge) {
                gsap.fromTo(
                    badge,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.85,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            // Map iframe — clip reveal from bottom
            const mapWrap = section.querySelector('[data-loc-map]');
            if (mapWrap) {
                gsap.fromTo(
                    mapWrap,
                    { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' },
                    {
                        opacity: 1,
                        y: 0,
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1.2,
                        delay: 0.25,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full relative bg-[#f8f9fa] border-t border-b border-black/10 overflow-hidden">
            {/* Optional mini header bar */}
            <div
                data-loc-badge
                className="w-full px-6 sm:px-12 lg:px-20 py-5 flex items-center gap-3"
                style={{ opacity: 0 }}
            >
                <MapPin className="w-4 h-4 text-[#0B4F71]" />
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0B2A45]">
                    {COMPANY_ADDRESS_SHORT}
                </span>
                <div className="h-px bg-black/10 flex-1" />
            </div>

            <div
                data-loc-map
                className="w-full h-[450px] sm:h-[520px] lg:h-[600px] relative bg-gray-100"
                style={{ opacity: 0 }}
            >
                <iframe
                    title="Localisation OMYA Capital Brazzaville"
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                />
            </div>
        </section>
    );
}
