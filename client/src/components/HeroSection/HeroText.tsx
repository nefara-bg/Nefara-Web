"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function HeroText({ title, content }: { title: string; content: string }) {
    const h1Ref = useRef<HTMLHeadingElement>(null)
    const pRef  = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        gsap.fromTo(h1Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.05 })
        gsap.fromTo(pRef.current,  { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.15 })
    }, [])

    return (
        <>
            <h1
                ref={h1Ref}
                style={{ opacity: 0 }}
                className="text-center font-manrope font-bold tracking-tight text-6xl leading-none"
            >
                {title}
            </h1>
            <p
                ref={pRef}
                style={{ opacity: 0 }}
                className="text-center text-muted-foreground text-lg leading-relaxed max-w-2xl"
            >
                {content}
            </p>
        </>
    )
}
