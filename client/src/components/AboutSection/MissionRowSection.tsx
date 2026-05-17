"use client"

import { ReactNode, useEffect, useRef } from "react"
import FeatureCardFlow from "./FeatureCardFlow"
import WidgetCell from "./WidgetCell"

export function MissionRowSection({
    num,
    title,
    desc,
    widget,
    widgetSide,
}: {
    num: string
    title: string
    desc: string
    widget: ReactNode
    widgetSide: "left" | "right"
}) {
    const widgetWrapRef = useRef<HTMLDivElement>(null)
    const lineL         = useRef<HTMLDivElement>(null)
    const lineR         = useRef<HTMLDivElement>(null)

    // offsetLeft/offsetWidth are layout-space measurements unaffected by CSS transforms.
    // widgetWrapRef.offsetParent === section (nearest position:relative ancestor),
    // so offsetLeft gives the exact value needed for position:absolute left on the lines.
    useEffect(() => {
        const place = () => {
            const wrap = widgetWrapRef.current
            if (!wrap || !lineL.current || !lineR.current) return
            lineL.current.style.left = `${wrap.offsetLeft}px`
            lineR.current.style.left = `${wrap.offsetLeft + wrap.offsetWidth}px`
        }

        const raf = requestAnimationFrame(place)
        const ro  = new ResizeObserver(place)
        if (widgetWrapRef.current) ro.observe(widgetWrapRef.current)
        window.addEventListener("resize", place)
        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            window.removeEventListener("resize", place)
        }
    }, [])

    return (
        <section
            className="relative min-h-screen py-16 md:py-32 bg-background flex flex-col justify-center"
            style={{ transform: "translateZ(0)" }}
        >
            <div ref={lineL} className="pointer-events-none absolute top-0 bottom-0 w-px" style={{ background: "hsl(var(--border))" }} />
            <div ref={lineR} className="pointer-events-none absolute top-0 bottom-0 w-px" style={{ background: "hsl(var(--border))" }} />

            <div className="relative max-w-7xl px-4 flex items-center mx-auto w-full flex-1">
                <div className={`flex w-full h-full items-stretch ${widgetSide === "left" ? "flex-col-reverse md:flex-row" : "flex-col md:flex-row"}`}>
                    {widgetSide === "left" ? (
                        <>
                            <div ref={widgetWrapRef} className="w-full h-full">
                                <WidgetCell>{widget}</WidgetCell>
                            </div>
                            <FeatureCardFlow num={num} title={title} desc={desc} />
                        </>
                    ) : (
                        <>
                            <FeatureCardFlow num={num} title={title} desc={desc} />
                            <div ref={widgetWrapRef} className="w-full h-full">
                                <WidgetCell>{widget}</WidgetCell>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
