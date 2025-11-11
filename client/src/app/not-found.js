"use client"

import { Section } from "@/app/styling"
import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const NotFound = () => {
    const { t } = useTranslation()



    return (
        <Section>
            <Typography variant="h2" color="primary" mb={3}>404</Typography>

            <Typography variant="h4" mb={1} color="neutral">{t("notFound.title")}</Typography>
            <Typography variant="body2" mb={3}>{t("notFound.content")}</Typography>
            <Link to={"/"}><Button variant="contained" size="large">{t("notFound.button")}</Button></Link>
        </Section>
    )
}

export default NotFound