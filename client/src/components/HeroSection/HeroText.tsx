"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const HEADING = "#0F172A"
const BODY    = "#1E4D47"

export function HeroText({ title, content }: { title: string; content: string }) {
    const h1Ref = useRef<HTMLHeadingElement>(null)
    const pRef  = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        gsap.fromTo(h1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power3.out" })
        gsap.fromTo(pRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.25, ease: "power3.out" })
    }, [])

    return (
        <>
            <h1
                ref={h1Ref}
                style={{ opacity: 0, fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 1.06, color: HEADING, letterSpacing: "-0.02em" }}
                className="text-center font-manrope font-bold"
            >
                {title}
            </h1>
            <p
                ref={pRef}
                style={{ opacity: 0, color: BODY }}
                className="text-center text-lg leading-relaxed max-w-xl"
            >
                {content}
            </p>
        </>
    )
}
