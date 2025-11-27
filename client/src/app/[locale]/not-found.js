import { Button, Typography, Stack } from "@mui/material"
import { Link } from "@/i18n/navigation"
import { getLocale, getTranslations } from "next-intl/server"

export default async function NotFound() {
    // Get locale from next-intl context (extracted from the route)
    const locale = await getLocale();
    
    // Get translations for the locale
    const t = await getTranslations({ locale });

    return (
        <Stack
            sx={{
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "center",
                py: 16,
                px: 2,
                textAlign: "center"
            }}
        >
            <Typography variant="h2" color="primary" mb={3}>404</Typography>

            <Typography variant="h4" mb={1} color="neutral">{t("notFound.title")}</Typography>
            <Typography variant="body2" mb={3}>{t("notFound.content")}</Typography>
            <Link href="/"><Button variant="contained" size="large">{t("notFound.button")}</Button></Link>
        </Stack>
    )
}