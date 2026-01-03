"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero"; // Hero contains the Input Logic
import { Dashboard } from "@/components/dashboard"; // Dashboard handles the Results
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AnalysisResult {
    score: number;
    summary: string;
    redFlags: Array<{ title: string; description: string; severity: string }>;
    greenFlags: Array<{ title: string; description: string }>;
    grayFlags: Array<{ title: string; value: string }>;
}

export default function DashboardPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (content: string | File, type: "url" | "text" | "file") => {
        if (type !== "file" && typeof content === "string" && !content.trim()) {
            setError("Please enter a URL or paste some text.");
            return;
        }
        if (type === "file" && !(content instanceof File)) {
            setError("Please select a PDF file.");
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            let response;
            if (type === "file" && content instanceof File) {
                const formData = new FormData();
                formData.append("file", content);
                formData.append("type", "file");
                response = await fetch("/api/analyze", { method: "POST", body: formData });
            } else {
                response = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content, type }),
                });
            }

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Analysis failed");
            }

            const result = await response.json();
            setAnalysisResult(result);
            setShowDashboard(true);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setShowDashboard(false);
        setAnalysisResult(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] dark:bg-[#0a0a0a] relative flex flex-col">
            <Navbar onReset={handleReset} />

            {/* Loading Overlay */}
            <AnimatePresence>
                {isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
                            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Analyzing...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-1 container mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    {!showDashboard ? (
                        <motion.div
                            key="scanner"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-4xl mx-auto pt-10"
                        >
                            <div className="mb-10 text-center">
                                <h1 className="text-3xl font-bold dark:text-white mb-2">Analysis Dashboard</h1>
                                <p className="text-slate-500">Analyze contracts, check history, and secure your signatures.</p>
                            </div>
                            {/* Re-using Hero as the Input Component */}
                            <Hero onAnalyze={handleAnalyze} error={error} isAnalyzing={isAnalyzing} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Dashboard onReset={handleReset} result={analysisResult} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="text-center py-6 text-xs text-slate-400">
                © {new Date().getFullYear()} SafeAgree. All rights reserved.
            </footer>
        </div>
    );
}
