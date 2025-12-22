"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link2, FileText, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_CHARS = 15000;

type InputMode = "link" | "text";

interface HeroProps {
    onAnalyze: (content: string, type: "url" | "text") => void;
    error?: string | null;
}

export function Hero({ onAnalyze, error }: HeroProps) {
    const [mode, setMode] = useState<InputMode>("link");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");

    const charCount = text.length;
    const charPercentage = (charCount / MAX_CHARS) * 100;

    const handleClear = () => {
        if (mode === "link") {
            setUrl("");
        } else {
            setText("");
        }
    };

    const handleSubmit = () => {
        if (mode === "link") {
            onAnalyze(url, "url");
        } else {
            onAnalyze(text, "text");
        }
    };

    return (
        <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-32 pb-32 text-center bg-white">

            {/* Circuit Board - Light Pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
                        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
                        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
                        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
                    `,
                    backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
                }}
            />

            <div className="container relative z-10 px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto max-w-5xl space-y-12"
                >

                    {/* Headline */}
                    <h1 className="mx-auto max-w-4xl text-6xl font-extrabold tracking-tighter text-slate-900 md:text-7xl lg:text-8xl leading-[0.9]">
                        Don't just click <br className="hidden md:block" />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-900">
                                'I Agree'.
                            </span>
                            {/* Underline Decoration */}
                            <svg className="absolute -bottom-4 left-0 w-full h-4 text-green-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-500 font-medium leading-relaxed tracking-tight">
                        SafeAgree scans Terms of Service in seconds,<br className="hidden md:block" /> finding the traps you'd otherwise miss.
                    </p>

                    {/* Search Component with Mode Toggle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mx-auto mt-12 max-w-2xl"
                    >
                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 flex items-center gap-2 justify-center text-red-600 text-sm font-medium"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </motion.div>
                        )}

                        {/* Mode Toggle */}
                        <div className="flex justify-center mb-4">
                            <div className="relative inline-flex bg-slate-100 rounded-full p-1">
                                {/* Animated Background Pill */}
                                <motion.div
                                    className="absolute top-1 bottom-1 rounded-full bg-[#FDE047] shadow-sm"
                                    initial={false}
                                    animate={{
                                        left: mode === "link" ? "4px" : "50%",
                                        right: mode === "link" ? "50%" : "4px",
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />

                                <button
                                    onClick={() => setMode("link")}
                                    className={cn(
                                        "relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                                        mode === "link" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    <Link2 className="w-4 h-4" />
                                    Link
                                </button>
                                <button
                                    onClick={() => setMode("text")}
                                    className={cn(
                                        "relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                                        mode === "text" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    <FileText className="w-4 h-4" />
                                    Text
                                </button>
                            </div>
                        </div>

                        {/* Input Container */}
                        <motion.div
                            layout
                            className="relative rounded-2xl border border-slate-200 bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5 focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-300 transition-all overflow-hidden"
                        >
                            <AnimatePresence mode="wait">
                                {mode === "link" ? (
                                    <motion.div
                                        key="link-input"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center p-2 pl-5"
                                    >
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://example.com/terms"
                                            className="flex-1 bg-transparent py-4 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSubmit();
                                                }
                                            }}
                                        />

                                        {/* Clear Button */}
                                        {url && (
                                            <button
                                                onClick={handleClear}
                                                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}

                                        {/* Analyze Button - Glass Style */}
                                        <Button
                                            size="lg"
                                            onClick={handleSubmit}
                                            className="h-12 rounded-xl px-8 font-semibold bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            Analyze
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="text-input"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col"
                                    >
                                        <div className="relative">
                                            <textarea
                                                value={text}
                                                onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                                                placeholder="Paste your Terms of Service, Privacy Policy, or any contract text here..."
                                                rows={8}
                                                className="w-full bg-transparent p-5 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                                        handleSubmit();
                                                    }
                                                }}
                                            />

                                            {/* Clear Button (Floating) */}
                                            {text && (
                                                <button
                                                    onClick={handleClear}
                                                    className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full shadow-sm border border-slate-100"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Bottom Bar */}
                                        <div className="flex items-center justify-between p-3 pt-0 border-t border-slate-100 mt-2">
                                            {/* Character Counter */}
                                            <span className={cn(
                                                "text-xs font-mono font-medium transition-colors",
                                                charPercentage > 90 ? "text-red-500" :
                                                    charPercentage > 75 ? "text-orange-500" :
                                                        "text-slate-400"
                                            )}>
                                                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                                            </span>

                                            {/* Analyze Button - Glass Style */}
                                            <Button
                                                size="lg"
                                                onClick={handleSubmit}
                                                className="h-11 rounded-xl px-8 font-semibold bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                                            >
                                                Analyze
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="mt-6 flex justify-center gap-8 opacity-60 grayscale transition-opacity hover:opacity-100 hover:grayscale-0">
                            <span className="text-sm font-bold text-slate-400">FREE TO USE</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
