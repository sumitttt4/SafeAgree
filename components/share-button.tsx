"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Check, Link as LinkIcon, Linkedin, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LZString from "lz-string";

// X (Twitter) Logo SVG Component
function XIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

interface ShareButtonProps {
    result: {
        score: number;
        summary?: string;
        redFlags: Array<{ title: string; description: string; severity?: string }>;
        greenFlags: Array<{ title: string; description: string }>;
        grayFlags: Array<{ title: string; value: string }>;
    };
}

export function ShareButton({ result }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const generateLongUrl = () => {
        // Remove heavy fullText if present
        const cleanResult = { ...result };
        // @ts-ignore
        delete cleanResult.fullText;

        const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(cleanResult));
        return `${window.location.origin}/share?data=${compressed}`;
    };

    const getShortUrl = async () => {
        if (shortUrl) return shortUrl;

        setLoading(true);
        try {
            const longUrl = generateLongUrl();
            const res = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: longUrl })
            });

            if (res.ok) {
                const data = await res.json();
                setShortUrl(data.shortUrl);
                return data.shortUrl;
            } else {
                return longUrl; // Fallback
            }
        } catch (e) {
            console.error(e);
            return generateLongUrl(); // Fallback
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            const url = await getShortUrl();
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            if (!loading) setIsOpen(false);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleSocialShare = async (platform: 'twitter' | 'linkedin' | 'whatsapp') => {
        const url = await getShortUrl();
        const text = `I just analyzed a contract with SafeAgree and it got a score of ${result.score}/100! Check it out:`;

        let shareLink = '';
        switch (platform) {
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareLink = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
        }

        window.open(shareLink, '_blank', 'width=600,height=400');
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-9 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm shadow-sm font-medium"
            >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-1 z-50 origin-top-right"
                    >
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => handleSocialShare('twitter')}
                                disabled={loading}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left disabled:opacity-50"
                            >
                                <XIcon className="h-4 w-4" />
                                {loading ? "Shortening..." : "X (Twitter)"}
                            </button>
                            <button
                                onClick={() => handleSocialShare('linkedin')}
                                disabled={loading}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left disabled:opacity-50"
                            >
                                <Linkedin className="h-4 w-4" />
                                LinkedIn
                            </button>
                            <button
                                onClick={() => handleSocialShare('whatsapp')}
                                disabled={loading}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left disabled:opacity-50"
                            >
                                <MessageCircle className="h-4 w-4" />
                                WhatsApp
                            </button>
                            <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                            <button
                                onClick={handleCopy}
                                disabled={loading}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left disabled:opacity-50"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <LinkIcon className="h-4 w-4" />}
                                {loading ? "Creating..." : (copied ? "Copied!" : "Copy Link")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
