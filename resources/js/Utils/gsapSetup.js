import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Configure default GSAP settings for institutional smoothness
    gsap.defaults({
        ease: 'power3.out',
        duration: 1.1,
    });

    // Optional: Refresh ScrollTrigger on window resize / orientation change
    ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
    });
}

export { gsap, ScrollTrigger };
