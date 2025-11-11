"use client"

import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import ServiceCard from "@/components/ServiceCard/ServiceCard"
import { useTranslations } from "next-intl"
import FadeInSection from "@/components/FadeInSection/FadeInSection"
import SectionTag from "@/components/SectionTag/SectionTag"
import TextGradient from "@/components/TextGradient/TextGradient"
import { motion } from "motion/react"
import { Link } from "@/i18n/navigation"
import SectionContainer from "@/components/SectionContainer/SectionContainer"

const Services = () => {
    const t = useTranslations()



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
            <Stack 
                id="services"
                sx={{
                    py: { xs: 9, sm: 9, md: 9, lg: 9, xl: 9 },
                    px: { xs: 2, sm: 6, md: 6, lg: 8, xl: 12 },
                    alignItems: "center"
                }}
            >
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

                        <Link href={`/#contact`}><Button size="large" variant="contained" color="primary">{t("services.button")} 💬</Button></Link>
                    </Stack>
                </SectionContainer>
            </Stack>
        </FadeInSection>
    )
}

export default Services