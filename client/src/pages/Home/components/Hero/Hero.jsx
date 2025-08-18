import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import hero from "../../../../../img/hero.webp"
import { HomeContainer } from "../../Home"
import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"

const Hero = () => {
    const HeroSection = styled(HomeContainer)(({ theme }) => ({
        backgroundColor: theme.palette.background.secondary
    }))



    const TextBox = styled(Stack)(({ theme }) => ({
        alignItems: "start",

        [theme.breakpoints.down("md")]: {
            alignItems: "center",
            textAlign: "center"
        }
    }))



    const ImageContainer = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down("md")]: { padding: `0 ${theme.spacing(12)}` },
        [theme.breakpoints.down("sm")]: { padding: 0 }
    }))



    const { t } = useTranslation()



    return (
        <HeroSection id="hero">
            <Grid container alignItems={"center"} spacing={{ xs: 6, md: 8, lg: 16 }}>
                <Grid size={{ xs: 12, md: 7, lg: 6 }}>
                    <TextBox>
                        <Typography variant="h1" mb={1} color={"neutral.main"}>{t("hero.title")}</Typography>
                        <Typography variant="body1" mb={3}>{t("hero.content")}</Typography>
                        <Button variant="contained" size="large" color="primary">{t("hero.button")}</Button>
                    </TextBox>
                </Grid>
                <Grid size="grow">
                    <ImageContainer>
                        <img src={hero} className="hero-img" alt="Desktop and Mobile device screens" />
                    </ImageContainer>
                </Grid>
            </Grid>
        </HeroSection>
    )
}

export default Hero