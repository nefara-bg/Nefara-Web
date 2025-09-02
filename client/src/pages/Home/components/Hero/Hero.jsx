import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { HashLink } from "react-router-hash-link"
import { Excellence, HeroSection, TextBox, TitleGradient } from "../../styling"
import ImageComposition from "./components/ImageComposition/ImageComposition"
import { useParams } from "react-router-dom"
import FadeInSection from "../../../../components/FadeInSection/FadeInSection"

const Hero = () => {
    const { lng } = useParams()
    const { t } = useTranslation()



    return (
        <FadeInSection>
            <HeroSection
                id="hero"
            >
                {/* <Grid container width={"min(100%, 128rem)"} alignItems={"center"} spacing={{ xs: 6, md: 8, lg: 16 }}> */}
                    {/* <Grid size={{ xs: 12, md: 7, lg: 6 }}> */}
                        <TextBox>
                            <Excellence mb={6}>
                                <Typography variant="body2">✨ Building Digital Excellence Since 2021</Typography>
                            </Excellence>

                            <Typography mb={1.5} variant="h1" color={"neutral.main"}>
                                {t("hero.title")}
                                <TitleGradient variant="span" display={"block"}>{t("hero.title2")}</TitleGradient>
                            </Typography>
                            <Typography variant="body1" fontSize={"1.8rem"} mb={6}>{t("hero.content")}</Typography>
                            <Stack direction={"row"} gap={2}>
                                <HashLink to={`/${lng}/#contact`}><Button variant="contained" size="large" color="primary">{t("hero.button")}</Button></HashLink>
                                <HashLink to={`/${lng}/#contact`}><Button variant="outlined" size="large" color="primary">{t("hero.secondaryButton")}</Button></HashLink>
                            </Stack>
                        </TextBox>
                    {/* </Grid> */}
                    {/* <Grid size="grow" justifyContent={"center"}>
                        <ImageComposition />
                    </Grid> */}
                {/* </Grid> */}
            </HeroSection>
        </FadeInSection>
    )
}

export default Hero