import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "SafeAgree | AI-Powered Contact & Terms Analysis",
    description: "Don't just click 'I Agree'. SafeAgree scans Terms of Service, Privacy Policies, and Contracts in seconds to find hidden risks using Gemini 3 Pro.",
    keywords: ["Terms of Service", "AI Legal Assistant", "Privacy Policy Scanner", "Contract Analysis", "SafeAgree"],
    openGraph: {
        title: "SafeAgree - Know what you sign.",
        description: "Instantly find hidden traps in any contract or Terms of Service.",
        type: "website",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(inter.variable, "min-h-screen bg-white dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-white transition-colors")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    <main className="flex min-h-screen flex-col">
                        {children}
                    </main>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
