import { Box, Button, Grid, Typography } from "@mui/material"
import hero from "../../../../img/hero.webp"
import { useTranslation } from "react-i18next"
import { HashLink } from "react-router-hash-link"
import { HeroSection, TextBox } from "../../styles"
import ImageContainer from "../../../../components/ImageContainer/ImageContainer"

const Hero = () => {
    const { t } = useTranslation()



    return (
        <HeroSection id="hero">
            <Grid container alignItems={"center"} spacing={{ xs: 6, md: 8, lg: 16 }}>
                <Grid size={{ xs: 12, md: 7, lg: 6 }}>
                    <TextBox>
                        <Typography variant="h1" mb={1} color={"neutral.main"}>{t("hero.title")}</Typography>
                        <Typography variant="body1" mb={3}>{t("hero.content")}</Typography>
                        <HashLink to="/#contact"><Button variant="contained" size="large" color="primary">{t("hero.button")}</Button></HashLink>
                    </TextBox>
                </Grid>
                <Grid size="grow">
                    <ImageContainer src={hero} alt="Desktop and Mobile device screens" props={{ px: { xs: 0, sm: 12, md: 0 } }}   
                    />
                </Grid>
            </Grid>
        </HeroSection>
    )
}

export default Hero