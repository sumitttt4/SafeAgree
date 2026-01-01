"use client";

import { useState } from "react";
import { Share2, Check, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LZString from "lz-string";

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
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            // Compress the result data
            const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(result));
            const shareUrl = `${window.location.origin}/share?data=${compressed}`;

            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="h-9 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm shadow-sm font-medium"
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 dark:text-green-400">Copied!</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="share"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}
