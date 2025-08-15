import { Box, Button, Grid, Typography } from "@mui/material"
import hero from "../../../../../img/hero.webp"
import { HomeContainer } from "../../Home"
import styled from "@emotion/styled"

const Hero = () => {
    const HeroSection = styled(HomeContainer)(({ theme }) => ({
        backgroundColor: theme.palette.background.secondary
    }))


    return (
        <HeroSection>
            <Grid container alignItems={"center"} spacing={16}>
                <Grid size={6}>
                    <Box>
                        <Typography variant="h1" mb={1} color={"neutral.main"}>Building software solutions</Typography>
                        <Typography variant="body1" mb={3}>We build web, mobile and desktop applications that help your business grow.</Typography>
                        <Button variant="contained" size="large" color="primary">Get Started</Button>
                    </Box>
                </Grid>
                <Grid size="grow">
                    <Box>
                        <img src={hero} className="hero-img" alt="Desktop and Mobile device screens" />
                    </Box>
                </Grid>
            </Grid>
        </HeroSection>
    )
}

export default Hero