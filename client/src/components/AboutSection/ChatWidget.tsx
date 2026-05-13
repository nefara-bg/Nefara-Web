"use client"

import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import { SceneScrollContext } from "@/components/ScrollStory/SceneScrollContext"

const stops = [
    { start: 0.35, end: 0.57, fromX: -8 },
    { start: 0.57, end: 0.79, fromX:  8 },
    { start: 0.79, end: 1.00, fromX:  0 },
] as const

const fade = (v: number, a: number, b: number) =>
    Math.max(0, Math.min(1, (v - a) / (b - a)))

export default function ChatWidget() {
    const t = useTranslations("about.widgets.chat")
    const subscribe = useContext(SceneScrollContext)
    const itemsRef   = useRef<(HTMLDivElement | null)[]>([])
    const avatarsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const apply = (v: number) => {
            itemsRef.current.forEach((el, i) => {
                if (!el) return
                const s = stops[i]
                const k = fade(v, s.start, s.end)
                gsap.set(el, { opacity: k, x: s.fromX * (1 - k) })

                const av = avatarsRef.current[i]
                if (av) gsap.set(av, { scale: k, rotate: (1 - k) * -45 })
            })
        }
        apply(0)
        return subscribe(apply)
    }, [subscribe])

    const borderTopRef = useRef<HTMLDivElement>(null)
    const borderBotRef = useRef<HTMLDivElement>(null)

    const LINE_START = 0.0
    const LINE_END   = 0.85

    useEffect(() => {
        gsap.set([borderTopRef.current, borderBotRef.current], { scaleX: 0, transformOrigin: "left center" })
        return subscribe((v) => {
            const k = Math.max(0, Math.min(1, (v - LINE_START) / (LINE_END - LINE_START)))
            gsap.set([borderTopRef.current, borderBotRef.current], { scaleX: k })
        })
    }, [subscribe])

    const setRef       = (i: number) => (el: HTMLDivElement | null) => { itemsRef.current[i] = el }
    const setAvatarRef = (i: number) => (el: HTMLDivElement | null) => { avatarsRef.current[i] = el }

    return (
        <div
            className="select-none w-full h-full flex flex-col"
        >
            {/* Header */}
            <div
                className="relative flex items-center gap-3 px-6 py-4"
            >
                {/* Top border — fills left to right on scroll */}
                <div ref={borderTopRef} className="absolute inset-x-0 top-0 h-px" style={{ background: "hsl(var(--border))", transform: "scaleX(0)", transformOrigin: "left center" }} />
                {/* Bottom border — fills left to right on scroll */}
                <div ref={borderBotRef} className="absolute inset-x-0 bottom-0 h-px" style={{ background: "hsl(var(--border))", transform: "scaleX(0)", transformOrigin: "left center" }} />
                <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden"
                    style={{ background: "hsl(var(--primary)/0.15)" }}>
                    <img src="/features/nefara-pfp.svg" alt="Nefara" className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="text-sm font-semibold leading-none mb-0.5" style={{ color: "hsl(var(--foreground))" }}>
                        Nefara
                    </p>
                    <p className="text-xs" style={{ color: "#22c55e" }}>Active now</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col flex-1 justify-between px-6 py-6">

                {/* Incoming */}
                <div ref={setRef(0)} className="flex items-end gap-2" style={{ opacity: 0 }}>
                    <div ref={setAvatarRef(0)} className="w-6 h-6 rounded-full flex-shrink-0 overflow-hidden"
                        style={{ background: "hsl(var(--primary)/0.15)" }}>
                        <img src="/features/nefara-pfp.svg" alt="Nefara" className="w-full h-full object-cover" />
                    </div>
                    <p
                        className="text-sm leading-relaxed px-4 py-2.5 max-w-[80%]"
                        style={{
                            background: "hsl(var(--primary)/0.1)",
                            color: "hsl(var(--foreground)/0.85)",
                            borderRadius: "0 var(--radius-lg) var(--radius-lg) var(--radius-lg)",
                        }}
                    >
                        {t("message1")}
                    </p>
                </div>

                {/* Outgoing */}
                <div ref={setRef(1)} className="flex items-end gap-2 justify-end" style={{ opacity: 0 }}>
                    <p
                        className="text-sm leading-relaxed px-4 py-2.5 max-w-[80%]"
                        style={{
                            background: "hsl(var(--primary))",
                            color: "hsl(var(--background))",
                            borderRadius: "var(--radius-lg) var(--radius-lg) 0 var(--radius-lg)",
                        }}
                    >
                        {t("message2")}
                    </p>
                    <div
                        className="w-6 h-6 rounded-full flex-shrink-0 grid place-items-center text-[10px] font-bold"
                        style={{ background: "hsl(var(--foreground)/0.08)", color: "hsl(var(--foreground)/0.4)" }}
                    >
                        C
                    </div>
                </div>

                {/* Typing */}
                <div ref={setRef(2)} className="flex items-end gap-2" style={{ opacity: 0 }}>
                    <div ref={setAvatarRef(2)} className="w-6 h-6 rounded-full flex-shrink-0 overflow-hidden"
                        style={{ background: "hsl(var(--primary)/0.15)" }}>
                        <img src="/features/nefara-pfp.svg" alt="Nefara" className="w-full h-full object-cover" />
                    </div>
                    <div
                        className="flex items-center gap-1 px-4 py-3"
                        style={{ borderRadius: "0 var(--radius-lg) var(--radius-lg) var(--radius-lg)", background: "hsl(var(--primary)/0.1)" }}
                    >
                        {[0, 0.22, 0.44].map((d, i) => (
                            <span key={i} style={{
                                display: "block", width: 6, height: 6, borderRadius: "50%",
                                background: "hsl(var(--primary))",
                                animation: `typingBounce 1.4s ease-in-out ${d}s infinite`,
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
