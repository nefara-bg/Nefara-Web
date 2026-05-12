import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { validateClientUrl } from "@/utils/env/env"
import ServicesSection from "@/components/ServicesSection/ServicesSection"
import TechSection from "@/components/ServicesSection/TechSection"

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale })

    const baseUrl = validateClientUrl(process.env.NEXT_PUBLIC_CLIENT_URL)

    return {
        metadataBase: new URL(baseUrl),
        title: t("services.seo.title"),
        description: t("services.seo.description"),
        alternates: {
            canonical: `/${locale}/services`,
            languages: {
                en: `/en/services`,
                bg: `/bg/services`,
                "x-default": `/en/services`,
            },
        },
        openGraph: {
            title: t("services.seo.title"),
            description: t("services.seo.description"),
            type: "website",
            images: [`/meta.webp`],
        },
        twitter: {
            card: "summary_large_image",
            title: t("services.seo.title"),
            description: t("services.seo.description"),
            images: [`/meta.webp`],
        },
    }
}

const ServicesPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <main className="min-h-screen bg-background pt-16">
            <ServicesSection />
            <TechSection />
        </main>
    )
}

export default ServicesPage
