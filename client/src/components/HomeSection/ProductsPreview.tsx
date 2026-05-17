"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger, CustomEase)
if (!CustomEase.get("nefEase")) {
    CustomEase.create("nefEase", "0.22, 1, 0.36, 1")
}

type ProductKey = "quicx" | "pmad" | "sand"

export function ProductsPreview() {
    const t = useTranslations("home.productsPreview")
    const tProducts = useTranslations("work.products")
    const [hovered, setHovered] = useState<ProductKey | null>(null)

    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const root = sectionRef.current
        if (!root) return

        const ctx = gsap.context(() => {
            const tag    = root.querySelector("[data-anim='tag']")
            const title  = root.querySelector("[data-anim='title']")
            const sub    = root.querySelector("[data-anim='subtitle']")
            const cards  = root.querySelectorAll("[data-anim='card']")
            const cta    = root.querySelector("[data-anim='cta']")

            gsap.set([tag, title, sub, cta], { opacity: 0, y: 28 })
            gsap.set(cards, { opacity: 0, y: 56, scale: 0.96 })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: root,
                    start: "top bottom-=80px",
                    once: true,
                },
                defaults: { ease: "nefEase" },
            })

            tl.to(tag,   { opacity: 1, y: 0, duration: 0.6 })
              .to(title, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
              .to(sub,   { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
              .to(cards, {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.9,
                  stagger: 0.12,
              }, "-=0.4")
              .to(cta,   { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        }, root)

        return () => ctx.revert()
    }, [])

    const renderCard = (key: ProductKey) => {
        const isHovered = hovered === key
        const isOther = hovered !== null && !isHovered

        const transform = isHovered
            ? "scale(1.04)"
            : isOther
                ? "scale(0.96)"
                : "scale(1)"

        const zIndex = isHovered ? 10 : 1

        return (
            <Card
                data-anim="card"
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                className="bg-card p-8 md:p-10 shadow-[0_20px_60px_-20px_hsl(var(--foreground)/0.1)] rounded-2xl h-full transition-all duration-300 ease-out will-change-transform"
                style={{ transform, zIndex }}
            >
                <div className="flex items-start gap-5">
                    <div
                        className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-xs text-muted-foreground"
                        aria-hidden
                    >
                        {/* logo placeholder */}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                            {tProducts(`${key}.name`)}
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                            {tProducts(`${key}.summary`)}
                        </p>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <section ref={sectionRef} className="relative pb-24 md:pb-32 px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
                <span data-anim="tag" className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">
                    {t("tag")}
                </span>
                <h2 data-anim="title" className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight mb-3">
                    {t("title")}
                </h2>
                <p data-anim="subtitle" className="text-muted-foreground text-base md:text-lg">
                    {t("subtitle")}
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
                {renderCard("quicx")}
                {renderCard("sand")}
                <div className="md:col-span-2">
                    {renderCard("pmad")}
                </div>
            </div>

            <div data-anim="cta" className="mt-20 md:mt-28 flex justify-center">
                <Link href="/work">
                    <Button size="lg" variant="outline">
                        {t("cta")} <ArrowRight />
                    </Button>
                </Link>
            </div>
        </section>
    )
}
