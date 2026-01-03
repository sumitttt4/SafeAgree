"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { FeatureSection } from "@/components/feature-section";
import { Dashboard } from "@/components/dashboard";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PricingSection } from "@/components/pricing-section";
import { Loader2 } from "lucide-react";

interface AnalysisResult {
    score: number;
    summary: string;
    redFlags: Array<{
        title: string;
        description: string;
        severity: string;
    }>;
    greenFlags: Array<{
        title: string;
        description: string;
    }>;
    grayFlags: Array<{
        title: string;
        value: string;
    }>;
}

export default function Home() {
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
                // Handle file upload with FormData
                const formData = new FormData();
                formData.append("file", content);
                formData.append("type", "file");

                response = await fetch("/api/analyze", {
                    method: "POST",
                    body: formData,
                });
            } else {
                // Handle URL/text with JSON
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
            const errorMessage = err instanceof Error ? err.message : "Something went wrong";

            // Sanitize raw API errors (like 429 Rate Limit)
            if (errorMessage.includes("429") || errorMessage.includes("Rate limit") || errorMessage.includes("{")) {
                setError("Service is temporarily busy. We will be back shortly.");
            } else {
                setError(errorMessage);
            }
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
        <div className="min-h-screen bg-[#faf9f6] dark:bg-[#0a0a0a] relative">
            {/* Paper Texture - Light Mode Only */}
            <div
                className="absolute inset-0 z-0 pointer-events-none dark:hidden"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
                        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
                        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
                    `,
                    backgroundSize: "8px 8px, 32px 32px, 32px 32px",
                }}
            />

            {/* Dark Dot Matrix - Dark Mode Only */}
            <div
                className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
                        radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
                    `,
                    backgroundSize: "10px 10px",
                }}
            />

            <div className="relative z-10">
                {!showDashboard && <Navbar onReset={handleReset} />}
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
                                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Analyzing document...</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">This may take a few seconds</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {!showDashboard ? (
                        <motion.div
                            key="landing"
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Hero onAnalyze={handleAnalyze} error={error} isAnalyzing={isAnalyzing} />
                            <FeatureSection />

                            <PricingSection />
                            <Footer />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Dashboard onReset={handleReset} result={analysisResult} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Fixed "Made by Sumit" Badge - Bottom Right Corner */}
            <a
                href="https://sumitsharmaa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] sm:text-xs font-medium text-slate-700 dark:text-slate-300">Made by Sumit</span>
            </a>
        </div >
    );
}
