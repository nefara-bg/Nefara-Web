import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { validateClientUrl } from "@/utils/env/env"
import { ContactSection } from "@/components/ContactSection/ContactSection"

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale })

    const baseUrl = validateClientUrl(process.env.NEXT_PUBLIC_CLIENT_URL)

    return {
        metadataBase: new URL(baseUrl),
        title: t("contact.seo.title"),
        description: t("contact.seo.description"),
        alternates: {
            canonical: `/${locale}/contact`,
            languages: {
                en: `/en/contact`,
                bg: `/bg/contact`,
                "x-default": `/en/contact`,
            },
        },
        openGraph: {
            title: t("contact.seo.title"),
            description: t("contact.seo.description"),
            type: "website",
            images: [`/meta.webp`],
        },
        twitter: {
            card: "summary_large_image",
            title: t("contact.seo.title"),
            description: t("contact.seo.description"),
            images: [`/meta.webp`],
        },
    }
}

const ContactPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <main className="min-h-screen bg-background pt-16">
            <ContactSection />
        </main>
    )
}

export default ContactPage
