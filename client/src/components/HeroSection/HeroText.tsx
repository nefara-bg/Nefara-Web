"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function HeroText({ title, content }: { title: string; content: string }) {
    const h1Ref = useRef<HTMLHeadingElement>(null)
    const pRef  = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        gsap.fromTo(h1Ref.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1 })
        gsap.fromTo(pRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.22 })
    }, [])

    return (
        <>
            <h1
                ref={h1Ref}
                style={{ opacity: 0, fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.08 }}
                className="text-center font-manrope font-bold tracking-tight text-white"
            >
                {title}
            </h1>
            <p
                ref={pRef}
                style={{ opacity: 0 }}
                className="text-center text-white/70 text-lg leading-relaxed max-w-2xl"
            >
                {content}
            </p>
        </>
    )
}
