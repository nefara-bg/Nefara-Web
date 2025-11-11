"use client"

import { Box, styled } from "@mui/material"
import SeoTags from "@/components/SeoTags/SeoTags"
import About from "@/components/About/About"
import Contact from "@/components/Contact/Contact"
import Hero from "@/components/Hero/Hero"
import Services from "@/components/Services/Services"

const Home = () => {
    const StyledHome = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.background.main
    }))

    return (
        <StyledHome>
            <SeoTags />
            <Hero />
            <Services />
            <About />
            <Contact />
        </StyledHome>
    )
}

export default Home