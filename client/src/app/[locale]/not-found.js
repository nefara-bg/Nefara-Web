import { Button, Typography, Stack } from "@mui/material"
import Link from "next/link"
import { hasLocale, useTranslations } from "next-intl"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

const NotFound = async () => {
    const t = useTranslations()



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

export default NotFound