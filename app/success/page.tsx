"use client";

import Link from "next/link";
import { CheckCircle2, Copy, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function SuccessPage() {
    const [licenseKey, setLicenseKey] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Generate a random key for MVP
        // In production, this would come from the API/Database
        const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
        const key = `SAFEAGREE-PRO-${randomHex}-2026`;
        setLicenseKey(key);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(licenseKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center selection:bg-green-500/30">

            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 animate-in zoom-in-50 duration-500">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>

            <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Access Granted!</h1>
            <p className="text-neutral-400 max-w-md mx-auto mb-10 text-lg">
                Your subscription is active. Here is your Pro License Key:
            </p>

            {/* License Key Box */}
            {licenseKey && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-1 pr-1.5 flex items-center gap-3 mb-12 shadow-2xl shadow-green-900/10 max-w-md w-full mx-auto relative group">
                    <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                        <Key className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div className="flex-1 text-left">
                        <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">License Key</div>
                        <div className="font-mono text-lg font-bold text-white tracking-wide">{licenseKey}</div>
                    </div>
                    <Button
                        onClick={copyToClipboard}
                        variant="ghost"
                        size="sm"
                        className={`h-10 px-4 rounded-lg font-medium transition-all ${copied ? 'bg-green-500/10 text-green-500' : 'hover:bg-neutral-800 text-neutral-400 hover:text-white'}`}
                    >
                        {copied ? "Copied!" : "Copy"}
                    </Button>
                </div>
            )}

            <div className="space-y-6 max-w-sm mx-auto w-full">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-left text-sm text-blue-200">
                    <span className="font-bold block mb-1">What now?</span>
                    1. Copy the key above.<br />
                    2. Open the SafeAgree Extension.<br />
                    3. When prompted (or in settings), enter the key to unlock unlimited scans.
                </div>

                <div className="flex gap-3 justify-center">
                    <Button asChild className="bg-blue-600 hover:bg-blue-500 w-full" variant="default">
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button variant="outline" asChild className="border-neutral-800 hover:bg-neutral-900 w-full">
                        <Link href="/">Back Home</Link>
                    </Button>
                </div>
            </div>

        </div>
    )
}
