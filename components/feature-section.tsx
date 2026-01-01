"use client";

import { motion } from "framer-motion";
import { Link2, Scan, Shield, Lock, Zap, FileText } from "lucide-react";

const features = [
    {
        icon: Link2,
        label: "Easy Input",
        title: "Just paste any URL or text",
        description: "No signup. No hassle. Paste a Terms of Service URL or copy-paste any legal text directly.",
        color: "blue",
        mockup: "input"
    },
    {
        icon: Scan,
        label: "AI Analysis",
        title: "Deep scan in seconds",
        description: "Our AI reads every clause, finding hidden risks, unfair terms, and data practices.",
        color: "purple",
        mockup: "scan"
    },
    {
        icon: Shield,
        label: "Trust Score",
        title: "Clear Safe/Risky rating",
        description: "Get an instant trust score with color-coded flags so you know exactly what you're agreeing to.",
        color: "green",
        mockup: "score"
    },
    {
        icon: Lock,
        label: "Privacy First",
        title: "We never store your data",
        description: "Your documents are analyzed in real-time and never saved. Zero data retention policy.",
        color: "teal",
        mockup: "privacy"
    }
];

const colorClasses = {
    blue: {
        icon: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
        label: "text-blue-500 dark:text-blue-400",
        card: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-800"
    },
    purple: {
        icon: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400",
        label: "text-purple-500 dark:text-purple-400",
        card: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-800"
    },
    green: {
        icon: "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
        label: "text-green-500 dark:text-green-400",
        card: "bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-900/50 hover:border-green-300 dark:hover:border-green-800"
    },
    teal: {
        icon: "bg-teal-500/10 text-teal-500 dark:bg-teal-500/20 dark:text-teal-400",
        label: "text-teal-500 dark:text-teal-400",
        card: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900/50 hover:border-teal-300 dark:hover:border-teal-800"
    }
};

// Mockup Components
function InputMockupNew() {
    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2 text-xs text-slate-400 dark:text-slate-500 font-mono truncate">
                        https://example.com/terms
                    </div>
                    <div className="bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg text-xs font-bold">
                        Analyze
                    </div>
                </div>
            </div>
            <div className="mt-3 flex gap-2 justify-center">
                <div className="h-1.5 w-8 rounded-full bg-blue-500/40" />
                <div className="h-1.5 w-8 rounded-full bg-slate-300 dark:bg-slate-600" />
                <div className="h-1.5 w-8 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>
        </div>
    );
}

function ScanMockupNew() {
    return (
        <div className="w-full max-w-sm mx-auto space-y-2">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0.3, scaleX: 0.8 }}
                    animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="h-3 bg-gradient-to-r from-purple-500/30 via-purple-500/60 to-purple-500/30 dark:from-purple-400/30 dark:via-purple-400/60 dark:to-purple-400/30 rounded-full"
                />
            ))}
            <div className="pt-2 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-purple-500 dark:text-purple-400 animate-pulse" />
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Scanning clauses...</span>
            </div>
        </div>
    );
}

function ScoreMockupNew() {
    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                <svg className="w-20 h-20 -rotate-90">
                    <circle cx="40" cy="40" r="36" fill="none" strokeWidth="6" className="stroke-slate-200 dark:stroke-slate-700" />
                    <motion.circle
                        cx="40" cy="40" r="36" fill="none" strokeWidth="6"
                        className="stroke-green-500"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 0.82 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ strokeDasharray: "226", strokeDashoffset: "0" }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">82</span>
                </div>
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">2 Risks</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">5 Positives</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">3 Info</span>
                </div>
            </div>
        </div>
    );
}

function PrivacyMockupNew() {
    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl"
                />
                <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-2xl shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export function FeatureSection() {
    return (
        <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden scroll-mt-24">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-14 md:mb-20 text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight"
                    >
                        How it works.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
                    >
                        Advanced AI analysis in a simple, privacy-focused package.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {features.map((feature, index) => {
                        const colors = colorClasses[feature.color as keyof typeof colorClasses];
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className={`relative h-full overflow-hidden rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:shadow-lg ${colors.card}`}>
                                    {/* Content */}
                                    <div className="space-y-4">
                                        {/* Icon + Label */}
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${colors.icon}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className={`text-sm font-semibold ${colors.label}`}>
                                                {feature.label}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Mockup */}
                                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        {feature.mockup === "input" && <InputMockupNew />}
                                        {feature.mockup === "scan" && <ScanMockupNew />}
                                        {feature.mockup === "score" && <ScoreMockupNew />}
                                        {feature.mockup === "privacy" && <PrivacyMockupNew />}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
