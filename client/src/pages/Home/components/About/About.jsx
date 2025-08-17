import { Grid, styled, Typography } from "@mui/material"
import AboutCard from "./AboutCard/AboutCard"
import { HomeContainer } from "../../Home"
import solutions from "../../../../../img/solutions.webp"
import code from "../../../../../img/code.webp"
import developers from "../../../../../img/developers.webp"

const About = () => {
    const reasons = [
        {
            title: "Experienced team of developers",
            content: "Our developers bring years of hands-on experience across web, mobile, and desktop platforms. We’ve tackled projects of every scale, from small business websites to enterprise-level software systems, ensuring we can handle your unique challenges with skill and confidence.",
            icon: developers
        },
        {
            title: "High-quality code and design",
            content: "We follow industry best practices and rigorous quality checks to deliver clean, efficient, and maintainable code. Combined with intuitive, user-focused design, our solutions are built to look great, perform flawlessly, and stand the test of time.",
            icon: code
        },
        {
            title: "Tailored solutions to meet your needs",
            content: "Every business is different — and so are our solutions. We take the time to understand your goals, challenges, and audience before crafting a custom approach that aligns perfectly with your vision and delivers measurable results.",
            icon: solutions
        }
    ]

    return (
        <HomeContainer id="about">
            <Typography variant="h3" textAlign={"center"} color="neutral.main" mb={4}>Why Choose Us</Typography>
            <Grid container spacing={3}> 
                {
                    reasons.map((reason, i) => (
                        // <Typography variant="body2" key={i}>{reason}</Typography>
                        <AboutCard cardContent={reason} key={i} />
                    ))
                }
            </Grid>
        </HomeContainer>
    )
}

export default About