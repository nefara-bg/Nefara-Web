"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useMotionValue, useSpring } from "motion/react"

type Props = {
    value: number
    decimals?: number
    prefix?: string
    suffix?: string
    className?: string
}

export function AnimatedNumber({ value, decimals = 0, prefix = "", suffix = "", className }: Props) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: "-50px" })
    const motionVal = useMotionValue(0)
    const spring = useSpring(motionVal, { damping: 40, stiffness: 150, mass: 1 })
    const [display, setDisplay] = useState(decimals > 0 ? (0).toFixed(decimals) : "0")

    useEffect(() => {
        if (inView) motionVal.set(value)
    }, [inView, motionVal, value])

    useEffect(() => {
        return spring.on("change", (v) => {
            setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString())
        })
    }, [spring, decimals])

    return (
        <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
            {prefix}
            {display}
            {suffix}
        </span>
    )
}
