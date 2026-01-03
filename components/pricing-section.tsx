import Link from "next/link";
import { CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingSection() {
    const dodoLink = "https://checkout.dodopayments.com/buy/pdt_0NVTIcJOkY006LtBkddTg?quantity=1&redirect_url=https%3A%2F%2Fsafeagree.tech%2Fsuccess";

    return (
        <section className="py-20 bg-transparent" id="pricing">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-200 dark:border-blue-500/20 mb-4">
                        <Zap className="w-3 h-3" /> Upgrade your safety
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-slate-600 dark:text-neutral-400 text-lg">
                        Protect yourself from hidden risks for less than the cost of a coffee.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">

                    {/* Free Plan */}
                    <div className="relative p-8 rounded-3xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 backdrop-blur-sm flex flex-col shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free</h3>
                            <div className="text-3xl font-black mt-2 text-slate-900 dark:text-white">$0<span className="text-sm font-medium text-slate-500 dark:text-neutral-500">/mo</span></div>
                            <p className="text-slate-500 dark:text-neutral-400 text-sm mt-2">Essential protection for casual users.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-neutral-300"><CheckCircle2 className="w-5 h-5 text-blue-500" /> 3 Scans per day</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-neutral-300"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Basic Risk Analysis</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-neutral-300"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Browser Extension Access</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-neutral-300"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Limited Chat Context</li>
                        </ul>
                        <Button className="w-full bg-white dark:bg-transparent border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-neutral-800" asChild>
                            <Link href="/#hero">Start Free</Link>
                        </Button>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative p-8 rounded-3xl border border-blue-500/30 dark:border-blue-500/50 bg-slate-50 dark:bg-neutral-900/80 backdrop-blur-md flex flex-col shadow-2xl shadow-blue-500/10 scale-105 border-t-blue-500">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">Pro <Zap className="w-4 h-4 text-orange-500 dark:text-yellow-400 fill-orange-500 dark:fill-yellow-400" /></h3>
                            <div className="text-3xl font-black mt-2 text-slate-900 dark:text-white">$5<span className="text-sm font-medium text-slate-500 dark:text-neutral-500"> one-time</span></div>
                            <p className="text-slate-500 dark:text-neutral-400 text-sm mt-2">Pay once, own forever. Complete peace of mind.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-white"><CheckCircle2 className="w-5 h-5 text-green-500" /> Lifetime Access</li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-white"><CheckCircle2 className="w-5 h-5 text-green-500" /> Unlimited Scans</li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-white"><CheckCircle2 className="w-5 h-5 text-green-500" /> Advanced AI Chat Strategy</li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-white"><CheckCircle2 className="w-5 h-5 text-green-500" /> Priority Analysis Speed</li>
                        </ul>

                        {/* Dodo Payments Button */}
                        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 text-lg shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]" asChild>
                            <a href={dodoLink}>Get Lifetime Access</a>
                        </Button>

                        <p className="text-center text-[10px] text-slate-400 dark:text-neutral-500 mt-3 uppercase tracking-widest opacity-70">Upgrade now</p>
                    </div>

                </div>
            </div>
        </section>
    )
}
