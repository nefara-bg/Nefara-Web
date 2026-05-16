import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { validateClientUrl } from "@/utils/env/env"
import { RevealOnScroll } from "@/components/WorkSection/RevealOnScroll"
import { HeroTitleReveal } from "@/components/WorkSection/HeroTitleReveal"
import { ProductVisual } from "@/components/WorkSection/ProductVisual"
import { WorkTOC } from "@/components/WorkSection/WorkTOC"

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
    { key: "sand", accent: "radial-gradient(circle at 70% 70%, hsl(30 90% 60% / 0.55), transparent 60%)" },
] as const

const WorkPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    const t = await getTranslations("work")

    return (
        <main className="min-h-screen bg-background pb-16">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-white/5">
                <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-16 lg:pt-32 lg:pb-24">
                    <HeroTitleReveal>
                        <h1
                            data-reveal
                            className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 max-w-4xl"
                        >
                            {t("hero.title1")}{" "}
                            <span className="text-foreground">
                                {t("hero.title2")}
                            </span>
                        </h1>
                        <p
                            data-reveal
                            className="text-base text-muted-foreground leading-relaxed max-w-2xl"
                        >
                            {t("hero.subtitle")}
                        </p>
                    </HeroTitleReveal>
                </div>
            </section>

            {/* Product showcase with sticky TOC sidebar */}
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
                <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
                    <WorkTOC
                        label={t("tocLabel")}
                        groups={[
                            {
                                id: "products",
                                name: t("sections.products"),
                                children: PRODUCTS.map(({ key }) => ({
                                    id: `product-${key}`,
                                    name: t(`products.${key}.name`),
                                })),
                            },
                            { id: "platforms", name: t("sections.platforms") },
                        ]}
                    />
                    <div className="min-w-0">
                        <section
                            id="products"
                            className="scroll-mt-28 flex flex-col gap-24"
                            aria-label={t("sections.products")}
                        >
                        {PRODUCTS.map(({ key, accent }, idx) => {
                            const url = t(`products.${key}.url`)
                            return (
                                <section
                                    key={key}
                                    id={`product-${key}`}
                                    className="relative scroll-mt-28 border-b border-white/5"
                                    aria-labelledby={`product-${key}-heading`}
                                >
                                    <div className="mx-auto max-w-3xl">
                                        <RevealOnScroll y={24}>

                                            <h2
                                                id={`product-${key}-heading`}
                                                className="text-5xl md:text-6xl font-bold text-foreground leading-[1.02] tracking-tight"
                                            >
                                                {t(`products.${key}.name`)}
                                            </h2>

                                            <p className="mt-1 md:text-lg text-muted-foreground font-medium">
                                                {t(`products.${key}.tagline`)}
                                            </p>
                                        </RevealOnScroll>

                                        <div className="mt-10">
                                            <ProductVisual
                                                index={idx}
                                                name={t(`products.${key}.name`)}
                                                slug={key}
                                                accent={accent}
                                            />
                                        </div>

                                        <RevealOnScroll y={28} delay={0.1}>
                                            <p className="mt-10 text-[15px] md:text-base text-muted-foreground leading-[1.85]">
                                                {t(`products.${key}.description`)}
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
                                    </div>
                                </section>
                            )
                        })}
                        </section>

                        {/* Platforms section */}
                        <section
                            id="platforms"
                            className="relative scroll-mt-28 border-b border-white/5 pt-20 lg:pt-32"
                            aria-labelledby="platforms-heading"
                        >
                            <div className="mx-auto max-w-3xl">
                                <RevealOnScroll y={24}>
                                    <h2
                                        id="platforms-heading"
                                        className="font-display text-5xl md:text-6xl font-bold text-foreground leading-[1.02] tracking-tight"
                                    >
                                        {t("sections.platforms")}
                                    </h2>

                                    <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                                        {t("platforms.subtitle")}
                                    </p>
                                </RevealOnScroll>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default WorkPage
