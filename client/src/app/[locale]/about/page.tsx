import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { validateClientUrl } from "@/utils/env/env"
import { AboutNefara } from "@/components/AboutPage/AboutNefara"

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale })

    const baseUrl = validateClientUrl(process.env.NEXT_PUBLIC_CLIENT_URL)

    return {
        metadataBase: new URL(baseUrl),
        title: t("about.seo.title"),
        description: t("about.seo.description"),
        alternates: {
            canonical: `/${locale}/about`,
            languages: {
                en: `/en/about`,
                bg: `/bg/about`,
                "x-default": `/en/about`,
            },
        },
        openGraph: {
            title: t("about.seo.title"),
            description: t("about.seo.description"),
            type: "website",
            images: [`/meta.webp`],
        },
        twitter: {
            card: "summary_large_image",
            title: t("about.seo.title"),
            description: t("about.seo.description"),
            images: [`/meta.webp`],
        },
    }
}

const AboutPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <main className="min-h-screen bg-background overflow-hidden">
            <AboutNefara />
        </main>
    )
}

export default AboutPage
