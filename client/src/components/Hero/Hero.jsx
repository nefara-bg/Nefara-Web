import { Button, Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { useParams } from "react-router-dom"
import FadeInSection from "@/components/FadeInSection/FadeInSection"
import SectionTag from "@/components/SectionTag/SectionTag"
import TextGradient from "@/components/TextGradient/TextGradient"

const Hero = () => {
    const lng = "en"
    const { t } = useTranslation()



    return (
        <FadeInSection>
            <Stack
                id="hero"
                sx={{
                    py: { xs: 9, sm: 9, md: 9, lg: 9, xl: 9 },
                    px: { xs: 2, sm: 6, md: 6, lg: 8, xl: 12 },
                    alignItems: "center",
                    background: "linear-gradient(135deg, var(--mui-palette-background-main) 0%, var(--mui-palette-neutral-50) 50%, var(--mui-palette-neutral-100) 100%)",
                    minHeight: "min(100vh, 60rem)",
                    display: "flex",
                    justifyContent: "center",
                    pt: { xs: 9, sm: 9, md: 9, lg: 12 }
                }}
            >
                <Stack
                    sx={{
                        alignItems: "center",
                        textAlign: "center",
                        maxWidth: "60rem"
                    }}
                >
                    <SectionTag props={{ mb: 6 }} content={t("hero.tag")} />

                    <Typography mb={1.5} variant="h1" color={"neutral.main"}>
                        {t("hero.title")}
                        <TextGradient
                            props={{
                                variant: "span",
                                display: "block"
                            }}
                        >
                            {t("hero.title2")}
                        </TextGradient>
                    </Typography>
                    <Typography variant="body1" fontSize={"1.5rem"} mb={6}>{t("hero.content")}</Typography>
                    <Stack direction={{ md: "row" }} gap={2}>
                        <Link href={`/${lng}/#contact`}><Button fullWidth variant="contained" size="large" color="primary">{t("hero.button")}</Button></Link>
                        <Link href={`/${lng}/#services`}><Button fullWidth variant="outlined" size="large" color="primary">{t("hero.secondaryButton")}</Button></Link>
                    </Stack>
                </Stack>
            </Stack>
        </FadeInSection>
    )
}

export default Hero