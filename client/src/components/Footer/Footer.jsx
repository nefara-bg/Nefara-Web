import { Box, Divider, Grid, Stack, Typography } from "@mui/material"
import logo from "../../img/footer-logo.svg"
import { HashLink } from "react-router-hash-link"
import { useTranslation } from "react-i18next";
import { FooterContainer, FooterLink } from "./styling";
import ImageContainer from "../ImageContainer/ImageContainer";
import { useParams } from "react-router-dom";
import SectionContainer from "../../pages/Home/components/SectionContainer/SectionContainer";

const Footer = () => {
    const { lng } = useParams()
    const { t } = useTranslation()



    const links = [
        {
            title: t("footer.services.web"),
            link: `/${lng}/#services`
        },
        {
            title: t("footer.services.desktop"),
            link: `/${lng}/#services`
        },
        {
            title: t("footer.services.mobile"),
            link: `/${lng}/#services`
        },
        {
            title: t("footer.services.consulting"),
            link: `/${lng}/#contact`
        }
    ]



    const email = "contacts@nefara.org"
    const phone = "+359887383000"
    const phoneLabel = "+359 88 738 3000"



    return (
        <FooterContainer>

            <SectionContainer>
                <Stack>
                    <Grid container mb={4} spacing={12}>
                        <Grid size={6} spacing={4}>
                            <Stack direction={"row"} gap={2} alignItems={"center"} mb={3}>
                                <ImageContainer props={{ width: "3.2rem" }} src={logo} alt="Our logo" />
                                <Typography variant="h5" color="background">Nefara</Typography>
                            </Stack>

                            <Typography variant="body2" color="neutral.300">{t("footer.text")}</Typography>
                        </Grid>

                        <Grid size={3}>
                            <Typography variant="body1" fontWeight={"bold"} color="background" mb={3}>{t("footer.services.title")}</Typography>

                            <Stack gap={1}>
                                {
                                    links.map((link, i) => (
                                        <HashLink key={i} to={link.link}><FooterLink variant="body2">{link.title}</FooterLink></HashLink>
                                    ))
                                }
                            </Stack>
                        </Grid>

                        <Grid size={3}>
                            <Typography variant="body1" fontWeight={"bold"} color="background" mb={3}>{t("footer.contact.title")}</Typography>

                            <Stack gap={2}>
                                <Stack direction={"row"} gap={1}>
                                    <Typography variant="body2">📧</Typography>

                                    <Stack>
                                        <Typography variant="body2" fontWeight={"bold"} color="background">{t("footer.contact.email")}</Typography>
                                        <FooterLink component="a" href={`mailto:${email}`} variant="body2">{email}</FooterLink>
                                    </Stack>
                                </Stack>
                                <Stack direction={"row"} gap={1}>
                                    <Typography variant="body2">📞</Typography>

                                    <Stack>
                                        <Typography variant="body2" fontWeight={"bold"} color="background">{t("footer.contact.phone")}</Typography>
                                        <FooterLink component="a" href={`mailto:${phone}`} variant="body2">{phoneLabel}</FooterLink>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider sx={{ bgcolor: "neutral.500" }} />

                        {/* <Typography variant="body2" color="primary.lighter">{t("footer.text")}</Typography> */}
                    <Stack mt={4} direction={"row"} gap={1} justifyContent={"space-between"}>
                        <Typography variant="body2" color="neutral.500">&copy; {new Date().getFullYear()} {t("footer.copyright")}</Typography>
                        <HashLink to={`/${lng}/#hero`}><FooterLink variant="body2">{t("footer.back")} ↗️</FooterLink></HashLink>
                    </Stack>
                </Stack>
            </SectionContainer>
        </FooterContainer>
    )
}

export default Footer