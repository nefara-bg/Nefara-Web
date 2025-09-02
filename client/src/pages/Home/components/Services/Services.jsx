import { Box, Divider, Grid, Typography } from "@mui/material"
import ServiceCard from "./components/ServiceCard"
import web from "../../../../img/web.webp"
import mobile from "../../../../img/mobile.webp"
import desktop from "../../../../img/desktop.webp"
import software from "../../../../img/software.webp"
import { useTranslation } from "react-i18next"
import { HomeContainer } from "../../styling"
import FadeInSection from "../../../../components/FadeInSection/FadeInSection"
import SectionTag from "../../../../components/SectionTag/SectionTag"
import TextGradient from "../../../../components/TextGradient/TextGradient"

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
            icon: web
        },
        {
            title: t("services.mobile.title"),
            text: t("services.mobile.content.text"),
            content: [
                t("services.mobile.content.content1"),
                t("services.mobile.content.content2"),
                t("services.mobile.content.content3"),
            ],
            icon: mobile
        },
        {
            title: t("services.desktop.title"),
            text: t("services.desktop.content.text"),
            content: [
                t("services.desktop.content.content1"),
                t("services.desktop.content.content2"),
                t("services.desktop.content.content3"),
            ],
            icon: desktop
        },
        {
            title: t("services.software.title"),
            text: t("services.software.content.text"),
            content: [
                t("services.software.content.content1"),
                t("services.software.content.content2"),
                t("services.software.content.content3"),
            ],
            icon: software
        }
    ]



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

                <Grid width={"min(100%, 96rem)"} mx={"auto"} container spacing={{ xs: 4, sm: 8, md: 4, lg: 8 }}>
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