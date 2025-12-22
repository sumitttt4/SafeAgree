"use client";

import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

export function InputMockup() {
    return (
        <div className="relative w-full max-w-sm mx-auto aspect-[4/3] flex items-center justify-center p-4">
            {/* Mini Browser Window */}
            <motion.div
                className="w-full bg-white rounded-xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Browser Bar */}
                <div className="bg-slate-50 border-b border-slate-100 px-3 py-2.5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="ml-3 flex-1 bg-white h-6 rounded-md border border-slate-200 flex items-center px-2 text-[10px] text-slate-400 font-mono">
                        safeagree.com/analyze
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col items-center justify-center gap-4 min-h-[120px] bg-gradient-to-b from-white to-slate-50/30">
                    {/* Input Field */}
                    <div className="w-full max-w-[200px] bg-white border border-slate-200 rounded-lg px-3 py-2.5 flex items-center gap-2 shadow-sm">
                        <span className="text-xs text-slate-400 truncate flex-1">https://example.com/terms...</span>
                        {/* Blinking Cursor */}
                        <motion.div
                            className="w-0.5 h-4 bg-blue-500 rounded-full"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        />
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg shadow-lg shadow-slate-900/20 flex items-center gap-2 font-medium"
                    >
                        <Link2 className="w-3.5 h-3.5" />
                        Paste URL
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
