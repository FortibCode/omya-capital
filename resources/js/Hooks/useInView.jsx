import { useEffect, useState } from 'react';

/**
 * Tracks whether the referenced element is currently on screen.
 * Used to pause auto-playing carousels while they're scrolled out of view —
 * otherwise their timers keep firing layout animations during every scroll,
 * which costs frames for something nobody can see.
 */
export default function useInView(ref, { rootMargin = '200px' } = {}) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setInView(true); // no observer support: keep the previous always-on behaviour
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { rootMargin },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, rootMargin]);

    return inView;
}
