import { Box } from "@mui/material"
import About from "../../components/About/About"
import Contact from "../../components/Contact/Contact"
import Hero from "../../components/Hero/Hero"
import Services from "../../components/Services/Services"
import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

export async function generateMetadata({params}) {
    const {locale} = await params;
    const t = await getTranslations({locale});

    const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL

    return {
        title: t("seo.title"),
        description: t("seo.description"),
        alternates: {
            canonical: `${baseUrl}/${locale}`,
            languages: {
                en: `${baseUrl}/en`,
                bg: `${baseUrl}/bg`,
                "x-default": `${baseUrl}/en`,
            },
        },
        openGraph: {
            title: t("seo.title"),
            description: t("seo.description"),
            type: "website",
            images: [`${baseUrl}/meta.webp`],
        },
        twitter: {
            card: "summary_large_image",
            title: t("seo.title"),
            description: t("seo.description"),
            images: [`${baseUrl}/meta.webp`],
        },
        icons: {
            icon: [
                { url: `${baseUrl}/favicon.png", sizes: "32x32", type: "image/png` },
                { url: `${baseUrl}/tab-logo.png", type: "image/png", media: "(prefers-color-scheme: light)` },
                { url: `${baseUrl}/tab-logo-dark.png", type: "image/png", media: "(prefers-color-scheme: dark)` },
            ],
        },
    };
}

const Page = async ({ params }) => {
    const { locale } = await params
    console.log(`LOCALE: ${locale}`)

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale)

    return (
        <Box sx={{ bgcolor: "background.main" }}>
            <Hero />
            <Services />
            <About />
            <Contact />
        </Box>
    )
}

export default Page