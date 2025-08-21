import { Grid, Typography } from "@mui/material"
import AboutCard from "./components/AboutCard/AboutCard"
import solutions from "../../../../img/solutions.webp"
import code from "../../../../img/code.webp"
import developers from "../../../../img/developers.webp"
import { useTranslation } from "react-i18next"
import { HomeContainer } from "../../styling"

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

    return (
        <HomeContainer id="about">
            <Typography variant="h3" textAlign={"center"} color="neutral.main" mb={4}>{t("about.title")}</Typography>
            <Grid container spacing={3}> 
                {
                    reasons.map((reason, i) => (
                        <AboutCard cardContent={reason} key={i} />
                    ))
                }
            </Grid>
        </HomeContainer>
    )
}

export default About