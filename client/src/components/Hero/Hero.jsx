import { Button, Stack, Typography } from "@mui/material"
import { getTranslations, getLocale } from "next-intl/server"
import Link from "next/link"
import { HeroSection, TextBox } from "../../app/styling"
import FadeInSection from "../FadeInSection/FadeInSection"
import SectionTag from "../SectionTag/SectionTag"
import TextGradient from "../TextGradient/TextGradient"

const Hero = async () => {
    const t = await getTranslations()
    const locale = await getLocale()



    return (
        <FadeInSection>
            <HeroSection
                id="hero"
            >
                <TextBox>
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
                        <Link href={`/${locale}#contact`}><Button fullWidth variant="contained" size="large" color="primary">{t("hero.button")}</Button></Link>
                        <Link href={`/${locale}#services`}><Button fullWidth variant="outlined" size="large" color="primary">{t("hero.secondaryButton")}</Button></Link>
                    </Stack>
                </TextBox>
            </HeroSection>
        </FadeInSection>
    )
}

export default Hero