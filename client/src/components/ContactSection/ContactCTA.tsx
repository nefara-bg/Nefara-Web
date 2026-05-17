"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function SkewButton({
    href,
    children,
    filled = false,
}: {
    href: string
    children: React.ReactNode
    filled?: boolean
}) {
    return (
        <Link href={href} data-cta-item className="group block">
            <div
                className="relative overflow-hidden transition-all duration-200"
                style={{
                    transform: "skewX(-8deg)",
                    borderRadius: "10px",
                    background: filled ? "hsl(var(--secondary))" : "transparent",
                    border: filled
                        ? "1.5px solid hsl(var(--secondary))"
                        : "1.5px solid hsl(var(--secondary) / 0.3)",
                }}
            >
                {/* Hover fill for outlined variant */}
                {!filled && (
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: "hsl(var(--secondary) / 0.06)" }}
                    />
                )}

                <div
                    className="relative flex items-center justify-between gap-6 px-5 py-3"
                    style={{ transform: "skewX(8deg)" }}
                >
                    <span
                        className="text-sm font-semibold"
                        style={{ color: filled ? "#fff" : "hsl(var(--secondary))" }}
                    >
                        {children}
                    </span>
                    <ArrowRight
                        className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: filled ? "hsl(var(--primary))" : "hsl(var(--secondary))" }}
                    />
                </div>
            </div>
        </Link>
    )
}

export function ContactCTA() {
    const t = useTranslations("contact")

    const bannerRef = useRef<HTMLDivElement>(null)
    const darkRef = useRef<HTMLDivElement>(null)
    const lightRef = useRef<HTMLDivElement>(null)
    const stripeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const banner = bannerRef.current
        if (!banner) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: { trigger: banner, start: "top 78%", once: true },
            })

            // Colored panels slide in to meet at the seam, stripe drops last.
            tl.from(darkRef.current, { xPercent: -105, duration: 0.7 })
                .from(lightRef.current, { xPercent: 105, duration: 0.7 }, "<")
                .from(
                    stripeRef.current,
                    { x: -160, autoAlpha: 0, duration: 0.55 },
                    "-=0.35"
                )
                // Content rises in, staggered.
                .from(
                    banner.querySelectorAll<HTMLElement>("[data-cta-item]"),
                    { y: 28, autoAlpha: 0, duration: 0.6, stagger: 0.12 },
                    "-=0.25"
                )
        }, banner)

        return () => ctx.revert()
    }, [])

    return (
        <section className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div
                    ref={bannerRef}
                    className="relative overflow-hidden rounded-2xl"
                    style={{ border: "1px solid hsl(202 60% 10%)" }}
                >
                    {/* ── Background panels ── */}
                    <div
                        ref={darkRef}
                        className="absolute inset-y-0 left-0"
                        style={{ right: "38%", background: "hsl(var(--secondary))" }}
                    />
                    <div
                        ref={lightRef}
                        className="absolute inset-y-0 right-0"
                        style={{ left: "62%", background: "hsl(var(--background))" }}
                    />
                    {/* Teal diagonal stripe */}
                    <div
                        ref={stripeRef}
                        className="absolute inset-y-0"
                        style={{
                            left: "calc(62% - 40px)",
                            width: "80px",
                            background: "hsl(var(--primary))",
                            transform: "skewX(-8deg)",
                        }}
                    />

                    {/* ── Content ── */}
                    <div className="relative flex min-h-[260px] lg:min-h-[300px]">

                        {/* Left: heading + subtitle — width matches the dark panel end */}
                        <div className="flex flex-col justify-center gap-4 p-10 pr-16 lg:p-14 lg:pr-20" style={{ width: "65%" }}>
                            <h2 data-cta-item className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight text-white max-w-xs lg:max-w-md">
                                {t("cta.title")}
                            </h2>
                            <p data-cta-item className="text-sm lg:text-base text-white/50 leading-relaxed max-w-xs lg:max-w-sm">
                                {t("cta.subtitle")}
                            </p>
                        </div>

                        {/* Right: skewed buttons — starts inside the light panel */}
                        <div className="flex-1 flex flex-col justify-center gap-3 px-6 lg:px-8">
                            <SkewButton href="/contact" filled>
                                {t("cta.button")}
                            </SkewButton>
                            <SkewButton href="/team">
                                {t("cta.secondaryButton")}
                            </SkewButton>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
