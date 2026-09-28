import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage, SERVICE_SLUG_ORDER } from '@/Context/LanguageContext';

export default function ProjectModal({ isOpen, onClose }) {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate smooth network submission
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 800);
    };

    const handleReset = () => {
        setSubmitted(false);
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-md"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-xl bg-[#0f172a] text-white border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl z-10"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                            aria-label="Fermer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {submitted ? (
                            <div className="py-12 text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-[#0B4F71]/30 text-[#38bdf8] flex items-center justify-center mx-auto mb-2 border border-[#38bdf8]/30">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Demande reçue</h3>
                                <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                                    Merci de nous avoir contactés. L'équipe d'OMYA Capital étudiera votre demande et vous recontactera sous 24 heures ouvrées.
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="mt-6 px-8 py-3 bg-white text-[#0f172a] font-bold text-sm rounded-xl hover:bg-white/90 transition-all"
                                >
                                    Fermer
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-8">
                                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#38bdf8]">
                                        Démarrer un projet
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                                        Parlez-nous de vos objectifs.
                                    </h2>
                                    <p className="text-xs sm:text-sm text-white/60 mt-2">
                                        Nous répondons sous 1 jour ouvré avec une approche personnalisée.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-white/70 mb-1">
                                                Nom complet *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                placeholder="Glade NTOLANY"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-white/70 mb-1">
                                                Téléphone
                                            </label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                placeholder="+242 05 000 0000"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-white/70 mb-1">
                                            Adresse Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="jean@entreprise.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-white/70 mb-1">
                                            Domaine d'intervention
                                        </label>
                                        <select
                                            value={form.service}
                                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                                            className="w-full bg-[#1e293b] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
                                        >
                                            <option value="">Sélectionner un service</option>
                                            {SERVICE_SLUG_ORDER.map((slug) => (
                                                <option key={slug} value={slug}>
                                                    {t.servicesContent[slug]?.title}
                                                </option>
                                            ))}
                                            <option value="autre">Autre demande</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-white/70 mb-1">
                                            Message / Description du projet *
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            placeholder="Décrivez brièvement les enjeux ou l'opération souhaitée..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-[#0B4F71] hover:bg-[#093D58] text-white font-extrabold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#0B4F71]/30 disabled:opacity-60"
                                    >
                                        <span>{loading ? 'Envoi en cours...' : 'Envoyer la demande'}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
