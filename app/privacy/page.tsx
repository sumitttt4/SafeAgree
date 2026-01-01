"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyTerms() {
    return (
        <div className="min-h-screen bg-white text-slate-900 pb-20 font-sans">

            {/* Header/Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-900 transition-colors" />
                        <span className="font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Back to Home</span>
                    </Link>
                    <span className="font-bold text-slate-900">SafeAgree Legal</span>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto px-6 pt-32 space-y-16">

                {/* Header Section */}
                <div className="space-y-4 border-b border-slate-100 pb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                        Privacy Policy & Terms of Service
                    </h1>
                    <p className="text-slate-500">Last Updated: December 2025</p>
                </div>

                {/* 1. Plain English Summary */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">1. Executive Summary</h2>
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <p className="mb-4 text-slate-700">SafeAgree is designed to protect your privacy. Here are the core principles of our service:</p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-700 marker:text-slate-400">
                            <li><strong>RAM-Only Processing:</strong> We do not store your documents. All analysis happens in temporary memory and is wiped instantly after processing.</li>
                            <li><strong>No AI Training:</strong> Your inputs are never used to train our AI models or third-party models.</li>
                            <li><strong>User Ownership:</strong> You retain full ownership of any contract or URL you submit. We claim zero rights.</li>
                            <li><strong>No Hidden Costs:</strong> We do not charge recurring fees or subscriptions without explicit consent.</li>
                        </ul>
                    </div>
                </section>

                {/* 2. Data Processing */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">2. Data Processing & Retention</h2>

                    <div className="space-y-4 text-slate-600 leading-relaxed">
                        <h3 className="font-semibold text-slate-800">2.1 Transient Processing Only</h3>
                        <p>
                            When you use SafeAgree to scan a document (via URL or text paste), your data is sent to our inference engine solely for the purpose of analysis.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-slate-400">
                            <li><strong>No Permanent Storage:</strong> We do not save, archive, or log the contents of your contracts in our database.</li>
                            <li><strong>Instant Deletion:</strong> Once the analysis score is returned to your browser, the data is immediately discarded from our active memory.</li>
                        </ul>

                        <h3 className="font-semibold text-slate-800 mt-6">2.2 Third-Party Processors</h3>
                        <p>
                            We use enterprise-grade AI providers (Google Cloud Vertex AI / Groq) to perform the analysis. We use their paid/commercial APIs, which contractually guarantees that they do not train on your data.
                        </p>
                    </div>
                </section>

                {/* 3. User Rights */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">3. User Rights & Ownership</h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed">
                        <p>
                            <strong>3.1 You Own Your Input:</strong> You retain full ownership of any text, URL, or document you submit to SafeAgree. We claim no intellectual property rights over your submissions.
                        </p>
                        <p>
                            <strong>3.2 No Data Selling:</strong> SafeAgree does not sell, rent, or share your personal data or document contents with third-party advertisers, data brokers, or marketing agencies.
                        </p>
                    </div>
                </section>

                {/* 4. Payment */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">4. Payment & Refunds</h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed">
                        <p>
                            <strong>4.1 No Hidden Fees:</strong> SafeAgree is currently free to use. If we introduce paid features in the future, they will be one-time purchases or explicit subscriptions. We will never auto-enroll you in a payment plan without your consent.
                        </p>
                        <p>
                            <strong>4.2 Refund Policy:</strong> If you purchase a paid report or feature and it fails to deliver due to a technical error, you are entitled to a full refund. Please contact support via email for resolution.
                        </p>
                    </div>
                </section>

                {/* 5. Liability */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
                    <p className="text-slate-600 leading-relaxed">
                        <strong>5.1 AI Accuracy Warning:</strong> SafeAgree is an AI analysis tool, not a law firm. The "Trust Score" and "Risk Analysis" are generated by artificial intelligence and do not constitute legal advice. You should not rely solely on these results for binding legal decisions. Always consult a qualified attorney for critical contracts.
                    </p>
                </section>

                {/* 6. Termination */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">6. Account Termination</h2>
                    <p className="text-slate-600 leading-relaxed">
                        Since we do not store your documents or require a permanent account for basic features, there is often no data to "delete." However, if you sign in via Google Auth, you may request the deletion of your account metadata at any time by contacting support.
                    </p>
                </section>

                {/* 7. Governing Law */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">7. Governing Law</h2>
                    <p className="text-slate-600 leading-relaxed">
                        These terms are governed by the laws of India. We prefer mediation over arbitration. In the event of a dispute, we agree to attempt to resolve it amicably through informal negotiation before resorting to formal legal action.
                    </p>
                </section>

                {/* Divider */}
                <div className="h-px bg-slate-200 w-full my-12" />

                {/* Contact */}


                {/* Disclaimer */}
                <section className="space-y-4">
                    <div className="p-6 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50">
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            <span className="font-bold text-amber-800 dark:text-amber-300">Disclaimer:</span> SafeAgree is an AI-powered analysis tool and does not provide professional legal advice. The scores and summaries generated are for informational purposes only. Always consult with a qualified attorney for legal matters.
                        </p>
                    </div>
                </section>

                <div className="flex justify-center pb-20">
                    <Link href="/">
                        <Button className="rounded-full px-8 bg-slate-900 text-white hover:bg-slate-800 border-none shadow-lg shadow-slate-200 h-10">
                            Back to Home
                        </Button>
                    </Link>
                </div>

            </main>
        </div>
    );
}
