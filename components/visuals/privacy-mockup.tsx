"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, EyeOff } from "lucide-react";

export function PrivacyMockup() {
    return (
        <div className="relative w-full h-full min-h-[160px] flex items-center justify-center p-4">
            <div className="relative">
                {/* Pulsing Ring */}
                <motion.div
                    className="absolute inset-0 bg-green-500/10 rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute inset-0 bg-green-500/10 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                />

                {/* Main Lock Icon */}
                <motion.div
                    className="relative z-10 bg-white p-4 rounded-2xl shadow-xl shadow-green-900/10 border border-green-100 text-green-600"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                    <Lock className="w-8 h-8" />
                </motion.div>
            </div>

            {/* Floating Badges */}
            <motion.div
                className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm text-[9px] font-bold text-slate-500 flex items-center gap-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                animate={{ y: [0, -3, 0] }}
            >
                <EyeOff className="w-3 h-3" /> No Logs
            </motion.div>

            <motion.div
                className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm text-[9px] font-bold text-slate-500 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                animate={{ y: [0, 3, 0] }}
            >
                <ShieldCheck className="w-3 h-3" /> Encrypted
            </motion.div>
        </div>
    );
}
