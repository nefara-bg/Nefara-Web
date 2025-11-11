import { getTranslations, getLocale } from "next-intl/server"
import { useTranslations } from "next-intl"

const SeoTags = () => {
    const t = useTranslations()
    const baseUrl = "https://nefara.org"



    return (
        <>
            <title>{t("seo.title")}</title>
            <meta name="description" content={t("seo.description")} />

            <link rel="alternate" href={`${baseUrl}/en`} hrefLang="en" />
            <link rel="alternate" href={`${baseUrl}/bg`} hrefLang="bg" />
            <link rel="alternate" href={`${baseUrl}/en`} hrefLang="x-default" />

            < meta property="og:title" content={t("seo.title")} />
            <meta property="og:description" content={t("seo.description")} />
            <meta property="og:type" content="website" />
            {/* <meta property="og:url" content={`${baseUrl}/${lng}`} /> */}
            <meta property="og:image" content={`${baseUrl}/hero-desktop.webp`} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t("seo.title")} />
            <meta name="twitter:description" content={t("seo.description")} />
            <meta name="twitter:image" content={`${baseUrl}/hero-desktop.webp`} />
        </>
    )
}

export default SeoTags