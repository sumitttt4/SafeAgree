"use client";

import { motion } from "framer-motion";
import { BentoCard, BentoHeader } from "@/components/ui/bento-card";
import { InputMockup } from "@/components/visuals/input-mockup";
import { ScanMockup } from "@/components/visuals/scan-mockup";
import { ResultMockup } from "@/components/visuals/result-mockup";
import { PrivacyMockup } from "@/components/visuals/privacy-mockup";

export function FeatureSection() {
    return (
        <section id="how-it-works" className="relative py-20 md:py-24 overflow-hidden scroll-mt-24">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 dark:from-slate-900/80 via-white dark:via-slate-950 to-white dark:to-slate-950 -z-10" />

            {/* Mesh Gradient Blob */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10 opacity-30 blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(147,51,234,0.1) 50%, transparent 70%)"
                }}
            />

            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12 md:mb-16 text-center space-y-3">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight"
                    >
                        How it works.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
                    >
                        Advanced AI analysis in a simple, privacy-focused package.
                    </motion.p>
                </div>

                {/* 2x2 Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

                    {/* Card 1: Just Paste It */}
                    <BentoCard
                        className="min-h-[280px] md:min-h-[300px]"
                        gradientColor="rgba(59, 130, 246, 0.12)"
                    >
                        <BentoHeader
                            title="1. Just Paste It"
                            description="No signup required. Paste any URL or text to start."
                            meta={<span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase">URL or Text</span>}
                        />
                        <div className="flex items-center justify-center pb-4 -mt-2">
                            <div className="scale-90">
                                <InputMockup />
                            </div>
                        </div>
                    </BentoCard>

                    {/* Card 2: Deep Scan */}
                    <BentoCard
                        className="min-h-[280px] md:min-h-[300px]"
                        gradientColor="rgba(147, 51, 234, 0.12)"
                    >
                        <BentoHeader
                            title="2. AI Analysis"
                            description="Our AI scans every clause, finding hidden risks in seconds."
                        />
                        <div className="flex items-center justify-center pb-4 -mt-2">
                            <div className="scale-75">
                                <ScanMockup />
                            </div>
                        </div>
                    </BentoCard>

                    {/* Card 3: Trust Score */}
                    <BentoCard
                        className="min-h-[280px] md:min-h-[300px]"
                        gradientColor="rgba(34, 197, 94, 0.12)"
                    >
                        <BentoHeader
                            title="3. Trust Score"
                            description="Get a clear Safe/Risky rating immediately."
                        />
                        <div className="flex items-center justify-center pb-4 -mt-6">
                            <div className="scale-80">
                                <ResultMockup />
                            </div>
                        </div>
                    </BentoCard>

                    {/* Card 4: Privacy First */}
                    <BentoCard
                        className="min-h-[280px] md:min-h-[300px]"
                        gradientColor="rgba(20, 184, 166, 0.12)"
                    >
                        <div className="flex h-full">
                            <div className="flex-1 flex flex-col justify-center">
                                <BentoHeader
                                    title="Privacy First"
                                    description="We don't store your documents. Ever."
                                />
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <PrivacyMockup />
                            </div>
                        </div>
                    </BentoCard>

                </div>
            </div>
        </section>
    );
}
