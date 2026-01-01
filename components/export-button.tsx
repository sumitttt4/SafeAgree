"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";

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
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 20;
            let y = 20;

            // --- HEADER ---
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.setTextColor(15, 23, 42); // slate-900
            doc.text("SafeAgree Analysis", margin, y);

            y += 8;
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(100, 116, 139); // slate-500
            doc.text(`Generated on ${new Date().toLocaleString()}`, margin, y);

            // Divider
            y += 8;
            doc.setDrawColor(226, 232, 240); // slate-200
            doc.line(margin, y, pageWidth - margin, y);
            y += 15;

            // --- SCORE SECTION ---
            doc.setFontSize(12);
            doc.setTextColor(100, 116, 139);
            doc.text("TRUST SCORE", margin, y);
            y += 12;

            doc.setFontSize(36);
            doc.setFont("helvetica", "bold");

            // Colorize score
            if (result.score >= 80) doc.setTextColor(22, 163, 74); // green-600
            else if (result.score >= 60) doc.setTextColor(217, 119, 6); // amber-600
            else doc.setTextColor(220, 38, 38); // red-600

            doc.text(`${result.score}`, margin, y);

            // Label
            doc.setFontSize(16);
            const label = result.score >= 80 ? "Safe" : result.score >= 60 ? "Caution" : "Risky";
            const scoreWidth = doc.getTextWidth(`${result.score}`);
            doc.text(`/ 100  (${label})`, margin + scoreWidth + 4, y);

            y += 20;

            // --- SUMMARY ---
            if (result.summary) {
                doc.setFont("helvetica", "bold");
                doc.setFontSize(12);
                doc.setTextColor(15, 23, 42);
                doc.text("Summary", margin, y);
                y += 7;

                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                doc.setTextColor(51, 65, 85); // slate-700

                const splitSummary = doc.splitTextToSize(result.summary, pageWidth - (margin * 2));
                doc.text(splitSummary, margin, y);
                y += (splitSummary.length * 5) + 12;
            }

            // --- RED FLAGS ---
            if (result.redFlags.length > 0) {
                y = checkPageBreak(doc, y, margin);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.setTextColor(220, 38, 38); // red-600
                doc.text(`🚩 Risk Factors (${result.redFlags.length})`, margin, y);
                y += 10;

                result.redFlags.forEach((flag) => {
                    y = checkPageBreak(doc, y, margin);
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(11);
                    doc.setTextColor(15, 23, 42);
                    doc.text(`• ${flag.title}`, margin, y);

                    if (flag.severity === "high") {
                        const titleWidth = doc.getTextWidth(`• ${flag.title}`);
                        doc.setTextColor(220, 38, 38);
                        doc.setFontSize(9);
                        doc.text(" [HIGH]", margin + titleWidth + 2, y);
                    }

                    y += 5;
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(10);
                    doc.setTextColor(71, 85, 105); // slate-600
                    const desc = doc.splitTextToSize(flag.description, pageWidth - (margin * 2) - 5);
                    doc.text(desc, margin + 5, y);
                    y += (desc.length * 5) + 6;
                });
                y += 8;
            }

            // --- GREEN FLAGS ---
            if (result.greenFlags.length > 0) {
                y = checkPageBreak(doc, y, margin);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.setTextColor(22, 163, 74); // green-600
                doc.text(`✅ Positive Aspects (${result.greenFlags.length})`, margin, y);
                y += 10;

                result.greenFlags.forEach((flag) => {
                    y = checkPageBreak(doc, y, margin);
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(11);
                    doc.setTextColor(15, 23, 42);
                    doc.text(`• ${flag.title}`, margin, y);

                    y += 5;
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(10);
                    doc.setTextColor(71, 85, 105);
                    const desc = doc.splitTextToSize(flag.description, pageWidth - (margin * 2) - 5);
                    doc.text(desc, margin + 5, y);
                    y += (desc.length * 5) + 6;
                });
                y += 8;
            }

            // --- INFO ---
            if (result.grayFlags.length > 0) {
                y = checkPageBreak(doc, y, margin);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.setTextColor(100, 116, 139); // slate-500
                doc.text(`ℹ️ Key Information`, margin, y);
                y += 10;

                result.grayFlags.forEach((flag) => {
                    y = checkPageBreak(doc, y, margin);
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(10);
                    doc.setTextColor(51, 65, 85);
                    doc.text(`• ${flag.title}:`, margin + 5, y);

                    doc.setFont("helvetica", "bold");
                    const titleWidth = doc.getTextWidth(`• ${flag.title}: `);
                    doc.text(` ${flag.value}`, margin + 5 + titleWidth, y);

                    y += 6;
                });
            }

            // --- FOOTER DISCLAIMER ---
            y = checkPageBreak(doc, y, margin);
            y += 15;
            doc.setDrawColor(226, 232, 240);
            doc.line(margin, y, pageWidth - margin, y);
            y += 8;

            doc.setFont("helvetica", "italic");
            doc.setFontSize(8);
            doc.setTextColor(148, 163, 184); // slate-400
            doc.text("Disclaimer: SafeAgree is an AI analysis tool and does not provide legal advice.", margin, y);
            doc.text("Always consult with a qualified attorney.", margin, y + 4);

            // Powered by
            doc.setTextColor(100, 116, 139);
            doc.textWithLink("Powered by SafeAgree - https://safeagree.tech/", margin, y + 10, { url: "https://safeagree.tech/" });

            // Save PDF
            doc.save(`SafeAgree-Report-${new Date().toISOString().split("T")[0]}.pdf`);

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
            {isExporting ? "Generating PDF..." : "Export PDF"}
        </button>
    );
}

function checkPageBreak(doc: jsPDF, y: number, margin: number, pageHeight: number = 297): number {
    if (y > pageHeight - margin - 20) {
        doc.addPage();
        return margin; // reset y to top margin
    }
    return y;
}
