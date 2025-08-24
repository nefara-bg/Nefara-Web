import { Grid, Typography } from "@mui/material"
import AboutCard from "./components/AboutCard/AboutCard"
import solutions from "../../../../img/solutions.webp"
import code from "../../../../img/code.webp"
import developers from "../../../../img/developers.webp"
import { useTranslation } from "react-i18next"
import { HomeContainer } from "../../styling"
import FadeInSection from "../../../../components/FadeInSection/FadeInSection"
import { motion } from "motion/react"

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
            icon: code
        },
        {
            title: t("about.solutions.title"),
            content: t("about.solutions.content"),
            icon: solutions
        }
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
                <Typography variant="h3" textAlign={"center"} color="neutral.main" mb={4}>{t("about.title")}</Typography>
                <Grid
                    component={motion.div}
                    container
                    spacing={3}
                    variants={gridVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                > 
                    {
                        reasons.map((reason, i) => (
                            <AboutCard cardContent={reason} key={i} />
                        ))
                    }
                </Grid>
            </HomeContainer>
        </FadeInSection>
    )
}

export default About