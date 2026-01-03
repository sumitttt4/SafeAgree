"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link2, FileText, X, PlayCircle, Upload, CheckCircle2, Zap, ChevronRight, Loader2 } from "lucide-react";
import { useState, useRef, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_CHARS = 300000;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

type InputMode = "link" | "text" | "file";

interface HeroProps {
    onAnalyze: (content: string | File, type: "url" | "text" | "file") => void;
    error?: string | null;
    isAnalyzing?: boolean;
}

export function Hero({ onAnalyze, error, isAnalyzing }: HeroProps) {
    const [mode, setMode] = useState<InputMode>("link");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const charCount = text.length;
    const charPercentage = (charCount / MAX_CHARS) * 100;

    const handleClear = () => {
        if (mode === "link") {
            setUrl("");
        } else if (mode === "text") {
            setText("");
        } else {
            setFile(null);
        }
    };

    const handleSubmit = () => {
        if (mode === "link") {
            onAnalyze(url, "url");
        } else if (mode === "text") {
            onAnalyze(text, "text");
        } else if (file) {
            onAnalyze(file, "file");
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            if (droppedFile.size <= MAX_FILE_SIZE) {
                setFile(droppedFile);
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            if (selectedFile.size <= MAX_FILE_SIZE) {
                setFile(selectedFile);
            }
        }
    };

    return (
        <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center pt-20 pb-20 text-center bg-transparent">
            {/* Subtle Mesh Background (Optional - can be removed if using global bg) */}
            <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >

                    {/* Pill Badge */}
                    <a href="https://chromewebstore.google.com/" target="_blank" className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/50 p-1 pr-3 hover:bg-orange-100 transition-colors cursor-pointer group">
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ff7b29] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            <Zap className="w-3 h-3 fill-current" /> New
                        </span>
                        <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                            SafeAgree Browser Extension
                            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                    </a>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                        Don't just click <span className="text-[#ff7b29]"> 'I Agree'.</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
                        SafeAgree scans Terms of Service in seconds, finding the traps you'd otherwise miss. No bloated legal jargon.
                    </p>

                    {/* Input Container - Clean Shadow Box */}
                    <div className="w-full max-w-2xl relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-2 flex items-center transition-all focus-within:ring-2 focus-within:ring-orange-500/20">

                            {/* Mode Select (Subtle) */}
                            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mr-2 shrink-0">
                                <button onClick={() => setMode('link')} className={cn("p-2 rounded-lg transition-all", mode === 'link' ? "bg-white dark:bg-slate-700 shadow-sm text-[#ff7b29]" : "text-slate-400 hover:text-slate-600")}>
                                    <Link2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => setMode('text')} className={cn("p-2 rounded-lg transition-all", mode === 'text' ? "bg-white dark:bg-slate-700 shadow-sm text-[#ff7b29]" : "text-slate-400 hover:text-slate-600")}>
                                    <FileText className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Input Field */}
                            {mode === 'link' ? (
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    placeholder="Paste URL (e.g., terms of service)..."
                                    className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 h-10 text-sm sm:text-base w-full min-w-0"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={text} // Using input instead of textarea for one-line clean look, user can paste 
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    placeholder="Paste text snippet here..."
                                    className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 h-10 text-sm sm:text-base w-full min-w-0"
                                />
                            )}

                            {/* Action Button */}
                            <Button
                                onClick={handleSubmit}
                                className="bg-[#ff7b29] hover:bg-[#e66a1f] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 shrink-0 h-auto transition-transform active:scale-95"
                            >
                                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Scan Now"}
                            </Button>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> 12+ Risk Detectors
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Instant Results
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Free Forever Tier
                        </div>
                    </div>

                </motion.div>
            </div>
        </section >
    );
}
