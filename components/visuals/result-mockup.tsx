"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function ResultMockup() {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-56 flex flex-col items-center font-sans">
            {/* Circular Progress */}
            <div className="relative w-24 h-24 mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="8"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                        animate={{ strokeDashoffset: 37 }} // ~85%
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-slate-900">85</span>
                </div>
            </div>

            <div className="flex items-center gap-1.5 text-green-600 font-bold text-sm mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Safe</span>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-2 w-full">
                <div className="text-center">
                    <div className="text-xs font-bold text-red-500">2</div>
                    <div className="text-[8px] text-slate-400 uppercase">Risks</div>
                </div>
                <div className="text-center border-l border-r border-slate-100">
                    <div className="text-xs font-bold text-green-500">5</div>
                    <div className="text-[8px] text-slate-400 uppercase">Good</div>
                </div>
                <div className="text-center">
                    <div className="text-xs font-bold text-slate-500">3</div>
                    <div className="text-[8px] text-slate-400 uppercase">Info</div>
                </div>
            </div>
        </div>
    );
}
