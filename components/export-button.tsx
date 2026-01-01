"use client";

import { Download } from "lucide-react";
import { useState } from "react";

interface ExportButtonProps {
    result: {
        score: number;
        summary?: string;
        redFlags: Array<{ title: string; description: string; severity?: string }>;
        greenFlags: Array<{ title: string; description: string }>;
        grayFlags: Array<{ title: string; value: string }>;
    };
}

export function ExportButton({ result }: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);

        try {
            // Create a simple text report instead of PDF for now (PDF renderer has SSR issues)
            const report = generateTextReport(result);
            const blob = new Blob([report], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `SafeAgree-Report-${new Date().toISOString().split("T")[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export failed:", err);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting}
            className="h-9 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm shadow-sm font-medium disabled:opacity-50"
        >
            <Download className={`h-4 w-4 ${isExporting ? "animate-bounce" : ""}`} />
            {isExporting ? "Exporting..." : "Export"}
        </button>
    );
}

function generateTextReport(result: ExportButtonProps["result"]): string {
    const divider = "═".repeat(60);
    const lines: string[] = [
        divider,
        "                    SAFEAGREE ANALYSIS REPORT",
        divider,
        "",
        `Generated: ${new Date().toLocaleString()}`,
        "",
        divider,
        `TRUST SCORE: ${result.score}/100 - ${getScoreLabel(result.score)}`,
        divider,
        "",
    ];

    if (result.summary) {
        lines.push("SUMMARY:", result.summary, "");
    }

    if (result.redFlags.length > 0) {
        lines.push("", "🚩 RISKS (" + result.redFlags.length + ")", "─".repeat(40));
        result.redFlags.forEach((flag, i) => {
            lines.push(`${i + 1}. ${flag.title}${flag.severity === "high" ? " [HIGH RISK]" : ""}`);
            lines.push(`   ${flag.description}`);
            lines.push("");
        });
    }

    if (result.greenFlags.length > 0) {
        lines.push("", "✅ POSITIVES (" + result.greenFlags.length + ")", "─".repeat(40));
        result.greenFlags.forEach((flag, i) => {
            lines.push(`${i + 1}. ${flag.title}`);
            lines.push(`   ${flag.description}`);
            lines.push("");
        });
    }

    if (result.grayFlags.length > 0) {
        lines.push("", "ℹ️ INFO (" + result.grayFlags.length + ")", "─".repeat(40));
        result.grayFlags.forEach((flag) => {
            lines.push(`• ${flag.title}: ${flag.value}`);
        });
        lines.push("");
    }

    lines.push(
        "",
        divider,
        "DISCLAIMER: This analysis is AI-powered and does not constitute legal advice.",
        "Always consult with a qualified attorney for legal matters.",
        divider,
        "",
        "Powered by SafeAgree - https://safeagree.com"
    );

    return lines.join("\n");
}

function getScoreLabel(score: number): string {
    if (score >= 80) return "SAFE";
    if (score >= 60) return "CAUTION";
    return "RISKY";
}
