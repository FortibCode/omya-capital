import React from 'react';
import { motion } from 'framer-motion';

/**
 * MotionCarCard:
 * Adds a continuous smooth back-and-forth movement (va-et-vient) to cards,
 * complete with interactive spinning wheels at the bottom to give the dynamic 
 * appearance of a futuristic luxury vehicle/pod cruising smoothly on a track.
 */
export default function MotionCarCard({ children, index = 0, className = '' }) {
    const isEven = index % 2 === 0;
    // Vary duration and range based on index for natural wave effect across cards
    const duration = 3.8 + (index % 3) * 0.7;
    const xDistance = isEven ? 16 : -16;

    return (
        <div className="relative py-4 px-2">
            <motion.div
                animate={{
                    x: [0, xDistance, 0, -xDistance, 0],
                    y: [0, -5, 0, 5, 0],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className={`group relative z-10 transition-all duration-300 ${className}`}
            >
                {children}

                {/* ── Chassis / Car Wheels Accent at bottom ── */}
                <div className="absolute -bottom-3 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
                    {/* Left Wheel */}
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: isEven ? [0, 360] : [360, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="w-6 h-6 rounded-full border-2 border-[#0B4F71] bg-[#0B1F33] flex items-center justify-center shadow-lg shadow-[#0B4F71]/40 group-hover:scale-125 transition-transform duration-300"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            {/* Wheel spokes */}
                            <div className="absolute inset-0 border border-dashed border-white/60 rounded-full" />
                        </motion.div>
                    </div>

                    {/* Laser track / suspension line */}
                    <div className="h-0.5 flex-1 mx-3 bg-gradient-to-r from-[#0B4F71]/30 via-[#0B4F71] to-[#0B4F71]/30 rounded-full shadow-sm group-hover:via-white transition-colors duration-300" />

                    {/* Right Wheel */}
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: isEven ? [0, 360] : [360, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="w-6 h-6 rounded-full border-2 border-[#0B4F71] bg-[#0B1F33] flex items-center justify-center shadow-lg shadow-[#0B4F71]/40 group-hover:scale-125 transition-transform duration-300"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            {/* Wheel spokes */}
                            <div className="absolute inset-0 border border-dashed border-white/60 rounded-full" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Glowing shadow track underneath the car */}
            <motion.div
                animate={{
                    scaleX: [0.9, 1.1, 0.9],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="w-4/5 mx-auto h-2 bg-[#0B4F71]/20 blur-md rounded-full -mt-2"
            />
        </div>
    );
}
