"use client";

import { motion } from "framer-motion";
import { X, Check, FileText, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComparisonSection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 dark:from-slate-900 via-white dark:via-slate-950 to-white dark:to-slate-950 -z-10" />

            <div className="container px-4 md:px-6 mx-auto">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Why the old way <span className="text-red-500 line-through decoration-4 decoration-red-500/30">sucks</span>.
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                        Stop pretending you read the Terms of Service. We fixed it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* The Hard Way - Vintage Paper Style */}
                    <motion.div
                        initial={{ opacity: 0, x: -20, rotate: -1 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-3xl border border-stone-200 dark:border-stone-700 bg-[#FDFBF7] dark:bg-slate-900 p-8 md:p-12 space-y-8 relative overflow-hidden shadow-md group transform transition-transform hover:rotate-0"
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper.png')] pointer-events-none" />

                        <div className="space-y-4 relative z-10">
                            <div className="h-12 w-12 bg-stone-200/50 dark:bg-stone-700/50 rounded-xl flex items-center justify-center mb-4">
                                <FileText className="h-6 w-6 text-stone-500 dark:text-stone-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-200 font-serif">The Old Way</h3>
                            <p className="text-stone-500 dark:text-stone-400 font-medium">What you're doing right now.</p>
                        </div>

                        <ul className="space-y-5 relative z-10">
                            {[
                                "Scrolling through 50 pages of dense legal jargon",
                                "Missing hidden clauses about your data",
                                "Clicking 'Agree' with zero confidence",
                                "Getting trapped in difficult cancellation loops"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-stone-600/90 dark:text-stone-400 font-medium">
                                    <X className="h-5 w-5 text-red-500/80 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* The SafeAgree Way - Glass Tech Style */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="rounded-3xl border border-blue-100 dark:border-blue-900/50 bg-white dark:bg-slate-900 p-8 md:p-12 space-y-8 relative overflow-hidden shadow-2xl shadow-blue-900/10 dark:shadow-blue-500/5 ring-1 ring-blue-500/5 dark:ring-blue-400/10"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-blue-50 dark:from-blue-950 to-transparent rounded-bl-full -z-10 opacity-50" />

                        <div className="space-y-4">
                            <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The SafeAgree Way</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-bold tracking-tight">Smart, fast, and protective.</p>
                        </div>

                        <ul className="space-y-5">
                            {[
                                "Instant breakdown of key risks",
                                "Plain English summaries (no law degree needed)",
                                "Trust Scores for quick decision making",
                                "Know exactly what you're signing up for"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-700 dark:text-slate-300 font-semibold">
                                    <div className="bg-green-500 rounded-full p-1 text-white shrink-0 shadow-sm mt-0.5">
                                        <Check className="h-3 w-3" />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}
