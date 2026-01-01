"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import LZString from "lz-string";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AnalysisResult {
    score: number;
    summary?: string;
    redFlags: Array<{ title: string; description: string; severity?: string }>;
    greenFlags: Array<{ title: string; description: string }>;
    grayFlags: Array<{ title: string; value: string }>;
}

function ShareContent() {
    const searchParams = useSearchParams();
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const data = searchParams.get("data");
        if (data) {
            try {
                const decompressed = LZString.decompressFromEncodedURIComponent(data);
                if (decompressed) {
                    setResult(JSON.parse(decompressed));
                } else {
                    setError("Invalid share link");
                }
            } catch {
                setError("Could not load shared analysis");
            }
        } else {
            setError("No data in share link");
        }
    }, [searchParams]);

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

    if (error) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <Shield className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto" />
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{error}</h1>
                    <p className="text-slate-500 dark:text-slate-400">This share link may be invalid or expired.</p>
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        <ArrowLeft className="w-4 h-4" /> Go to SafeAgree
                    </Link>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
                <div className="animate-pulse text-slate-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to SafeAgree</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <img src="/logo-new.png" alt="SafeAgree" className="h-8 w-auto" />
                        <span className="font-bold text-slate-900 dark:text-white">SafeAgree</span>
                    </div>
                </div>

                {/* Shared badge */}
                <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-100 dark:border-blue-900">
                        <Shield className="w-3 h-3" /> Shared Analysis
                    </span>
                </div>

                {/* Score Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                        "rounded-2xl border p-6 bg-gradient-to-br shadow-sm",
                        getScoreBg(result.score)
                    )}
                >
                    <div className="flex items-center gap-6">
                        <div className={cn("text-6xl font-bold tabular-nums", getScoreColor(result.score))}>
                            {result.score}
                        </div>
                        <div>
                            <div className={cn("text-2xl font-bold", getScoreColor(result.score))}>
                                {getScoreLabel(result.score)}
                            </div>
                            {result.summary && (
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">{result.summary}</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Flags Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Red Flags */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-red-100 dark:border-red-900/50">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <span className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                                Risks ({result.redFlags.length})
                            </span>
                        </div>
                        {result.redFlags.map((flag, i) => (
                            <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/50">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{flag.title}</span>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{flag.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Green Flags */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-green-100 dark:border-green-900/50">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                                Positives ({result.greenFlags.length})
                            </span>
                        </div>
                        {result.greenFlags.map((flag, i) => (
                            <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-green-100 dark:border-green-900/50">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{flag.title}</span>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{flag.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gray Flags */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                            <div className="h-2 w-2 rounded-full bg-slate-400" />
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                Info ({result.grayFlags.length})
                            </span>
                        </div>
                        {result.grayFlags.map((flag, i) => (
                            <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400 flex items-center gap-2">
                                        <Info className="h-3 w-3" />
                                        {flag.title}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{flag.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        Analysis powered by AI • This is not legal advice
                    </p>
                    <Link href="/" className="mt-2 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Try SafeAgree for free →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function SharePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
                <div className="animate-pulse text-slate-400">Loading...</div>
            </div>
        }>
            <ShareContent />
        </Suspense>
    );
}
