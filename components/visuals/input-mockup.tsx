"use client";

import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

export function InputMockup() {
    return (
        <div className="w-full max-w-[280px] bg-white rounded-xl shadow-lg border border-slate-100 p-4 font-sans">
            {/* Top Bar */}
            <div className="flex items-center gap-1.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="flex-1 ml-2 bg-slate-100 h-5 rounded-md flex items-center px-2">
                    <span className="text-[8px] text-slate-400">safeagree.com/analyze</span>
                </div>
            </div>

            {/* Input Field */}
            <div className="space-y-3">
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300">
                        <Link2 className="w-4 h-4" />
                    </div>
                    <div className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg flex items-center pl-9 pr-3 text-xs text-slate-400 font-medium">
                        https://example.com/terms...
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-0.5 h-4 bg-blue-500 ml-0.5"
                        />
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                    <div className="bg-slate-900 text-white text-[10px] font-bold py-2 px-6 rounded-lg flex items-center gap-2">
                        <Link2 className="w-3 h-3" />
                        Paste URL
                    </div>
                </div>
            </div>
        </div>
    );
}
