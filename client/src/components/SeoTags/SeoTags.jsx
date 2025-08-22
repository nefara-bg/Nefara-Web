import { useTranslation } from "react-i18next"

const SeoTags = () => {
    const { t } = useTranslation()
    const baseUrl = "http://localhost:5173"



    return (
        <>
            <title>{t("seo.title")}</title>
            <meta name="description" content={t("seo.description")} />

            <link rel="alternate" href={`${baseUrl}/en`} hreflang="en" />
            <link rel="alternate" href={`${baseUrl}/bg`} hreflang="bg" />
            <link rel="alternate" href={`${baseUrl}/en`} hreflang="x-default" />
        </>
    )
}

export default SeoTags