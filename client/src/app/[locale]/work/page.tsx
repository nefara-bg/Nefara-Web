import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { validateClientUrl } from "@/utils/env/env"
import { RevealOnScroll } from "@/components/WorkSection/RevealOnScroll"
import { HeroTitleReveal } from "@/components/WorkSection/HeroTitleReveal"
import { ProductVisual } from "@/components/WorkSection/ProductVisual"

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale })

    const baseUrl = validateClientUrl(process.env.NEXT_PUBLIC_CLIENT_URL)

    return {
        metadataBase: new URL(baseUrl),
        title: t("work.seo.title"),
        description: t("work.seo.description"),
        alternates: {
            canonical: `/${locale}/work`,
            languages: {
                en: `/en/work`,
                bg: `/bg/work`,
                "x-default": `/en/work`,
            },
        },
        openGraph: {
            title: t("work.seo.title"),
            description: t("work.seo.description"),
            type: "website",
            images: [`/meta.webp`],
        },
        twitter: {
            card: "summary_large_image",
            title: t("work.seo.title"),
            description: t("work.seo.description"),
            images: [`/meta.webp`],
        },
    }
}

const PRODUCTS = [
    { key: "fylex",    accent: "radial-gradient(circle at 30% 30%, hsl(190 90% 55% / 0.55), transparent 60%)" },
    { key: "quicx",    accent: "radial-gradient(circle at 70% 30%, hsl(160 80% 50% / 0.55), transparent 60%)" },
    { key: "pmad",     accent: "radial-gradient(circle at 30% 70%, hsl(265 80% 65% / 0.55), transparent 60%)" },
    { key: "sandokan", accent: "radial-gradient(circle at 70% 70%, hsl(30 90% 60% / 0.55), transparent 60%)" },
] as const

const WorkPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    const t = await getTranslations("work")

    return (
        <main className="min-h-screen bg-background pt-16">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-white/5">
                <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                        background:
                            "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%)",
                    }}
                    aria-hidden="true"
                />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24 lg:pt-28 lg:pb-32">
                    <HeroTitleReveal>
                        <div
                            data-reveal
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
                            {t("hero.eyebrow")}
                        </div>
                        <h1
                            data-reveal
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight max-w-4xl"
                        >
                            {t("hero.title1")}{" "}
                            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-foreground bg-clip-text text-transparent">
                                {t("hero.title2")}
                            </span>
                        </h1>
                        <p
                            data-reveal
                            className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
                        >
                            {t("hero.subtitle")}
                        </p>
                    </HeroTitleReveal>
                </div>
            </section>

            {/* Product showcase */}
            <div className="relative">
                {PRODUCTS.map(({ key, accent }, idx) => {
                    const url = t(`products.${key}.url`)
                    return (
                        <section
                            key={key}
                            className="relative border-b border-white/5"
                            aria-labelledby={`product-${key}`}
                        >
                            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-32">
                                <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">

                                    {/* Sticky info pane */}
                                    <RevealOnScroll className="lg:sticky lg:top-28" y={24}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                                                {t("indexLabel")} · 0{idx + 1} / 0{PRODUCTS.length}
                                            </span>
                                            <span className="h-px flex-1 bg-white/10" />
                                        </div>

                                        <h2
                                            id={`product-${key}`}
                                            className="font-display text-5xl md:text-6xl font-bold text-foreground leading-[1.02] tracking-tight"
                                        >
                                            {t(`products.${key}.name`)}
                                        </h2>

                                        <p className="mt-4 text-base md:text-lg text-[hsl(var(--primary))] font-medium">
                                            {t(`products.${key}.tagline`)}
                                        </p>

                                        {url && (
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group mt-8 inline-flex items-center gap-2 rounded-md border border-[hsl(var(--primary))] bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-[hsl(var(--primary)/0.08)]"
                                            >
                                                <span>
                                                    {t("visit")}{" "}
                                                    <span className="text-muted-foreground font-normal">
                                                        {url.replace(/^https?:\/\//, "")}
                                                    </span>
                                                </span>
                                                <span className="relative inline-flex h-4 w-4 items-center overflow-hidden">
                                                    <span className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-2">
                                                        {">"}
                                                    </span>
                                                    <span className="absolute opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                                        {"->"}
                                                    </span>
                                                </span>
                                            </a>
                                        )}
                                    </RevealOnScroll>

                                    {/* Right column: visual + description */}
                                    <div className="space-y-8">
                                        <ProductVisual
                                            index={idx}
                                            name={t(`products.${key}.name`)}
                                            slug={key}
                                            accent={accent}
                                        />
                                        <RevealOnScroll y={28} delay={0.1}>
                                            <p className="text-[15px] md:text-base text-muted-foreground leading-[1.85]">
                                                {t(`products.${key}.description`)}
                                            </p>
                                        </RevealOnScroll>
                                    </div>

                                </div>
                            </div>
                        </section>
                    )
                })}
            </div>
        </main>
    )
}

export default WorkPage
