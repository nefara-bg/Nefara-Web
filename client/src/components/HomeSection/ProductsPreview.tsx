"use client"

import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type ProductKey = "quicx" | "pmad" | "sand"

const PRODUCTS: ProductKey[] = ["quicx", "pmad", "sand"]

const STACK_OFFSET = 16
const TOP_BASE = 128

export function ProductsPreview() {
    const t = useTranslations("home.productsPreview")
    const tProducts = useTranslations("work.products")

    return (
        <section className="relative pb-24 md:pb-32 px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
                <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">
                    {t("tag")}
                </span>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight mb-3">
                    {t("title")}
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                    {t("subtitle")}
                </p>
            </div>

            <div className="max-w-2xl mx-auto flex flex-col gap-18 md:gap-24">
                {PRODUCTS.map((key, i) => (
                    <div
                        key={key}
                        className="sticky"
                        style={{ top: `${TOP_BASE + i * STACK_OFFSET}px` }}
                    >
                        <Card className="bg-card p-8 md:p-10 shadow-[0_20px_60px_-20px_hsl(var(--foreground)/0.1)] rounded-2xl">
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
                    </div>
                ))}
            </div>

            <div className="mt-20 md:mt-28 flex justify-center">
                <Link href="/work">
                    <Button size="lg" variant="outline">
                        {t("cta")} <ArrowRight />
                    </Button>
                </Link>
            </div>
        </section>
    )
}
