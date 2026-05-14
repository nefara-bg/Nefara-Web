"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
    index: number
    name: string
    slug: string
    accent: string
}

export function ProductVisual({ index, name, slug, accent }: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        const glow = glowRef.current
        const img = imageRef.current
        if (!el || !glow || !img) return

        gsap.set(el, { opacity: 0, scale: 0.96 })
        gsap.set(glow, { opacity: 0 })
        gsap.set(img, { opacity: 0, scale: 1.04 })

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top bottom-=60px",
            onEnter: () => {
                gsap.to(el, { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" })
                gsap.to(glow, { opacity: 1, duration: 1.4, ease: "power2.out" })
                gsap.to(img, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" })
            },
            once: true,
        })

        const float = gsap.to(glow, {
            x: "+=14",
            y: "-=10",
            duration: 4.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        })

        return () => {
            trigger.kill()
            float.kill()
        }
    }, [])

    return (
        <div
            ref={ref}
            className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm"
            style={{ opacity: 0 }}
        >
            <div
                ref={glowRef}
                className="pointer-events-none absolute -inset-10 z-0 blur-3xl"
                style={{ background: accent, opacity: 0 }}
                aria-hidden="true"
            />
            <div ref={imageRef} className="absolute inset-0 z-10">
                <Image
                    src={`/work/${slug}.png`}
                    alt={name}
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover"
                    priority={index === 0}
                />
            </div>
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute inset-0 z-30 flex flex-col justify-between p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">
                    0{index + 1} / 04
                </span>
                <span className="font-display text-3xl font-bold text-foreground tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    {name}
                </span>
            </div>
        </div>
    )
}
