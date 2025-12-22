"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-5 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-5xl rounded-full border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-lg shadow-slate-200/20 transition-all duration-300">
            <div className="flex h-16 items-center justify-between px-4 md:px-8">

                {/* Logo - Left aligned */}
                <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
                    <img src="/logo-new.png" alt="SafeAgree Logo" className="h-20 w-auto" />
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Link href="#how-it-works" className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 md:block">
                        How it Works
                    </Link>
                    <Link href="#hero">
                        <Button className="h-10 rounded-full bg-slate-900 px-6 text-sm font-medium text-white transition-transform hover:bg-slate-800 hover:scale-105">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
