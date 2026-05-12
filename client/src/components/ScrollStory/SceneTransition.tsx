"use client"

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const FADE_OUT = [0.38, 0.50] as const
const FADE_IN  = [0.40, 0.55] as const

export const SCENE_RUNWAY_VH = 300
export const SCENE_THRESHOLD = 0.55

// -(1 - SCENE_THRESHOLD) * SCENE_RUNWAY_VH = -135vh
// This is invariant to extraH: the math cancels out (see inline comment below).
const MARGIN = "-135vh"

// Guards nested SceneTransitions: when false (inside a fixed overlay), the nested
// transition must not apply its own scroll transforms.
const ActiveContext = createContext(true)

export function SceneTransition({ from, to }: { from: ReactNode; to: ReactNode }) {
    const isActive = useContext(ActiveContext)

    const runwayRef  = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    // transitionH: the fixed crossfade runway in px (300vh).
    const [transitionH, setTransitionH] = useState(0)
    useEffect(() => {
        const update = () => setTransitionH(SCENE_RUNWAY_VH * window.innerHeight / 100)
        update()
        window.addEventListener("resize", update, { passive: true })
        return () => window.removeEventListener("resize", update)
    }, [])

    // extraH: how many pixels the from-scene content exceeds one viewport height.
    const [extraH, setExtraH] = useState(0)
    useEffect(() => {
        const el = contentRef.current
        if (!el) return
        const update = () => {
            const contentH = el.getBoundingClientRect().height
            setExtraH(Math.max(0, contentH - window.innerHeight))
        }
        const ro = new ResizeObserver(update)
        ro.observe(el)
        window.addEventListener("resize", update, { passive: true })
        return () => {
            ro.disconnect()
            window.removeEventListener("resize", update)
        }
    }, [])

    // Total runway = extra content scroll + crossfade scroll.
    const runwayH = transitionH > 0 ? extraH + transitionH : 0

    // p0 = fraction of the runway that is "content scroll" before crossfade begins.
    const p0 = runwayH > 0 ? extraH / runwayH : 0

    // Publish the done-at document pixel so SceneIndicator / ScrollProgressBar can read it.
    // Proof that MARGIN stays -135vh regardless of extraH:
    //   doneAt   = runwayTop + extraH + SCENE_THRESHOLD * transitionH
    //   relative = doneAt - (runwayTop + runwayH)
    //            = extraH + SCENE_THRESHOLD * transitionH - (extraH + transitionH)
    //            = -(1 - SCENE_THRESHOLD) * transitionH = -135vh  ✓
    useEffect(() => {
        const el = runwayRef.current
        if (!el || transitionH === 0) return
        const update = () => {
            const runwayTop = el.getBoundingClientRect().top + window.scrollY
            const doneAt    = Math.round(runwayTop + extraH + SCENE_THRESHOLD * transitionH)
            el.setAttribute("data-scene-done-px", String(doneAt))
        }
        update()
        window.addEventListener("resize", update, { passive: true })
        return () => window.removeEventListener("resize", update)
    }, [extraH, transitionH])

    const { scrollYProgress } = useScroll({
        target: runwayRef,
        offset: ["start start", "end start"],
    })

    // Adjusted fade / done thresholds that account for the content-scroll phase.
    const fo0  = p0 + FADE_OUT[0] * (1 - p0)
    const fo1  = p0 + FADE_OUT[1] * (1 - p0)
    const fi0  = p0 + FADE_IN[0]  * (1 - p0)
    const fi1  = p0 + FADE_IN[1]  * (1 - p0)
    const doneP = p0 + SCENE_THRESHOLD * (1 - p0)

    // Keep doneP and isActive in refs so the scroll subscription never goes stale.
    const donePRef    = useRef(doneP)
    const isActiveRef = useRef(isActive)
    donePRef.current    = doneP
    isActiveRef.current = isActive

    const [done, setDone] = useState(false)
    useEffect(() => {
        return scrollYProgress.on("change", (v) => {
            setDone(isActiveRef.current && v >= donePRef.current)
        })
    }, [scrollYProgress])

    // Scroll the from-content upward during the content-scroll phase so it looks
    // like natural page scroll. After p0 the value is clamped at -extraH, freezing
    // the visible portion at the bottom of the content for the crossfade.
    const safeP0   = Math.max(p0, 0.0001)
    const contentY = useTransform(scrollYProgress, [0, safeP0], [0, -extraH], { clamp: true })

    const fromOpacity = useTransform(scrollYProgress, [fo0, fo1], [1, 0])
    const fromYAnim   = useTransform(scrollYProgress, [fo0, fo1], [0, -16])
    const fromScale   = useTransform(scrollYProgress, [fo0, fo1], [1, 0.92])
    const fromFilter  = useTransform(scrollYProgress, [fo0, fo1], ["blur(0px)", "blur(4px)"])

    const toOpacity = useTransform(scrollYProgress, [fi0, fi1], [0, 1])
    const toY       = useTransform(scrollYProgress, [fi0, fi1], [16, 0])
    const toScale   = useTransform(scrollYProgress, [fi0, fi1], [1.08, 1])
    const toFilter  = useTransform(scrollYProgress, [fi0, fi1], ["blur(4px)", "blur(0px)"])

    return (
        <>
            <div
                ref={runwayRef}
                className="relative"
                style={{ height: runwayH > 0 ? runwayH : `${SCENE_RUNWAY_VH}vh` }}
            >
                {/* Outer: h-screen clip + crossfade transforms */}
                <motion.div
                    className="sticky top-0 h-screen w-full overflow-hidden"
                    style={isActive ? { opacity: fromOpacity, y: fromYAnim, scale: fromScale, filter: fromFilter } : {}}
                >
                    {/* Inner: min-h-screen content, translated to simulate natural scrolling */}
                    <motion.div
                        ref={contentRef}
                        className="min-h-screen w-full"
                        style={isActive ? { y: contentY } : {}}
                    >
                        {from}
                    </motion.div>
                </motion.div>
            </div>

            <ActiveContext.Provider value={done}>
                {isActive && (
                    <motion.div
                        className={`z-10 ${done ? "relative" : "fixed inset-0 pointer-events-none"}`}
                        style={done
                            ? { marginTop: MARGIN }
                            : { opacity: toOpacity, y: toY, scale: toScale, filter: toFilter }
                        }
                    >
                        {to}
                    </motion.div>
                )}
            </ActiveContext.Provider>
        </>
    )
}
