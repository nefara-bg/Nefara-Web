import { Grid, Typography } from "@mui/material"
import ServiceCard from "./components/ServiceCard"
import web from "../../../../img/web.webp"
import mobile from "../../../../img/mobile.webp"
import desktop from "../../../../img/desktop.webp"
import software from "../../../../img/software.webp"
import { useTranslation } from "react-i18next"
import { HomeContainer } from "../../styling"

const Services = () => {
    const { t } = useTranslation()



    const services = [
        {
            title: t("services.web.title"),
            content: t("services.web.content"),
            icon: web
        },
        {
            title: t("services.mobile.title"),
            content: t("services.mobile.content"),
            icon: mobile
        },
        {
            title: t("services.desktop.title"),
            content: t("services.desktop.content"),
            icon: desktop
        },
        {
            title: t("services.software.title"),
            content: t("services.software.content"),
            icon: software
        }
    ]



    return (
        <HomeContainer id="services">
            <Typography variant="h3" textAlign={"center"} mb={4} color="neutral.main">{t("services.title")}</Typography>

            <Grid container spacing={{ xs: 4, sm: 8, md: 4, lg: 8 }}>
                {
                    services.map((service, i) => (
                        <ServiceCard serviceObject={service} key={i} />
                    ))
                }
            </Grid>
        </HomeContainer>
    )
}

export default Services