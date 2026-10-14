import { useEffect, useRef } from 'react';

/**
 * LiquidCursor
 * Renders a full-page <canvas> that paints a glowing OMYA-branded brush trail
 * following the cursor. No images — pure radial gradient strokes.
 *
 * Props:
 *   color      — accent color in rgb() or hex, default OMYA blue  '#0B4F71'
 *   brushRadius — px radius of each brush stamp, default 90
 *   opacity     — peak opacity of the brush at center, default 0.18
 *   decay       — how fast each stamp fades per frame (0–1), default 0.018
 */
export default function LiquidCursor({
    color = '#011F31',
    brushRadius = 90,
    opacity = 0.18,
    decay = 0.018,
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Honor prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const dpr = Math.min(devicePixelRatio, 2);

        let w = 0, h = 0;
        let points = [];
        let last = null;
        let idle = 0;
        let rafId = null;
        let running = true;

        // Parse the color into rgb components
        const tmp = document.createElement('div');
        tmp.style.color = color;
        document.body.appendChild(tmp);
        const computed = getComputedStyle(tmp).color; // 'rgb(r, g, b)'
        document.body.removeChild(tmp);
        const [r, g, b] = (computed.match(/\d+/g) || [11, 79, 113]).map(Number);

        function resize() {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.scale(dpr, dpr);
        }

        function stamp(x, y) {
            const radius = brushRadius;
            const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            grad.addColorStop(0, `rgba(${r},${g},${b},${opacity})`);
            grad.addColorStop(0.4, `rgba(${r},${g},${b},${opacity * 0.65})`);
            grad.addColorStop(0.75, `rgba(${r},${g},${b},${opacity * 0.2})`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        function tick() {
            if (!running) return;

            const hasPoints = points.length > 0;

            if (hasPoints) {
                idle = 0;
            } else {
                idle++;
                if (idle > 120) {
                    ctx.clearRect(0, 0, w, h);
                    idle = 0;
                    rafId = requestAnimationFrame(tick);
                    return;
                }
            }

            // Fade existing paint
            const fadeFactor = hasPoints ? decay : Math.min(decay + idle * 0.004, 0.5);
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = `rgba(0,0,0,${fadeFactor})`;
            ctx.fillRect(0, 0, w, h);

            // Stamp new points
            if (hasPoints) {
                const batch = points.splice(0, points.length);
                for (const [px, py] of batch) {
                    stamp(px, py);
                }
            }

            rafId = requestAnimationFrame(tick);
        }

        function onPointerMove(e) {
            const x = e.clientX;
            const y = e.clientY;

            if (last) {
                const dx = x - last[0];
                const dy = y - last[1];
                const dist = Math.sqrt(dx * dx + dy * dy);
                const step = Math.max(brushRadius * 0.3, 1);
                const n = Math.min(Math.ceil(dist / step), 60);
                for (let i = 0; i <= n; i++) {
                    const t = i / Math.max(n, 1);
                    points.push([last[0] + dx * t, last[1] + dy * t]);
                }
            } else {
                points.push([x, y]);
            }

            last = [x, y];
        }

        function onPointerLeave() {
            last = null;
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerleave', onPointerLeave);
        rafId = requestAnimationFrame(tick);

        return () => {
            running = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerleave', onPointerLeave);
        };
    }, [color, brushRadius, opacity, decay]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9998,
                pointerEvents: 'none',
                mixBlendMode: 'multiply',
            }}
        />
    );
}
