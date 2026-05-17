"use client"

import { ReactNode, useContext, useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import { SceneScrollContext, SceneSubscribe } from "./SceneScrollContext"
import { ActiveContext, SCENE_RUNWAY_VH } from "./SceneTransition"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

/**
 * Wraps the final scene so it gets its own scroll-driven progress animation.
 *
 * While still in the overlay/fade-in phase (ActiveContext = false):
 *   - fires cb(1) immediately on subscribe → widgets visible at completed state
 *
 * Once settled into normal page flow (ActiveContext = true):
 *   - creates a sticky runway, drives cb(progress) 0→1 via ScrollTrigger
 *   - widgets animate from scratch as the user scrolls through the runway
 *
 * Uses a single stable subscribe reference so widget useEffects never re-run
 * (no GSAP reset flash on the done→true transition).
 */
export function FinalScrollScene({ children }: { children: ReactNode }) {
    const isDone = useContext(ActiveContext)

    const runwayRef    = useRef<HTMLDivElement>(null)
    const listenersRef = useRef<Set<(p: number) => void>>(new Set())

    // Keep a ref so the stable closure can read the latest isDone without re-creating
    const isDoneRef   = useRef(isDone)
    isDoneRef.current = isDone

    // Stable identity - never changes, so widget useEffects[subscribe] never re-run
    const stableSubscribe = useRef<SceneSubscribe>((cb) => {
        // Fire 1 immediately while widgets are rendered during the overlay phase
        if (!isDoneRef.current) cb(1)
        listenersRef.current.add(cb)
        return () => { listenersRef.current.delete(cb) }
    }).current

    useEffect(() => {
        if (!isDone) return

        const runway = runwayRef.current
        if (!runway) return

        const runwayH = window.innerHeight * SCENE_RUNWAY_VH / 100
        runway.style.height = `${runwayH}px`

        // Reset all listeners to progress 0 so animations replay from scratch
        listenersRef.current.forEach((cb) => cb(0))

        const st = ScrollTrigger.create({
            trigger: runway,
            start: "top top",
            end: `+=${runwayH}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                listenersRef.current.forEach((cb) => cb(self.progress))
            },
        })

        const onResize = () => {
            runway.style.height = `${window.innerHeight * SCENE_RUNWAY_VH / 100}px`
            ScrollTrigger.refresh()
        }
        window.addEventListener("resize", onResize, { passive: true })
        ScrollTrigger.refresh()

        return () => {
            st.kill()
            window.removeEventListener("resize", onResize)
        }
    }, [isDone])

    return (
        <div ref={runwayRef} style={isDone ? { height: `${SCENE_RUNWAY_VH}vh` } : undefined}>
            <div className={isDone ? "sticky top-0 h-screen w-full overflow-hidden" : undefined}>
                <SceneScrollContext.Provider value={stableSubscribe}>
                    {children}
                </SceneScrollContext.Provider>
            </div>
        </div>
    )
}
