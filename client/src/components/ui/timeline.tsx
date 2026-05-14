"use client"

import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create("nefEase", "0.22, 1, 0.36, 1")

export interface TimelineEntry {
    title: string
    content: React.ReactNode
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const fillRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const container = containerRef.current
        const fill = fillRef.current
        if (!container || !fill) return

        // Scroll-linked fill line
        const fillTrigger = ScrollTrigger.create({
            trigger: container,
            start: "top 30%",
            end: "bottom 70%",
            scrub: true,
            onUpdate: (self) => {
                fill.style.height = `${self.progress * 100}%`
            },
        })

        // Per-item entrance animations
        const triggers: ScrollTrigger[] = []
        itemRefs.current.forEach((item, index) => {
            if (!item) return
            gsap.set(item, { opacity: 0, x: 16 })
            const t = ScrollTrigger.create({
                trigger: item,
                start: "top bottom-=60px",
                once: true,
                onEnter: () => {
                    gsap.to(item, {
                        opacity: 1,
                        x: 0,
                        duration: 0.55,
                        delay: index * 0.08,
                        ease: "nefEase",
                    })
                },
            })
            triggers.push(t)
        })

        return () => {
            fillTrigger.kill()
            triggers.forEach(t => t.kill())
        }
    }, [])

    return (
        <div ref={containerRef} className="relative">
            {/* Track line */}
            <div
                className="absolute left-5 top-6 bottom-6 w-px"
                style={{ background: "hsl(var(--border))" }}
            />
            {/* Animated fill */}
            <div className="absolute left-5 top-6 bottom-6 w-px overflow-hidden">
                <div
                    ref={fillRef}
                    className="w-full origin-top"
                    style={{ height: "0%", background: "hsl(var(--primary))" }}
                />
            </div>

            <div className="flex flex-col gap-10">
                {data.map((item, index) => (
                    <div
                        key={index}
                        ref={el => { itemRefs.current[index] = el }}
                        className="flex gap-7 items-start"
                        style={{ opacity: 0 }}
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
                    </div>
                ))}
            </div>
        </div>
    )
}
