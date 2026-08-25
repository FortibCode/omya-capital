import React from 'react';
import { motion } from 'framer-motion';
import { Camera, User, ArrowUpRight } from 'lucide-react';

const IconLinkedIn = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

/**
 * TeamCard:
 * Premium Executive Portrait Card for OMYA Capital Leadership Team.
 * Elegant, corporate, clean typography, 3D elevation on hover.
 */
export default function TeamCard({ member, className = '' }) {
    const photoUrl = member.photo_path
        ? member.photo_path.startsWith('/')
            ? member.photo_path
            : member.photo_path.startsWith('images/')
            ? `/${member.photo_path}`
            : `/storage/${member.photo_path}`
        : null;

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative bg-white border border-[#0B4F71]/15 rounded-2xl overflow-hidden shadow-lg shadow-[#0B1F33]/5 hover:shadow-2xl hover:shadow-[#0B4F71]/20 transition-all duration-500 flex flex-col ${className}`}
        >
            {/* Portrait Container */}
            <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-[#0B1F33] via-[#0B2A45] to-[#0B4F71] overflow-hidden">
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/30">
                        <User className="w-12 h-12 stroke-[1.5]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Photo indisponible</span>
                    </div>
                )}

                {/* Subtle gradient overlay at bottom of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#0B1F33]/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        OMYA CAPITAL
                    </span>
                </div>
            </div>

            {/* Content Details Box */}
            <div className="p-5 bg-white flex-1 flex flex-col justify-between relative z-10">
                <div>
                    <h3 className="text-base font-black text-[#0B1F33] leading-snug group-hover:text-[#0B4F71] transition-colors duration-300">
                        {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#0B4F71] mt-1 tracking-wide">
                        {member.role_title}
                    </p>
                </div>

                {/* Bottom accent line */}
                <div className="mt-4 pt-3 border-t border-[#0B4F71]/10 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[#0B2A45]/50 uppercase tracking-widest">
                        Membre de Direction
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#F0F6FA] group-hover:bg-[#0B4F71] text-[#0B4F71] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                        <IconLinkedIn className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>

            {/* Bottom glowing line on hover */}
            <div className="h-1 bg-gradient-to-r from-[#0B1F33] via-[#0B4F71] to-[#0B2A45] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.div>
    );
}
