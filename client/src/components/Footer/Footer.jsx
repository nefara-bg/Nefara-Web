import { Box, Stack, styled, Typography } from "@mui/material"
import logo from "../../../img/footer-logo.webp"
import { HashLink } from "react-router-hash-link"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { useTranslation } from "react-i18next";

const Footer = () => {
    const FooterContainer = styled(Stack)(({ theme }) => ({
        background: theme.palette.primary.darker,
        padding: `${theme.spacing(9)} ${theme.spacing(12)}`,
        [theme.breakpoints.down("sm")]: {
            padding: `${theme.spacing(6)} ${theme.spacing(12)}`
        }
    }))


    const FooterLink = styled(Typography)(({ theme }) => ({
        color: theme.palette.primary.lighter,
        transition: ".2s",

        "&:hover": {
            color: theme.palette.primary.light
        }
    }))



    const { t } = useTranslation()



    return (
        <FooterContainer gap={{ xs: 3, md: 6 }}>
            <Stack direction={{ xs: "row" }} alignItems={"center"} justifyContent={"center"} gap={{ xs: 3, md: 6 }}>
                <HashLink to="/#hero"><FooterLink variant="body1">{t("header.home")}</FooterLink></HashLink>
                <HashLink to="/#services"><FooterLink variant="body1">{t("header.services")}</FooterLink></HashLink>

                <Box sx={{ width: "100px", display: { xs: "none", sm: "block" } }}>
                    <img src={logo} alt="Our logo" className="image" />
                </Box>

                <HashLink to="/#about"><FooterLink variant="body1">{t("header.about")}</FooterLink></HashLink>
                <HashLink to="/#contact"><FooterLink variant="body1">{t("header.contact")}</FooterLink></HashLink>
            </Stack>

            <Stack gap={1} textAlign={"center"}>
                <Typography variant="body2" color="primary.lighter">{t("footer.text")}</Typography>
                <Typography variant="body2" color="primary.lighter">&copy; {new Date().getFullYear()} {t("footer.copyright")}</Typography>
            </Stack>

            {/* <Stack direction={"row"} color="primary.lighter" justifyContent={"space-between"}>
                <Stack gap={1}>
                    <Typography variant="body1" color="primary.lighter">&copy; {new Date().getFullYear()} Software Solutions - All rights reserved.</Typography>
                    <Typography variant="body1" color="primary.lighter">Web, mobile and desktop applications for your business.</Typography>
                </Stack>

                <Stack gap={1} alignItems={"end"}>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                        <EmailOutlinedIcon color="inherit" fontSize="large" />
                        <Typography variant="body1" color="primary.lighter">johndoe@gmail.com</Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                        <LocalPhoneOutlinedIcon color="inherit" fontSize="large" />
                        <Typography variant="body1" color="primary.lighter">0888 888 888</Typography>
                    </Stack>
                </Stack>
            </Stack> */}
        </FooterContainer>
    )
}

export default Footer