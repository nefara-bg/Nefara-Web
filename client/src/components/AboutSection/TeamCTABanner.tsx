"use client"

import { useTranslations } from "next-intl"
import { motion } from "motion/react"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"

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
        <Link href={href} className="group block">
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

export function TeamCTABanner() {
    const t = useTranslations("about.teamSection.cta")

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-20 lg:mb-28">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl"
                style={{ border: "1px solid hsl(202 60% 10%)" }}
            >
                {/* ── Background panels ── */}
                <div
                    className="absolute inset-y-0 left-0"
                    style={{ right: "38%", background: "hsl(var(--secondary))" }}
                />
                <div
                    className="absolute inset-y-0 right-0"
                    style={{ left: "62%", background: "hsl(var(--background))" }}
                />
                {/* Teal diagonal stripe */}
                <div
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

                    {/* Left: heading - width matches the dark panel end */}
                    <div className="flex flex-col justify-between p-10 pr-16 lg:p-14 lg:pr-20" style={{ width: "65%" }}>
                        <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight text-white max-w-xs lg:max-w-sm">
                            {t("heading")}
                        </h2>
                    </div>

                    {/* Right: skewed buttons - starts inside the white panel */}
                    <div className="flex-1 flex flex-col justify-center gap-3 px-6 lg:px-8">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 hidden lg:block">
                            {t("subtitle")}
                        </p>
                        <SkewButton href="/work" filled>
                            {t("button")}
                        </SkewButton>
                        <SkewButton href="/services">
                            {t("buttonServices")}
                        </SkewButton>
                    </div>

                </div>
            </motion.div>
        </div>
    )
}
