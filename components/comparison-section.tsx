"use client";

import { motion } from "framer-motion";
import { X, Check, FileText, Zap, AlertTriangle, Shield } from "lucide-react";

export function ComparisonSection() {
    return (
        <section className="py-24 relative overflow-hidden">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

                    {/* The Old Way */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative group"
                    >
                        <div className="h-full rounded-3xl border-2 border-red-100 dark:border-red-900/30 bg-gradient-to-br from-red-50 to-orange-50/50 dark:from-red-950/30 dark:to-orange-950/20 p-8 md:p-10 transition-all duration-300 hover:border-red-200 dark:hover:border-red-800/50 hover:shadow-xl hover:shadow-red-100/50 dark:hover:shadow-red-900/20">

                            {/* Icon */}
                            <div className="mb-6">
                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/30 flex items-center justify-center border border-red-200/50 dark:border-red-800/30">
                                    <FileText className="h-7 w-7 text-red-500 dark:text-red-400" />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                The Old Way
                            </h3>
                            <p className="text-red-600/80 dark:text-red-400/80 font-medium mb-8">
                                What you're doing right now.
                            </p>

                            {/* List */}
                            <ul className="space-y-4">
                                {[
                                    "Scrolling through 50 pages of dense legal jargon",
                                    "Missing hidden clauses about your data",
                                    "Clicking 'Agree' with zero confidence",
                                    "Getting trapped in difficult cancellation loops"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * i }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-1 shrink-0">
                                            <X className="h-5 w-5 text-red-500" />
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Decorative */}
                            <div className="absolute top-4 right-4 opacity-10 dark:opacity-5">
                                <AlertTriangle className="h-24 w-24 text-red-500" />
                            </div>
                        </div>
                    </motion.div>

                    {/* The SafeAgree Way */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="relative group"
                    >
                        <div className="h-full rounded-3xl border-2 border-green-100 dark:border-green-900/30 bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-950/30 dark:to-emerald-950/20 p-8 md:p-10 transition-all duration-300 hover:border-green-200 dark:hover:border-green-800/50 hover:shadow-xl hover:shadow-green-100/50 dark:hover:shadow-green-900/20">

                            {/* Icon */}
                            <div className="mb-6">
                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                                    <Zap className="h-7 w-7 text-white" />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                The SafeAgree Way
                            </h3>
                            <p className="text-green-600 dark:text-green-400 font-bold mb-8">
                                Smart, fast, and protective.
                            </p>

                            {/* List */}
                            <ul className="space-y-4">
                                {[
                                    "Instant breakdown of key risks",
                                    "Plain English summaries (no law degree needed)",
                                    "Trust Scores for quick decision making",
                                    "Know exactly what you're signing up for"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * i + 0.15 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-0.5 shrink-0">
                                            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shadow-sm shadow-green-500/30">
                                                <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                            </div>
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Decorative */}
                            <div className="absolute top-4 right-4 opacity-10 dark:opacity-5">
                                <Shield className="h-24 w-24 text-green-500" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
