"use client";

import { motion } from "framer-motion";

export function ScanMockup() {
    return (
        <div className="relative w-full max-w-[260px] aspect-square bg-white rounded-xl shadow-lg border border-slate-100 p-4 overflow-hidden flex flex-col items-center justify-center font-sans">

            {/* Document Lines */}
            <div className="space-y-2 w-full max-w-[160px] opacity-20">
                <div className="h-2 w-full bg-slate-400 rounded-full" />
                <div className="h-2 w-3/4 bg-slate-400 rounded-full" />
                <div className="h-2 w-5/6 bg-slate-400 rounded-full" />
                <div className="h-2 w-full bg-slate-400 rounded-full" />
                <div className="h-2 w-2/3 bg-slate-400 rounded-full" />
            </div>

            {/* Scanning Beam */}
            <motion.div
                className="absolute left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10"
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            />

            {/* Floating Badge */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bg-white/90 backdrop-blur shadow-lg border border-orange-100 px-3 py-1.5 rounded-lg z-20"
            >
                <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold text-xs">Risk Found</span>
                </div>
            </motion.div>
        </div>
    );
}
