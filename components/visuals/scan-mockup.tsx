"use client";

import { motion } from "framer-motion";
import { Search, AlertTriangle } from "lucide-react";

export function ScanMockup() {
    return (
        <div className="relative w-full max-w-xs mx-auto aspect-[3/4] flex items-center justify-center p-4">
            {/* Document Abstract */}
            <motion.div
                className="relative w-full h-full max-w-[180px] max-h-[260px] bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-100 p-4 space-y-2.5 overflow-hidden"
                initial={{ rotate: -3 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Fake Text Lines */}
                <div className="w-1/2 h-2 bg-slate-200 rounded" />
                <div className="w-full h-1.5 bg-slate-100 rounded" />
                <div className="w-4/5 h-1.5 bg-slate-100 rounded" />
                <div className="w-full h-1.5 bg-slate-100 rounded" />

                {/* Danger Clause - Highlighted */}
                <motion.div
                    className="w-full p-2 rounded-lg border-2 border-amber-400 bg-amber-50"
                    initial={{ borderColor: "transparent", backgroundColor: "transparent" }}
                    whileInView={{ borderColor: "#fbbf24", backgroundColor: "#fffbeb" }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                >
                    <div className="w-full h-1.5 bg-amber-300 rounded" />
                    <div className="w-3/4 h-1.5 bg-amber-200 rounded mt-1" />
                </motion.div>

                <div className="w-full h-1.5 bg-slate-100 rounded" />
                <div className="w-2/3 h-1.5 bg-slate-100 rounded" />
                <div className="w-full h-1.5 bg-slate-100 rounded" />
                <div className="w-4/5 h-1.5 bg-slate-100 rounded" />

                {/* Scanning Beam */}
                <motion.div
                    className="absolute left-0 right-0 h-8 bg-gradient-to-b from-blue-500/20 via-blue-500/10 to-transparent z-20"
                    style={{ top: 0 }}
                    animate={{
                        top: ["0%", "100%", "0%"],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Scan Line */}
                <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-20"
                    style={{ top: 0 }}
                    animate={{
                        top: ["0%", "100%", "0%"],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </motion.div>

            {/* Floating Alert Badge */}
            <motion.div
                className="absolute -right-2 top-1/3 bg-white px-2 py-1.5 rounded-lg shadow-lg border border-amber-100 text-[10px] font-bold text-amber-600 flex items-center gap-1.5"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 0.3 }}
                animate={{ y: [0, -4, 0] }}
            >
                <AlertTriangle className="w-3 h-3" />
                Risk Found
            </motion.div>

            {/* Magnifying Glass Icon */}
            <motion.div
                className="absolute -left-2 bottom-1/4 bg-white p-2.5 rounded-xl shadow-lg border border-slate-100 text-blue-600"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <Search className="w-5 h-5" />
            </motion.div>
        </div>
    );
}
