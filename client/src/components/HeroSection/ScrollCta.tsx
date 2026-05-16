"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ChevronDown } from "lucide-react"

const MUTED = "rgba(15,23,42,0.45)"

export default function ScrollCta({ label }: { label: string }) {
    const buttonRef  = useRef<HTMLButtonElement>(null)
    const chevronRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.fromTo(buttonRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.55 })
        gsap.to(chevronRef.current, { y: 5, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut" })
    }, [])

    const scrollDown = () => {
        const section = document.querySelector("#home-alt")
        if (section) window.scrollTo({ top: section.clientHeight, behavior: "smooth" })
    }

    return (
        <button
            ref={buttonRef}
            onClick={scrollDown}
            style={{ opacity: 0, color: MUTED, fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)", letterSpacing: "0.1em" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer"
        >
            <span className="uppercase tracking-widest">{label}</span>
            <div ref={chevronRef}>
                <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
            </div>
        </button>
    )
}
