"use client"

import { Box } from "@mui/material"
import SeoTags from "@/components/SeoTags/SeoTags"
import About from "@/components/About/About"
import Contact from "@/components/Contact/Contact"
import Hero from "@/components/Hero/Hero"
import Services from "@/components/Services/Services"

const Home = () => {
    return (
        <Box sx={{ backgroundColor: "var(--mui-palette-background-main)" }}>
            <SeoTags />
            <Hero />
            <Services />
            <About />
            <Contact />
        </Box>
    )
}

export default Home