"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

export interface TimelineEntry {
    title: string
    content: React.ReactNode
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 30%", "end 70%"],
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <div ref={containerRef} className="relative">
            {/* Track line */}
            <div
                className="absolute left-5 top-6 bottom-6 w-px"
                style={{ background: "hsl(var(--border))" }}
            />
            {/* Animated fill */}
            <div className="absolute left-5 top-6 bottom-6 w-px overflow-hidden">
                <motion.div
                    style={{ height: lineHeight, background: "hsl(var(--primary))" }}
                    className="w-full origin-top"
                />
            </div>

            <div className="flex flex-col gap-10">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                            duration: 0.55,
                            delay: index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex gap-7 items-start"
                    >
                        {/* Step badge */}
                        <div
                            className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                                background: "hsl(var(--background))",
                                border: "1.5px solid hsl(var(--border))",
                                boxShadow: "0 0 0 4px hsl(var(--background))",
                            }}
                        >
                            <span
                                className="font-mono text-[10px] font-bold tabular-nums"
                                style={{ color: "hsl(var(--primary))" }}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Card */}
                        <div
                            className="flex-1 rounded-2xl p-6 lg:p-7"
                            style={{
                                background: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                            }}
                        >
                            <h3 className="font-display text-lg lg:text-xl font-bold text-foreground mb-3 leading-snug">
                                {item.title}
                            </h3>
                            {item.content}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
