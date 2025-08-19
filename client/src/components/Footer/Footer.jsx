import { Box, Grid, Stack, Typography } from "@mui/material"
import logo from "../../img/footer-logo.webp"
import { HashLink } from "react-router-hash-link"
import { useTranslation } from "react-i18next";
import { FooterContainer, FooterLink } from "./styles";

const Footer = () => {
    const { t } = useTranslation()



    return (
        <FooterContainer>
            <Grid container spacing={{ xs: 3, md: 6 }} alignItems={"center"} justifyContent={"center"}>
                <Grid size={"grow"}>
                    <Stack direction={{ sm: "row" }} gap={{ xs: 1, sm: 3, md: 6 }} justifyContent={"end"} alignItems={"end"}>
                        <HashLink to="/#hero"><FooterLink variant="body1">{t("header.home")}</FooterLink></HashLink>
                        <HashLink to="/#services"><FooterLink variant="body1">{t("header.services")}</FooterLink></HashLink>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 3, sm: 2, lg: 1.5 }}>
                    <img src={logo} alt="Our logo" className="image" />
                </Grid>
                <Grid size={"grow"}>
                    <Stack direction={{ sm: "row" }} gap={{ xs: 1, sm: 3, md: 6 }} alignItems={"start"}>
                        <HashLink to="/#about"><FooterLink variant="body1">{t("header.about")}</FooterLink></HashLink>
                        <HashLink to="/#contact"><FooterLink variant="body1">{t("header.contact")}</FooterLink></HashLink>
                    </Stack>
                </Grid>
            </Grid>

            <Stack gap={1} textAlign={"center"}>
                <Typography variant="body2" color="primary.lighter">{t("footer.text")}</Typography>
                <Typography variant="body2" color="primary.lighter">&copy; {new Date().getFullYear()} {t("footer.copyright")}</Typography>
            </Stack>
        </FooterContainer>
    )
}

export default Footer