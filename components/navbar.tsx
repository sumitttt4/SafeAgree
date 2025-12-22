"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
    onReset?: () => void;
}

export function Navbar({ onReset }: NavbarProps) {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
        if (onReset) onReset();
        // If we are just resetting, we might need a small timeout to let the home page mount before scrolling
        // But for hash links like '#how-it-works', standard browser behavior often works if it exists.
        // We'll trust the default behavior + reset state.
    };

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 max-w-5xl mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-sm h-14 px-6 flex items-center justify-between">
                {/* Logo - Left aligned */}
                <Link
                    href="/"
                    onClick={() => onReset?.()}
                    className="flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <img src="/logo-new.png" alt="SafeAgree Logo" className="h-8 w-auto" />
                    <span className="font-bold text-slate-900 tracking-tight">SafeAgree</span>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <Link
                        href="#how-it-works"
                        onClick={() => onReset?.()}
                        className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 md:block"
                    >
                        How it Works
                    </Link>
                    <Link href="#hero" onClick={() => onReset?.()}>
                        <Button className="bg-slate-900/90 backdrop-blur-sm text-white text-xs font-bold px-5 py-2 rounded-full hover:bg-slate-900 transition-all shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.23)] border border-white/20 inset-shadow h-auto">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
