"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { FeatureSection } from "@/components/feature-section";
import { Dashboard } from "@/components/dashboard";
import { ComparisonSection } from "@/components/comparison-section";
import { Footer } from "@/components/footer";
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

    const handleAnalyze = async (content: string, type: "url" | "text") => {
        if (!content.trim()) {
            setError("Please enter a URL or paste some text.");
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, type }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Analysis failed");
            }

            const result = await response.json();
            setAnalysisResult(result);
            setShowDashboard(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
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
        <div className="min-h-screen bg-white">
            {/* Loading Overlay */}
            <AnimatePresence>
                {isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                            <p className="text-lg font-semibold text-slate-700">Analyzing document...</p>
                            <p className="text-sm text-slate-500">This may take a few seconds</p>
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
    );
}
