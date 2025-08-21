import ImageContainer from "../../components/ImageContainer/ImageContainer"
import { Section } from "./styling"
import errImg from "../../img/error.webp"
import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const NotFound = () => {
    const { t } = useTranslation()



    return (
        <Section>
            <ImageContainer
                src={errImg}
                alt="The page was not found"
                props={{
                    sx: {
                        width: { xs: "60%", sm: "35%", md: "25%" }
                    },
                    mb: 4
                }}
            />

            <Typography variant="h3" color="neutral">{t("notFound.title")}</Typography>
            <Typography variant="body1" mb={2}>{t("notFound.content")}</Typography>
            <Link to={"/"}><Button variant="contained" size="large">{t("notFound.button")}</Button></Link>
        </Section>
    )
}

export default NotFound