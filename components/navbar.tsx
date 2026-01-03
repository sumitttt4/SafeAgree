"use client";
// Navbar Component

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
    onReset?: () => void;
}

export function Navbar({ onReset }: NavbarProps) {
    return (
        <nav className="fixed top-6 left-0 right-0 z-50 max-w-5xl mx-auto px-4">
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-full shadow-sm h-14 px-4 sm:px-6 flex items-center justify-between">
                {/* Logo - Left aligned */}
                <Link
                    href="/"
                    onClick={() => onReset?.()}
                    className="flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <img src="/logo-new.png" alt="SafeAgree Logo" className="h-8 w-auto" />
                    <span className="font-bold text-slate-900 dark:text-white tracking-tight hidden sm:block">SafeAgree</span>
                </Link>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
                    <Link
                        href="#how-it-works"
                        onClick={() => onReset?.()}
                        className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
                    >
                        How it Works
                    </Link>
                    <Link
                        href="https://chromewebstore.google.com/"
                        target="_blank"
                        className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
                    >
                        Extension
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <ThemeToggle />
                    <Link href="#hero" onClick={() => onReset?.()}>
                        <Button className="bg-slate-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-slate-900 text-xs font-bold px-4 sm:px-5 py-2 rounded-full hover:bg-slate-900 dark:hover:bg-white transition-all shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.23)] border border-white/20 dark:border-slate-700/20 inset-shadow h-auto whitespace-nowrap">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
