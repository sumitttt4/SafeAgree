"use client";

import { Github, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// X (Twitter) Logo SVG Component
function XIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white py-16">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                    {/* Left: Brand & Credit */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <img src="/logo-new.png" alt="SafeAgree" className="h-10 w-auto" />
                        </div>
                        <p className="text-sm text-slate-500">
                            Made with ❤️ by <Link href="https://x.com/Sumitthq" target="_blank" className="font-semibold text-slate-700 hover:text-blue-600 transition-colors">Sumit Sharma</Link>
                        </p>
                        <div className="flex items-center gap-4 pt-1">
                            <Link
                                href="https://x.com/Sumitthq"
                                target="_blank"
                                className="text-slate-400 hover:text-slate-900 transition-colors"
                                aria-label="X (Twitter)"
                            >
                                <XIcon className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://github.com/sumitttt4"
                                target="_blank"
                                className="text-slate-400 hover:text-slate-900 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Right: CTAs */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Button
                            variant="outline"
                            className="rounded-full bg-white border-slate-300 text-slate-700 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 transition-all group gap-2 shadow-sm"
                            asChild
                        >
                            <Link href="https://github.com/sponsors/sumitttt4" target="_blank">
                                <Heart className="h-4 w-4 text-pink-400 group-hover:text-pink-500 group-hover:fill-pink-500 transition-all" />
                                Support Me
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            className="rounded-full bg-white border-slate-300 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all group gap-2 shadow-sm"
                            asChild
                        >
                            <Link href="#hero">
                                Check T&C Free <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </Button>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                    <div>
                        © 2024 SafeAgree. All rights reserved.
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>All systems operational</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
