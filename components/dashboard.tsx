"use client";

import { motion } from "framer-motion";
import {
    AlertTriangle,
    CheckCircle2,
    Info,
    RotateCcw,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShareButton } from "@/components/share-button";
import { ExportButton } from "@/components/export-button";
import { ChatInterface, ChatButton } from "@/components/chat-interface";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

interface AnalysisResult {
    score: number;
    summary?: string;
    redFlags: Array<{
        title: string;
        description: string;
        severity?: string;
    }>;
    greenFlags: Array<{
        title: string;
        description: string;
    }>;
    grayFlags: Array<{
        title: string;
        value: string;
    }>;
    fullText?: string;
}

interface DashboardProps {
    onReset: () => void;
    result?: AnalysisResult | null;
}

// Animation variants for staggered entry
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24
        }
    }
};

// Fallback mock data
const mockResult: AnalysisResult = {
    score: 68,
    summary: "This document contains several concerning clauses that warrant attention.",
    redFlags: [
        { title: "Data Sale & Sharing", description: "Explicitly states they may share data with third-party advertisers.", severity: "high" },
        { title: "Forced Arbitration", description: "You waive your right to a trial by jury or to join a class action lawsuit.", severity: "high" },
        { title: "License in Perpetuity", description: "They own a worldwide, royalty-free license to use your content forever.", severity: "medium" },
        { title: "Modification Without Notice", description: "Terms can be changed at any time without notifying users.", severity: "medium" },
    ],
    greenFlags: [
        { title: "Easy Deletion", description: "Account deletion is automated and takes less than 3 clicks." },
        { title: "GDPR Compliant", description: "Full data portability and right-to-be-forgotten are respected." },
        { title: "Refund Policy", description: "30-day no-questions-asked refund for premium." },
    ],
    grayFlags: [
        { title: "Jurisdiction", value: "California, US" },
        { title: "Age Requirement", value: "13+" },
        { title: "Notice Period", value: "30 Days" },
        { title: "Last Updated", value: "Dec 2024" },
    ]
};

export function Dashboard({ onReset, result }: DashboardProps) {
    const [showChat, setShowChat] = useState(false);
    const data = result || mockResult;

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600 dark:text-green-400";
        if (score >= 60) return "text-amber-500 dark:text-amber-400";
        return "text-red-600 dark:text-red-400";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return "Safe";
        if (score >= 60) return "Caution";
        return "Risky";
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return "from-green-50 to-green-100/50 border-green-200 dark:from-green-950/50 dark:to-green-900/30 dark:border-green-800";
        if (score >= 60) return "from-amber-50 to-amber-100/50 border-amber-200 dark:from-amber-950/50 dark:to-amber-900/30 dark:border-amber-800";
        return "from-red-50 to-red-100/50 border-red-200 dark:from-red-950/50 dark:to-red-900/30 dark:border-red-800";
    };

    return (
        <div className="min-h-screen bg-transparent">
            <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">

                {/* Header Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <img src="/logo-new.png" alt="SafeAgree" className="h-12 w-auto" />
                        <span className="text-xl font-bold text-slate-900 dark:text-white">SafeAgree</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {data && <ShareButton result={data} />}
                        {data && <ExportButton result={data} />}
                        <Button
                            variant="outline"
                            onClick={onReset}
                            className="h-9 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors gap-2 text-sm shadow-sm"
                        >
                            <RotateCcw className="h-4 w-4" /> New Analysis
                        </Button>
                    </div>
                </motion.div>

                {/* Score Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                        "rounded-2xl border p-6 bg-gradient-to-br shadow-sm",
                        getScoreBg(data.score)
                    )}
                >
                    <div className="flex items-center gap-6">
                        <div className="flex-1">
                            <div className="flex items-baseline gap-4">
                                <span className={cn("text-6xl font-bold tabular-nums", getScoreColor(data.score))}>
                                    {data.score}
                                </span>
                                <span className={cn("text-2xl font-bold", getScoreColor(data.score))}>
                                    {getScoreLabel(data.score)}
                                </span>
                            </div>
                            {data.summary && (
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl text-balance leading-relaxed">
                                    {data.summary}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Tri-Column Feed */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* RED COLUMN */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-red-100">
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
                            <span className="text-sm font-bold text-red-600 uppercase tracking-wider">
                                Risks ({data.redFlags.length})
                            </span>
                        </div>
                        <motion.div
                            className="space-y-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {data.redFlags.map((flag, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="group flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/50 hover:border-red-200 dark:hover:border-red-800 hover:shadow-sm transition-all cursor-default"
                                >
                                    <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">{flag.title}</span>
                                            {flag.severity === "high" && (
                                                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-600">
                                                    High
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{flag.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {data.redFlags.length === 0 && (
                                <div className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">No risks found</div>
                            )}
                        </motion.div>
                    </div>

                    {/* GREEN COLUMN */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-green-100">
                            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
                            <span className="text-sm font-bold text-green-600 uppercase tracking-wider">
                                Positives ({data.greenFlags.length})
                            </span>
                        </div>
                        <motion.div
                            className="space-y-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {data.greenFlags.map((flag, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="group flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-green-100 dark:border-green-900/50 hover:border-green-200 dark:hover:border-green-800 hover:shadow-sm transition-all cursor-default"
                                >
                                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white truncate block">{flag.title}</span>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{flag.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {data.greenFlags.length === 0 && (
                                <div className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">No positives found</div>
                            )}
                        </motion.div>
                    </div>

                    {/* GRAY COLUMN */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                            <div className="h-2 w-2 rounded-full bg-slate-400" />
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                Info ({data.grayFlags.length})
                            </span>
                        </div>
                        <motion.div
                            className="space-y-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {data.grayFlags.map((flag, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-sm transition-all cursor-default"
                                >
                                    <span className="text-xs font-medium text-slate-400 flex items-center gap-2">
                                        <Info className="h-3 w-3" />
                                        {flag.title}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{flag.value}</span>
                                </motion.div>
                            ))}
                            {data.grayFlags.length === 0 && (
                                <div className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">No info found</div>
                            )}
                        </motion.div>
                    </div>

                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-8 border-t border-slate-200 dark:border-slate-700 text-center"
                >
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        Analysis powered by AI • This is not legal advice
                    </p>
                </motion.div>

                {/* Chat Interface */}
                <AnimatePresence>
                    {showChat && (
                        <ChatInterface
                            onClose={() => setShowChat(false)}
                            context={
                                data.fullText
                                || JSON.stringify({
                                    summary: data.summary,
                                    risks: data.redFlags,
                                    positives: data.greenFlags
                                })
                            }
                        />
                    )}
                </AnimatePresence>
            </div>
            {!showChat && (
                <ChatButton onClick={() => setShowChat(true)} />
            )}
        </div>
    );
}
