"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link2, FileText, X, PlayCircle, Upload } from "lucide-react";
import { useState, useRef, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_CHARS = 300000;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

type InputMode = "link" | "text" | "file";

interface HeroProps {
    onAnalyze: (content: string | File, type: "url" | "text" | "file") => void;
    error?: string | null;
}

export function Hero({ onAnalyze, error }: HeroProps) {
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
        <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 lg:pt-32 pb-20 text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
                        Don't just click <br className="hidden md:block" />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-100 dark:to-slate-300">
                                'I Agree'.
                            </span>
                            {/* Underline Decoration */}
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
                        SafeAgree scans Terms of Service in seconds, finding the traps you'd otherwise miss.
                    </p>

                    {/* Search Component with Mode Toggle */}
                    <div className="max-w-xl mx-auto w-full">
                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-center"
                            >
                                <p className="text-slate-800 dark:text-slate-200 font-semibold mb-1">
                                    Service is temporarily busy.
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    Please try using <span className="font-medium text-slate-700 dark:text-slate-300">Text mode</span>: copy and paste content directly.
                                </p>
                            </motion.div>
                        )}

                        {/* Mode Toggle */}
                        <div className="flex justify-center mb-6">
                            <div className="relative inline-flex bg-slate-100 dark:bg-slate-800 rounded-full p-1">
                                {/* Animated Background Pill */}
                                <motion.div
                                    className="absolute top-1 bottom-1 rounded-full bg-[#FDE047] shadow-sm"
                                    initial={false}
                                    animate={{
                                        left: mode === "link" ? "4px" : mode === "text" ? "33.33%" : "66.66%",
                                        right: mode === "link" ? "66.66%" : mode === "text" ? "33.33%" : "4px",
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />

                                <button
                                    onClick={() => setMode("link")}
                                    className={cn(
                                        "relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors",
                                        mode === "link" ? "text-slate-900" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                    )}
                                >
                                    <Link2 className="w-4 h-4" />
                                    Link
                                </button>
                                <button
                                    onClick={() => setMode("text")}
                                    className={cn(
                                        "relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors",
                                        mode === "text" ? "text-slate-900" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                    )}
                                >
                                    <FileText className="w-4 h-4" />
                                    Text
                                </button>
                                <button
                                    onClick={() => setMode("file")}
                                    className={cn(
                                        "relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors",
                                        mode === "file" ? "text-slate-900" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                    )}
                                >
                                    <Upload className="w-4 h-4" />
                                    PDF
                                </button>
                            </div>
                        </div>

                        {/* Input Container */}
                        <motion.div
                            layout
                            className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40 p-1.5 sm:p-2"
                        >
                            <AnimatePresence mode="wait">
                                {mode === "link" ? (
                                    <motion.div
                                        key="link-input"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center gap-1 sm:gap-0"
                                    >
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://example.com/terms"
                                            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 sm:px-4 h-10 sm:h-12 text-sm sm:text-base font-medium min-w-0"
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
                                                className="p-1.5 sm:p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors shrink-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}

                                        {/* Analyze Button */}
                                        <Button
                                            onClick={handleSubmit}
                                            className="bg-[#FDE047] text-slate-900 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#fcd34d] shadow-sm transition-transform active:scale-95 h-auto border-none shrink-0"
                                        >
                                            Analyze
                                        </Button>
                                    </motion.div>
                                ) : mode === "text" ? (
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
                                                rows={4}
                                                className="w-full bg-slate-50/50 dark:bg-slate-800/50 rounded-xl p-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 transition-colors resize-none mb-2 md:h-auto min-h-[120px] md:min-h-[160px]"
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
                                                    className="absolute top-3 right-3 p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors bg-white dark:bg-slate-700 rounded-full shadow-sm border border-slate-100 dark:border-slate-600"
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
                                ) : (
                                    <motion.div
                                        key="file-input"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col"
                                    >
                                        <div
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={cn(
                                                "relative rounded-xl p-8 text-center cursor-pointer transition-all border-2 border-dashed",
                                                isDragging
                                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                                                    : file
                                                        ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                                                        : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-slate-50/50 dark:bg-slate-800/50"
                                            )}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                            {file ? (
                                                <div className="flex flex-col items-center gap-2">
                                                    <FileText className="w-10 h-10 text-green-500" />
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{file.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                                        className="mt-2 text-xs text-red-500 hover:text-red-600 font-medium"
                                                    >
                                                        Remove file
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2">
                                                    <Upload className={cn("w-10 h-10", isDragging ? "text-blue-500" : "text-slate-400 dark:text-slate-500")} />
                                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                        Drop your PDF here or <span className="text-blue-600 dark:text-blue-400">browse</span>
                                                    </p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500">Max 10MB</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Analyze Button */}
                                        <div className="flex justify-end mt-2">
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={!file}
                                                className="bg-[#FDE047] text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#fcd34d] shadow-sm transition-transform active:scale-95 h-auto border-none disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Analyze PDF
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
                            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
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

                            {/* Video */}
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
