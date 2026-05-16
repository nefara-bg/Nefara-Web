"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ChevronDown } from "lucide-react"

export default function ScrollCta({ label }: { label: string }) {
    const buttonRef  = useRef<HTMLButtonElement>(null)
    const chevronRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.fromTo(buttonRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.4 }
        )
        gsap.to(chevronRef.current, {
            y: 4,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        })
    }, [])

    const scrollDown = () => {
        const section = document.querySelector("#home-alt")
        if (section) window.scrollTo({ top: section.clientHeight, behavior: "smooth" })
    }

    return (
        <button
            ref={buttonRef}
            onClick={scrollDown}
            style={{ opacity: 0, fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)", letterSpacing: "0.08em" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors cursor-pointer group"
        >
            <span className="uppercase tracking-widest">{label}</span>
            <div ref={chevronRef}>
                <ChevronDown className="w-4 h-4 group-hover:text-white transition-colors" strokeWidth={1.5} />
            </div>
        </button>
    )
}
