import { Box, Divider, duration, Grid, Typography } from "@mui/material"
import ServiceCard from "./components/ServiceCard"
import web from "../../../../img/web.webp"
import webDev from "../../../../img/webDev.webp"
import mobile from "../../../../img/mobile.webp"
import mobileDev from "../../../../img/mobileDev.webp"
import desktop from "../../../../img/desktop.webp"
import desktopDev from "../../../../img/desktopDev.webp"
import { useTranslation } from "react-i18next"
import { HomeContainer } from "../../styling"
import FadeInSection from "../../../../components/FadeInSection/FadeInSection"
import SectionTag from "../../../../components/SectionTag/SectionTag"
import TextGradient from "../../../../components/TextGradient/TextGradient"
import { motion } from "motion/react"

const Services = () => {
    const { t } = useTranslation()



    const services = [
        {
            title: t("services.web.title"),
            text: t("services.web.content.text"),
            content: [
                t("services.web.content.content1"),
                t("services.web.content.content2"),
                t("services.web.content.content3")
            ],
            icon: "🌐",
            image: webDev,
            colors: ["#2b7fff", "#ad46ff"]
        },
        {
            title: t("services.desktop.title"),
            text: t("services.desktop.content.text"),
            content: [
                t("services.desktop.content.content1"),
                t("services.desktop.content.content2"),
                t("services.desktop.content.content3"),
            ],
            icon: "💻",
            image: desktopDev,
            colors: ["#00c950", "#00bba7"]
        },
        {
            title: t("services.mobile.title"),
            text: t("services.mobile.content.text"),
            content: [
                t("services.mobile.content.content1"),
                t("services.mobile.content.content2"),
                t("services.mobile.content.content3"),
            ],
            icon: "📱",
            image: mobileDev,
            colors: ["#ff6900", "#fb2c36"]
        }
    ]



    const gridVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }



    return (
        <FadeInSection>
            <HomeContainer id="services">
                <SectionTag props={{ mb: 4 }} content={t("services.tag")} />

                <Box maxWidth={"60rem"}>
                    <TextGradient 
                        props={{
                            variant: "h3",
                            textAlign: "center",
                            color: "neutral.main",
                            mb: 1
                        }}
                    >
                        {t("services.title")}
                    </TextGradient>

                    <Typography textAlign={"center"} mb={6} variant="body1">{t("services.content")}</Typography>
                </Box>

                <Grid 
                    width={"min(100%, 96rem)"}
                    mx={"auto"}
                    container
                    spacing={{ xs: 4, sm: 8, md: 4, lg: 4 }}
                    component={motion.div}
                    variants={gridVariants}
                    initial="initial"
                    whileInView="animate"
                >
                    {
                        services.map((service, i) => (
                            <ServiceCard serviceObject={service} key={i} />
                        ))
                    }
                </Grid>
            </HomeContainer>
        </FadeInSection>
    )
}

export default Services