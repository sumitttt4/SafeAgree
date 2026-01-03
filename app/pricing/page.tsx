import Link from "next/link";
import { CheckCircle2, Shield, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
    const dodoLink = "https://checkout.dodopayments.com/buy/pdt_0NVTIcJOkY006LtBkddTg?quantity=1&redirect_url=https%3A%2F%2Fsafeagree.tech%2Fsuccess";

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">

            {/* Navbar Placeholder */}
            <header className="container mx-auto px-6 py-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <Shield className="w-6 h-6 text-blue-500" /> SafeAgree
                </Link>
                <Link href="/" className="text-sm text-neutral-400 hover:text-white">Back to Home</Link>
            </header>

            <main className="container mx-auto px-6 py-12 md:py-20">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 mb-4">
                        <Zap className="w-3 h-3" /> Upgrade your safety
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-neutral-400 text-lg md:text-xl">
                        Protect yourself from hidden risks for less than the cost of a coffee.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Free Plan */}
                    <div className="relative p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold">Free</h3>
                            <div className="text-3xl font-black mt-2">$0<span className="text-sm font-medium text-neutral-500">/mo</span></div>
                            <p className="text-neutral-400 text-sm mt-2">Essential protection for casual users.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500" /> 3 Scans per day</li>
                            <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Basic Risk Analysis</li>
                            <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Browser Extension Access</li>
                            <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Limited Chat Context</li>
                        </ul>
                        <Button variant="outline" className="w-full border-neutral-700 hover:bg-neutral-800" asChild>
                            <Link href="/#hero">Start Free</Link>
                        </Button>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative p-8 rounded-3xl border border-blue-500/50 bg-neutral-900/80 backdrop-blur-md flex flex-col shadow-2xl shadow-blue-500/10">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">Pro <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /></h3>
                            <div className="text-3xl font-black mt-2">$5<span className="text-sm font-medium text-neutral-500">/mo</span></div>
                            <p className="text-neutral-400 text-sm mt-2">Complete peace of mind for power users.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-green-500" /> Unlimited Scans</li>
                            <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-green-500" /> Advanced AI Chat Strategy</li>
                            <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-green-500" /> Priority Analysis Speed</li>
                            <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-green-500" /> Early Access to New Features</li>
                        </ul>

                        {/* Dodo Payments Button */}
                        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 text-lg shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]" asChild>
                            <a href={dodoLink}>Upgrade Now</a>
                        </Button>

                        <p className="text-center text-xs text-neutral-500 mt-4">Secured by Dodo Payments. Cancel anytime.</p>
                    </div>

                </div>
            </main>

            <footer className="border-t border-neutral-900 py-12 mt-20">
                <div className="container mx-auto px-6 text-center text-neutral-500 text-sm">
                    © {new Date().getFullYear()} SafeAgree. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
