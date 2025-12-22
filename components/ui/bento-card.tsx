"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function BentoCard({
    children,
    className,
    gradientColor = "rgba(59, 130, 246, 0.15)"
}: {
    children: React.ReactNode;
    className?: string;
    gradientColor?: string;
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className={cn(
                "group relative overflow-hidden rounded-3xl",
                "bg-white border border-slate-200/80",
                "shadow-[0_1px_1px_rgba(0,0,0,0.02),0_4px_8px_rgba(0,0,0,0.04),0_16px_32px_rgba(0,0,0,0.04)]",
                "hover:shadow-[0_1px_1px_rgba(0,0,0,0.02),0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.06)]",
                "transition-all duration-500 ease-out",
                className
            )}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4, scale: 1.01 }}
        >
            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            500px circle at ${mouseX}px ${mouseY}px,
                            ${gradientColor},
                            transparent 60%
                        )
                    `,
                }}
            />

            {/* Inner Border Glow */}
            <div className="absolute inset-px rounded-[23px] bg-gradient-to-b from-white to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

            {/* Content */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    );
}

export function BentoHeader({ title, description, meta }: { title: string, description: string, meta?: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5 p-6 md:p-8 z-10 relative">
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
                {meta && (
                    <div className="shrink-0">
                        {meta}
                    </div>
                )}
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">{description}</p>
        </div>
    );
}
