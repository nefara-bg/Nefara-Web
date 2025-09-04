import { Grid, Stack, Typography } from "@mui/material"
import AboutCard from "./components/AboutCard/AboutCard"
import solutions from "../../../../img/solutions.webp"
import code from "../../../../img/code.webp"
import developers from "../../../../img/developers.webp"
import { useTranslation } from "react-i18next"
import { HomeContainer } from "../../styling"
import FadeInSection from "../../../../components/FadeInSection/FadeInSection"
import { motion } from "motion/react"
import TextGradient from "../../../../components/TextGradient/TextGradient"

const About = () => {
    const { t } = useTranslation()



    const reasons = [
        {
            title: t("about.devs.title"),
            content: t("about.devs.content"),
            icon: developers
        },
        {
            title: t("about.code.title"),
            content: t("about.code.content"),
            icon: solutions
        },
        {
            title: t("about.solutions.title"),
            content: t("about.solutions.content"),
            icon: code
        }
    ]



    const stats = [
        { number: "3+", label: "Years Experience", icon: "📅" },
        { number: "24/7", label: "Support Available", icon: "💬" },
        { number: "100%", label: "Client Satisfaction", icon: "⭐" }
    ]



    const gridVariants = {
        initial: {},
        animate: {
            transition: {
                transition: 0.1,
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    }



    return (
        <FadeInSection>
            <HomeContainer id="about">
                <Stack maxWidth={"60rem"} mb={10} textAlign={"center"}>
                    <Typography mb={3} variant="h3" color="neutral.main">{t("about.title")} <TextGradient props={{ variant: "span" }}>Nefara</TextGradient></Typography>
                    <Typography variant="body1">{t("about.content")}</Typography>
                </Stack>
                <Grid
                    component={motion.div}
                    container
                    spacing={3}
                    variants={gridVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    width={"min(100%, 128rem)"}
                    mx={"auto"}
                > 
                    {
                        stats.map((stat, i) => (
                            <AboutCard cardContent={stat} key={i} />
                        ))
                    }
                </Grid>
            </HomeContainer>
        </FadeInSection>
    )
}

export default About