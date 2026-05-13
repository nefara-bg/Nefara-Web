"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

const PRIMARY    = "hsl(var(--primary))"
const FOREGROUND = "hsl(var(--foreground))"
const GLOW       = "0 0 10px 1px hsl(var(--primary) / 0.55)"
const NO_GLOW    = "none"

// GSAP cannot interpolate hsl(var(--x)) — set color/shadow directly on .style
function applyColor(dot: HTMLSpanElement, active: boolean) {
    dot.style.backgroundColor = active ? PRIMARY : FOREGROUND
    dot.style.boxShadow       = active ? GLOW    : NO_GLOW
}

export function SceneIndicator({ scenes }: { scenes: number }) {
    const innerRef = useRef<HTMLDivElement>(null)
    const dotsRef  = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        const inner = innerRef.current
        if (!inner) return

        let donePts: number[] = []
        let lastIdx = -1

        const readPts = () => {
            donePts = Array.from(document.querySelectorAll("[data-scene-done-px]"))
                .map((el) => Number(el.getAttribute("data-scene-done-px")))
                .sort((a, b) => a - b)
        }
        readPts()

        const setActive = (idx: number) => {
            if (idx === lastIdx) return
            lastIdx = idx
            dotsRef.current.forEach((dot, i) => {
                if (!dot) return
                const active = i === idx
                applyColor(dot, active)
                gsap.to(dot, {
                    width:   active ? 26 : 6,
                    opacity: active ? 1 : 0.35,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: "auto",
                })
            })
        }

        const update = () => {
            const y   = window.scrollY
            const idx = Math.min(scenes - 1, donePts.filter((p) => y >= p).length)
            setActive(idx)

            const lockY = donePts.at(-1) ?? Number.MAX_SAFE_INTEGER
            const vh    = window.innerHeight
            const t     = Math.max(0, Math.min(1, (y - lockY) / vh))
            gsap.set(inner, { y: -vh * t })
        }
        update()

        const st = ScrollTrigger.create({
            start: 0,
            end: () => document.documentElement.scrollHeight,
            onUpdate: update,
        })

        const mo = new MutationObserver(() => { readPts(); update() })
        mo.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ["data-scene-done-px"],
        })
        window.addEventListener("resize", () => { readPts(); update() }, { passive: true })

        // Seed initial colors, then spring dots into view
        dotsRef.current.forEach((dot, i) => {
            if (!dot) return
            applyColor(dot, i === 0)
            gsap.set(dot, { scale: 0, opacity: 0, width: i === 0 ? 26 : 6 })
            gsap.to(dot, {
                scale: 1,
                opacity: i === 0 ? 1 : 0.35,
                duration: 0.55,
                delay: 0.15 + i * 0.09,
                ease: "back.out(1.7)",
            })
        })

        return () => {
            st.kill()
            mo.disconnect()
        }
    }, [scenes])

    return (
        <div
            aria-hidden
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
            <div
                ref={innerRef}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-background"
            >
                {Array.from({ length: scenes }).map((_, i) => (
                    <span
                        key={i}
                        ref={(el) => { dotsRef.current[i] = el }}
                        className="block h-1.5 rounded-full"
                        style={{ opacity: 0 }}
                    />
                ))}
            </div>
        </div>
    )
}
