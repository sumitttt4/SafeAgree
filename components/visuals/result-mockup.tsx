"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ShieldCheck, Star, CheckCircle, TrendingUp } from "lucide-react";
import { useEffect } from "react";

function AnimatedScore({ value }: { value: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
        return controls.stop;
    }, [count, value]);

    return <motion.span>{rounded}</motion.span>;
}

export function ResultMockup() {
    const score = 85;
    const circumference = 2 * Math.PI * 42;
    const strokeDashoffset = circumference * (1 - score / 100);

    return (
        <div className="relative w-full max-w-xs mx-auto flex items-center justify-center p-6">
            {/* Main Score Card */}
            <motion.div
                className="w-full max-w-[200px] bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl shadow-green-500/10 border border-green-100/50 p-5 flex flex-col items-center text-center relative z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Score Circle */}
                <div className="relative w-20 h-20 mb-3">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle
                            cx="50" cy="50" r="42"
                            fill="transparent"
                            stroke="#e2e8f0"
                            strokeWidth="8"
                        />
                        {/* Glow Circle */}
                        <motion.circle
                            cx="50" cy="50" r="42"
                            fill="transparent"
                            stroke="url(#greenGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            whileInView={{ strokeDashoffset: strokeDashoffset }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            filter="url(#glow)"
                        />
                        {/* Gradient & Glow Definitions */}
                        <defs>
                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#22c55e" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-extrabold text-green-600 tabular-nums">
                            <AnimatedScore value={score} />
                        </span>
                    </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <h3 className="text-sm font-bold text-slate-900">Safe</h3>
                </div>
                <p className="text-[10px] text-slate-500">Standard terms detected</p>

                {/* Mini Stats */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 w-full justify-center">
                    <div className="text-center">
                        <div className="text-sm font-bold text-red-500">2</div>
                        <div className="text-[8px] text-slate-400 uppercase">Risks</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-bold text-green-500">5</div>
                        <div className="text-[8px] text-slate-400 uppercase">Good</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-bold text-slate-500">3</div>
                        <div className="text-[8px] text-slate-400 uppercase">Info</div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Trend Badge */}
            <motion.div
                className="absolute -top-2 right-0 bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 rounded-full shadow-lg text-[10px] font-bold text-white flex items-center gap-1"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.3 }}
                animate={{ y: [0, -4, 0] }}
            >
                <TrendingUp className="w-3 h-3" />
                Safe
            </motion.div>
        </div>
    );
}
