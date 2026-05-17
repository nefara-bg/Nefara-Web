"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

// Each SceneTransition writes data-scene-done-px when it completes.
// We know the total number of transitions upfront (scenes - 1).
// Progress = (completedSegments + intraSegmentProgress) / totalSegments
// so the bar never snaps back when a new done-px appears.
export function ScrollProgressBar({ transitions = 0 }: { transitions?: number }) {
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const bar = barRef.current
        if (!bar || transitions === 0) return

        let donePts: number[] = []

        const readPts = () => {
            donePts = Array.from(document.querySelectorAll("[data-scene-done-px]"))
                .map((el) => Number(el.getAttribute("data-scene-done-px")))
                .sort((a, b) => a - b)
        }
        readPts()

        const update = () => {
            const y = window.scrollY
            const N = transitions

            const completed = donePts.filter((p) => y >= p).length

            if (completed >= N) {
                gsap.set(bar, { scaleX: 1 })
                return
            }

            const lastPt = donePts[completed - 1] ?? 0
            const nextPt = donePts[completed]

            let intra = 0
            if (nextPt != null) {
                intra = Math.max(0, Math.min(1, (y - lastPt) / (nextPt - lastPt)))
            } else {
                // Next segment not yet written - interpolate over an estimated 300vh segment
                const estimated = window.innerHeight * 3
                intra = Math.max(0, Math.min(0.99, (y - lastPt) / estimated))
            }

            gsap.set(bar, { scaleX: Math.min(1, (completed + intra) / N) })
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
        window.addEventListener("resize", update, { passive: true })

        return () => {
            st.kill()
            mo.disconnect()
        }
    }, [transitions])

    return (
        <div className="fixed top-16 left-0 right-0 h-1 bg-black/[0.04] z-30 pointer-events-none">
            <div
                ref={barRef}
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-strong))]"
            />
        </div>
    )
}
