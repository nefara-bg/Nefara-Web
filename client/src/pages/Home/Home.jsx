import { Box } from "@mui/material"
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Hero from "./components/Hero/Hero"
import Services from "./components/Services/Services"
import styled from "@emotion/styled"

export const HomeContainer = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(9)} ${theme.spacing(12)}`
}))

const Home = () => {

    return (
        <>
            <Hero />
            <Services />
            <About />
            <Contact />
        </>
    )
}

export default Home