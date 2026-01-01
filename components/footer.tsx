"use client";

import { Github, ArrowRight, Sparkles } from "lucide-react";
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
        <footer className="relative bg-slate-50/80 dark:bg-transparent backdrop-blur-sm border-t border-slate-200 dark:border-transparent">
            {/* Main Footer Content */}
            <div className="container px-4 md:px-6 mx-auto max-w-6xl py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-5">
                        <div className="flex items-center gap-3">
                            <img src="/logo-new.png" alt="SafeAgree" className="h-10 w-auto" />
                            <span className="text-xl font-bold text-slate-900 dark:text-white">SafeAgree</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                            AI-powered Terms of Service analyzer. Understand what you're agreeing to before clicking "I Accept".
                        </p>
                        <div className="flex items-center gap-3">
                            <Link
                                href="https://x.com/Sumitthq"
                                target="_blank"
                                className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                                aria-label="X (Twitter)"
                            >
                                <XIcon className="h-4 w-4" />
                            </Link>
                            <Link
                                href="https://github.com/sumitttt4"
                                target="_blank"
                                className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                                aria-label="GitHub"
                            >
                                <Github className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#hero" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Analyze T&C
                                </Link>
                            </li>
                            <li>
                                <Link href="#how-it-works" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    How it Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Column */}
                    <div className="md:col-span-4">
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-900/30 p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-sm font-bold text-yellow-800 dark:text-yellow-300">Try it now!</span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                                Paste any Terms of Service and get instant insights.
                            </p>
                            <Button
                                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl font-bold"
                                asChild
                            >
                                <Link href="#hero">
                                    Check T&C Free <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-200 dark:border-transparent bg-white/50 dark:bg-transparent backdrop-blur-sm">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl py-4">
                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                        <span>© 2025 SafeAgree. All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
