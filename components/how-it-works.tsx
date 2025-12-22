import { ClipboardPaste, ScanText, ShieldCheck } from "lucide-react";

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        How It Works
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Understanding your agreements shouldn't require a law degree.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: The Input */}
                    <div className="group relative rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_2px_8px_rgb(0,0,0,0.04)] transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1A56A0]">
                            <ClipboardPaste className="h-6 w-6" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold text-slate-900">1. Paste URL</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Simply copy the link to any Terms of Service or Privacy Policy and paste it into our secure analyzer.
                        </p>
                    </div>

                    {/* Card 2: The Scan */}
                    <div className="group relative rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_2px_8px_rgb(0,0,0,0.04)] transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1A56A0]">
                            <ScanText className="h-6 w-6" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2. AI Analysis</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Gemini 3 Pro instantly breaks down complex legal jargon, identifying hidden clauses and loopholes.
                        </p>
                    </div>

                    {/* Card 3: The Result */}
                    <div className="group relative rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_2px_8px_rgb(0,0,0,0.04)] transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1A56A0]">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold text-slate-900">3. Get Clarity</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Receive a clear "Safe" or "Warning" score with actionable insights on what you're actually agreeing to.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
