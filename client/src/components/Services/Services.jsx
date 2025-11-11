import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import ServiceCard from "../ServiceCard/ServiceCard"
import { getTranslations, getLocale } from "next-intl/server"
import { HomeContainer } from "../../app/styling"
import FadeInSection from "../FadeInSection/FadeInSection"
import SectionTag from "../SectionTag/SectionTag"
import TextGradient from "../TextGradient/TextGradient"
import { motion } from "motion/react"
import Link from "next/link"
import SectionContainer from "../SectionContainer/SectionContainer"

const Services = async () => {
    const t = await getTranslations()
    const locale = await getLocale()



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
            image: "/webDev.webp",
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
            image: "/desktopDev.webp",
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
            image: "/mobileDev.webp",
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
                <SectionContainer props={{ component: Stack, alignItems: "center" }}>
                    <SectionTag props={{ mb: 4 }} content={t("services.tag")} />

                    <Box maxWidth={"60rem"}>
                        <TextGradient 
                            props={{
                                variant: "h3",
                                textAlign: "center",
                                color: "neutral.main",
                                mb: 3
                            }}
                        >
                            {t("services.title")}
                        </TextGradient>

                        <Typography textAlign={"center"} mb={6} variant="body1">{t("services.content")}</Typography>
                    </Box>

                    <Grid
                        container
                        spacing={{ xs: 4, sm: 8, md: 4, lg: 4 }}
                        component={motion.div}
                        variants={gridVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        mb={8}
                    >
                        {
                            services.map((service, i) => (
                                <ServiceCard serviceObject={service} key={i} />
                            ))
                        }
                    </Grid>

                    <Stack gap={3} alignItems={"center"} textAlign={"center"}>
                        <Typography variant="body2">{t("services.subtext")}</Typography>

                        <Link href={`/${locale}#contact`}><Button size="large" variant="contained" color="primary">{t("services.button")} 💬</Button></Link>
                    </Stack>
                </SectionContainer>
            </HomeContainer>
        </FadeInSection>
    )
}

export default Services