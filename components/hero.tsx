"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link2, FileText, X, AlertCircle, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_CHARS = 300000;

type InputMode = "link" | "text";

interface HeroProps {
    onAnalyze: (content: string, type: "url" | "text") => void;
    error?: string | null;
}

export function Hero({ onAnalyze, error }: HeroProps) {
    const [mode, setMode] = useState<InputMode>("link");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [showVideo, setShowVideo] = useState(false);

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
        <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 lg:pt-32 pb-20 text-center bg-white">

            {/* Circuit Board - Light Pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
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

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                        Don't just click <br className="hidden md:block" />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-900">
                                'I Agree'.
                            </span>
                            {/* Underline Decoration */}
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
                        SafeAgree scans Terms of Service in seconds, finding the traps you'd otherwise miss.
                    </p>

                    {/* Search Component with Mode Toggle */}
                    <div className="max-w-xl mx-auto w-full">
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
                        <div className="flex justify-center mb-6">
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
                                        "relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors",
                                        mode === "link" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    <Link2 className="w-4 h-4" />
                                    Link
                                </button>
                                <button
                                    onClick={() => setMode("text")}
                                    className={cn(
                                        "relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors",
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
                            className="relative bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 p-2"
                        >
                            <AnimatePresence mode="wait">
                                {mode === "link" ? (
                                    <motion.div
                                        key="link-input"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://example.com/terms"
                                            className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 px-4 h-12 text-base font-medium min-w-0" // Added min-w-0 for flex child
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
                                                className="p-2 text-slate-400 hover:text-slate-600 transition-colors mr-2 shrink-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}

                                        {/* Analyze Button */}
                                        <Button
                                            onClick={handleSubmit}
                                            className="bg-[#FDE047] text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#fcd34d] shadow-sm transition-transform active:scale-95 h-auto border-none shrink-0"
                                        >
                                            Analyze
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="text-input"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col"
                                    >
                                        <div className="relative">
                                            <textarea
                                                value={text}
                                                onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                                                placeholder="Paste up to 50,000 words... Terms of Service, Privacy Policy, or any contract text here..."
                                                rows={4} // Default to 4 rows for mobile
                                                className="w-full bg-slate-50/50 rounded-xl p-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-colors resize-none mb-2 md:h-auto min-h-[120px] md:min-h-[160px]" // Responsive height
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
                                        <div className="flex items-center justify-between px-1">
                                            {/* Character Counter */}
                                            <span className={cn(
                                                "text-xs font-mono font-medium transition-colors ml-2",
                                                charPercentage > 90 ? "text-red-500" :
                                                    charPercentage > 75 ? "text-orange-500" :
                                                        "text-slate-400"
                                            )}>
                                                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                                            </span>

                                            {/* Analyze Button */}
                                            <Button
                                                onClick={handleSubmit}
                                                className="bg-[#FDE047] text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#fcd34d] shadow-sm transition-transform active:scale-95 h-auto border-none"
                                            >
                                                Analyze
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setShowVideo(true)}
                            className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
                        >
                            <PlayCircle className="w-5 h-5 text-slate-400 group-hover:text-[#FDE047] group-hover:fill-slate-900 transition-all" />
                            <span>See how it works</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowVideo(false)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Video Iframe (Placeholder) */}
                            <video
                                width="100%"
                                height="100%"
                                controls
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src="/video/preview.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
}
