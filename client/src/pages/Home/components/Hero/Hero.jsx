import { Button, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { HashLink } from "react-router-hash-link"
import { HeroSection, TextBox } from "../../styling"
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
                <Grid container width={"min(100%, 128rem)"} alignItems={"center"} spacing={{ xs: 6, md: 8, lg: 16 }}>
                    <Grid size={{ xs: 12, md: 7, lg: 6 }}>
                        <TextBox>
                            <Typography variant="h1" mb={1} color={"neutral.main"}>{t("hero.title")}</Typography>
                            <Typography variant="body1" mb={3}>{t("hero.content")}</Typography>
                            <HashLink to={`/${lng}/#contact`}><Button variant="contained" size="large" color="primary">{t("hero.button")}</Button></HashLink>
                        </TextBox>
                    </Grid>
                    <Grid size="grow" justifyContent={"center"}>
                        <ImageComposition />
                    </Grid>
                </Grid>
            </HeroSection>
        </FadeInSection>
    )
}

export default Hero