"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { FeatureSection } from "@/components/feature-section";
import { Dashboard } from "@/components/dashboard";
import { ComparisonSection } from "@/components/comparison-section";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
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
        <div className="min-h-screen bg-white dark:bg-slate-950 relative">
            {/* Diagonal Stripes Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, #f3f4f6 2px, #f3f4f6 4px)",
                }}
            />
            {/* Dark mode stripes */}
            <div
                className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
                style={{
                    backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(30,41,59,0.5) 2px, rgba(30,41,59,0.5) 4px)",
                }}
            />

            <div className="relative z-10">
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
                            <Hero onAnalyze={handleAnalyze} error={error} />
                            <FeatureSection />
                            <ComparisonSection />
                            <Footer />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Spacer for fixed navbar */}
                            <div className="pt-24" />
                            <Dashboard onReset={handleReset} result={analysisResult} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
