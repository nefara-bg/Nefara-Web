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
                    className="relative flex flex-col overflow-hidden rounded-2xl lg:min-h-[300px] lg:flex-row"
                    style={{ border: "1px solid hsl(202 60% 10%)" }}
                >
                    {/* Dark panel - heading + subtitle */}
                    <div
                        ref={darkRef}
                        className="relative z-10 flex w-full flex-col justify-center gap-4 p-10 pb-16 lg:w-[62%] lg:p-14 lg:pr-20"
                        style={{ background: "hsl(var(--secondary))" }}
                    >
                        <h2 data-cta-item className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight text-white max-w-xs lg:max-w-md">
                            {t("cta.title")}
                        </h2>
                        <p data-cta-item className="text-sm lg:text-base text-white/50 leading-relaxed max-w-xs lg:max-w-sm">
                            {t("cta.subtitle")}
                        </p>
                    </div>

                    {/* Teal diagonal stripe - sits on the seam in both orientations */}
                    <div
                        ref={stripeRef}
                        className="pointer-events-none relative z-20 -my-4 h-16 w-full self-stretch lg:my-0 lg:-ml-7 lg:-mr-1 lg:h-auto lg:w-20"
                    >
                        <div className="h-full w-full -skew-y-[4deg] lg:skew-y-0 lg:-skew-x-[8deg]" style={{ background: "hsl(var(--primary))" }} />
                    </div>

                    {/* Light panel - skewed buttons */}
                    <div
                        ref={lightRef}
                        className="relative z-10 flex flex-1 flex-col justify-center gap-3 bg-background p-10 pt-16 lg:p-14 lg:pl-12"
                    >
                        <SkewButton href="/contact" filled>
                            {t("cta.button")}
                        </SkewButton>
                        <SkewButton href="/team">
                            {t("cta.secondaryButton")}
                        </SkewButton>
                    </div>
                </div>
            </div>
        </section>
    )
}
