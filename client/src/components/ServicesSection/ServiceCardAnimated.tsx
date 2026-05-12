"use client"
import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "motion/react"

const DOWN = { opacity: 0, y: 52, scale: 0.93, filter: "blur(6px)" }
const UP   = { opacity: 0, y: -32, scale: 1.05, filter: "blur(6px)" }
const IN   = { opacity: 1, y: 0,   scale: 1,    filter: "blur(0px)" }

export function ServiceCardAnimated({
    children,
    delay = 0,
}: {
    children: React.ReactNode
    delay?: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const prevY = useRef(0)
    const [dir, setDir] = useState<"down" | "up">("down")
    const isInView = useInView(ref, { once: false, margin: "-60px" })

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            setDir(y > prevY.current ? "down" : "up")
            prevY.current = y
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <motion.div
            ref={ref}
            initial={false}
            animate={isInView ? IN : dir === "down" ? DOWN : UP}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}
