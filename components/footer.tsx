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
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-16">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                    {/* Left: Brand & Credit */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <img src="/logo-new.png" alt="SafeAgree" className="h-10 w-auto" />
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Built by <Link href="https://x.com/Sumitthq" target="_blank" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sumit Sharma</Link>
                        </p>
                        <div className="flex items-center gap-4 pt-1">
                            <Link
                                href="https://x.com/Sumitthq"
                                target="_blank"
                                className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                                aria-label="X (Twitter)"
                            >
                                <XIcon className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://github.com/sumitttt4"
                                target="_blank"
                                className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
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
                            className="rounded-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-950 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-300 dark:hover:border-pink-700 transition-all group gap-2 shadow-sm"
                            asChild
                        >
                            <Link href="https://github.com/sponsors/sumitttt4" target="_blank">
                                <Heart className="h-4 w-4 text-pink-400 group-hover:text-pink-500 group-hover:fill-pink-500 transition-all" />
                                Support Me
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            className="rounded-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all group gap-2 shadow-sm"
                            asChild
                        >
                            <Link href="#hero">
                                Check T&C Free <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </Button>
                    </div>

                </div>

                {/* Disclaimer */}
                <div className="mt-8 py-4 px-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Disclaimer:</span> SafeAgree is an AI-powered analysis tool and does not provide professional legal advice. The scores and summaries generated are for informational purposes only. Always consult with a qualified attorney for legal matters.
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <span>© 2025 SafeAgree. All rights reserved.</span>
                        <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300 underline decoration-slate-300 dark:decoration-slate-600 underline-offset-2 transition-colors">
                            Privacy Policy & Terms
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Questions CTA */}
                        <Link
                            href="https://x.com/Sumitthq"
                            target="_blank"
                            className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium border-r border-slate-200 dark:border-slate-700 pr-6"
                        >
                            <XIcon className="h-3.5 w-3.5" />
                            Have questions? DM me
                        </Link>

                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span>All systems operational</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
