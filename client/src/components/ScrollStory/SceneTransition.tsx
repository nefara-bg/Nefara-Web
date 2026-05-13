"use client"

import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SceneScrollContext, SceneSubscribe } from "./SceneScrollContext"

// Subscribe that immediately fires progress=1 — used for static (non-scrolled) to-scenes
const completeSubscribe: SceneSubscribe = (cb) => { cb(1); return () => {} }

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

const FADE_OUT = [0.38, 0.50] as const
const FADE_IN  = [0.40, 0.55] as const

export const SCENE_RUNWAY_VH = 300
export const SCENE_THRESHOLD = 0.55

const MARGIN = "-135vh"

export const ActiveContext = createContext(true)

export function SceneTransition({ from, to }: { from: ReactNode; to: ReactNode }) {
    const isActive = useContext(ActiveContext)

    const runwayRef  = useRef<HTMLDivElement>(null)
    const outerRef   = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const toRef      = useRef<HTMLDivElement>(null)

    const [done, setDone] = useState(false)
    const doneRef = useRef(false)

    const listenersRef = useRef<Set<(p: number) => void>>(new Set())
    const subscribe = useRef<SceneSubscribe>((cb) => {
        listenersRef.current.add(cb)
        return () => { listenersRef.current.delete(cb) }
    }).current

    useEffect(() => {
        if (!isActive) return
        const runway = runwayRef.current
        const outer  = outerRef.current
        const content = contentRef.current
        const toEl   = toRef.current
        if (!runway || !outer || !content || !toEl) return

        let transitionH = window.innerHeight * SCENE_RUNWAY_VH / 100
        let extraH = Math.max(0, content.getBoundingClientRect().height - window.innerHeight)
        let runwayH = extraH + transitionH

        const apply = () => {
            runway.style.height = `${runwayH}px`
            const runwayTop = runway.getBoundingClientRect().top + window.scrollY
            const doneAt = Math.round(runwayTop + extraH + SCENE_THRESHOLD * transitionH)
            runway.setAttribute("data-scene-done-px", String(doneAt))
        }
        apply()

        const fade = (p: number, [a, b]: readonly [number, number]) =>
            Math.max(0, Math.min(1, (p - a) / (b - a)))

        const st = ScrollTrigger.create({
            trigger: runway,
            start: "top top",
            end: () => `+=${runwayH}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const v = self.progress
                const p0 = runwayH > 0 ? extraH / runwayH : 0
                const safeP0 = Math.max(p0, 0.0001)
                const contentPhase = Math.min(1, v / safeP0)
                gsap.set(content, { y: -extraH * contentPhase })

                const fo0 = p0 + FADE_OUT[0] * (1 - p0)
                const fo1 = p0 + FADE_OUT[1] * (1 - p0)
                const fi0 = p0 + FADE_IN[0]  * (1 - p0)
                const fi1 = p0 + FADE_IN[1]  * (1 - p0)
                const doneP = p0 + SCENE_THRESHOLD * (1 - p0)

                const fout = fade(v, [fo0, fo1])
                gsap.set(outer, {
                    opacity: 1 - fout,
                    y: -16 * fout,
                    scale: 1 - 0.08 * fout,
                    filter: `blur(${4 * fout}px)`,
                })

                const isDone = v >= doneP
                if (isDone !== doneRef.current) {
                    doneRef.current = isDone
                    setDone(isDone)
                }

                if (!isDone) {
                    const fin = fade(v, [fi0, fi1])
                    gsap.set(toEl, {
                        opacity: fin,
                        y: 16 * (1 - fin),
                        scale: 1.08 - 0.08 * fin,
                        filter: `blur(${4 * (1 - fin)}px)`,
                    })
                } else {
                    gsap.set(toEl, { clearProps: "opacity,y,scale,filter,transform" })
                }

                // Normalize 0→1 over [0, fo0*0.75] so subscribers complete well before the from-scene fades out
                const normalized = fo0 > 0 ? Math.min(1, v / (fo0 * 0.75)) : 1
                listenersRef.current.forEach((cb) => cb(normalized))
            },
        })

        const ro = new ResizeObserver(() => {
            extraH = Math.max(0, content.getBoundingClientRect().height - window.innerHeight)
            runwayH = extraH + transitionH
            apply()
            ScrollTrigger.refresh()
        })
        ro.observe(content)

        const onResize = () => {
            transitionH = window.innerHeight * SCENE_RUNWAY_VH / 100
            extraH = Math.max(0, content.getBoundingClientRect().height - window.innerHeight)
            runwayH = extraH + transitionH
            apply()
            ScrollTrigger.refresh()
        }
        window.addEventListener("resize", onResize, { passive: true })

        return () => {
            st.kill()
            ro.disconnect()
            window.removeEventListener("resize", onResize)
        }
    }, [isActive])

    useEffect(() => {
        if (typeof window !== "undefined") ScrollTrigger.refresh()
    }, [done])

    return (
        <>
            <div ref={runwayRef} className="relative" style={{ height: `${SCENE_RUNWAY_VH}vh` }}>
                <div
                    ref={outerRef}
                    className="sticky top-0 h-screen w-full overflow-hidden"
                    style={isActive ? { willChange: "transform, opacity, filter" } : {}}
                >
                    <div ref={contentRef} className="min-h-screen w-full">
                        <SceneScrollContext.Provider value={subscribe}>
                            {from}
                        </SceneScrollContext.Provider>
                    </div>
                </div>
            </div>

            <ActiveContext.Provider value={done}>
                {isActive && (
                    <div
                        ref={toRef}
                        className={`z-10 ${done ? "relative" : "fixed inset-0 pointer-events-none"}`}
                        style={done ? { marginTop: MARGIN } : { opacity: 0 }}
                    >
                        <SceneScrollContext.Provider value={completeSubscribe}>
                            {to}
                        </SceneScrollContext.Provider>
                    </div>
                )}
            </ActiveContext.Provider>
        </>
    )
}
