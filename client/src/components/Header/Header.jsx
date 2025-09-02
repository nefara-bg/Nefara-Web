import { Button, Stack, Toolbar, Typography } from "@mui/material"
import { HashLink } from "react-router-hash-link"
import logo from "../../img/logo.svg"
import { useTranslation } from "react-i18next";
import LngSwitcher from "./components/LngSwitcher/LngSwitcher";
import { NavigationBar, NavLink } from "./styling";
import MobileNav from "./components/MobileNav/MobileNav";
import ImageContainer from "../ImageContainer/ImageContainer";
import { useParams } from "react-router-dom";

const Header = () => {
    const { lng } = useParams()
    const { t } = useTranslation()



    return (
        <NavigationBar elevation={2} position="fixed">
            <Toolbar>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <ImageContainer
                        src={logo}
                        alt="Our logo"
                        props={{
                            sx: {
                                width: "32px"
                            }
                        }}
                    />
                    <Typography variant="h5" sx={{ userSelect: "none" }} color="#0d3163">Nefara</Typography>
                </Stack>
                
                <Stack flex={1} direction={"row"} alignItems={"center"} justifyContent={"end"} gap={{ xs: 3, lg: 5 }} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Stack direction={"row"} gap={{ xs: 2, lg: 4 }}>
                        <HashLink to={`/${lng}/#hero`}><NavLink variant="body2">{t("header.home")}</NavLink></HashLink>
                        <HashLink to={`/${lng}/#services`}><NavLink variant="body2">{t("header.services")}</NavLink></HashLink>
                        <HashLink to={`/${lng}/#about`}><NavLink variant="body2">{t("header.about")}</NavLink></HashLink>
                        <HashLink to={`/${lng}/#contact`}><NavLink variant="body2">{t("header.contact")}</NavLink></HashLink>
                    </Stack>
                    
                    <Stack direction={"row"} gap={{ xs: 1, md: 2 }}>
                        <LngSwitcher />

                    </Stack>
                </Stack>

                <MobileNav />
            </Toolbar>
        </NavigationBar>
    )
}

export default Header