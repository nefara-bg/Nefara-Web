import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { locales, routing } from "@/i18n/routing"
import { Navigation } from "@/components/Navigation/Navigation"
import Footer from "@/components/Footer/Footer"
import { validateClientUrl } from "@/utils/env/env"
import "@/app/globals.css"

export async function generateStaticParams() {
    const staticParams = locales.map((locale) => ({ locale }))
    return staticParams
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale })

    const baseUrl = validateClientUrl(process.env.NEXT_PUBLIC_CLIENT_URL)

    return {
        metadataBase: new URL(baseUrl),
        title: t("seo.title"),
        description: t("seo.description"),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                en: `/en`,
                bg: `/bg`,
                "x-default": `/en`,
            },
        },
        openGraph: {
            title: t("seo.title"),
            description: t("seo.description"),
            type: "website",
            images: [`/meta.webp`],
        },
        twitter: {
            card: "summary_large_image",
            title: t("seo.title"),
            description: t("seo.description"),
            images: [`/meta.webp`],
        },
    }
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    // Load messages for the current locale - explicitly pass locale for static generation
    const messages = await getMessages({ locale })

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Using Navigation from Nefara Elevate design */}
            <Navigation locale={locale} />
            {children}
            <Footer />
        </NextIntlClientProvider>
    )
}
