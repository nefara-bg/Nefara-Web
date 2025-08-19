import { Box, Button, Stack, SwipeableDrawer, Toolbar } from "@mui/material"
import { HashLink } from "react-router-hash-link"
import logo from "../../img/logo.webp"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LngSwitcher from "./components/LngSwitcher/LngSwitcher";
import { MobileMenu, NavigationBar, NavLink } from "./styles";

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false)



    const { t } = useTranslation()



    return (
        <NavigationBar elevation={0} position="fixed">
            <Toolbar>
                <Box sx={{ width: { xs: "100px", md: "156px" } }}>
                    <img src={logo} alt="Our logo" className="image" />
                </Box>
                <Stack flex={1} direction={"row"} alignItems={"center"} justifyContent={"end"} gap={{ xs: 3, md: 5 }} sx={{ display: { xs: "none", sm: "flex" } }}>
                    <Stack direction={"row"} gap={{ xs: 2, md: 4 }}>
                        <HashLink to="/#hero"><NavLink variant="body2">{t("header.home")}</NavLink></HashLink>
                        <HashLink to="/#services"><NavLink variant="body2">{t("header.services")}</NavLink></HashLink>
                        <HashLink to="/#about"><NavLink variant="body2">{t("header.about")}</NavLink></HashLink>
                        <HashLink to="/#contact"><NavLink variant="body2">{t("header.contact")}</NavLink></HashLink>
                    </Stack>
                    
                    <Stack direction={"row"} gap={{ xs: 1, md: 2 }}>
                        <LngSwitcher />

                        <HashLink to="/#contact"><Button variant="contained" size="small" color="primary">{t("header.button")}</Button></HashLink>
                    </Stack>
                </Stack>

                <Stack justifyContent={"end"} alignItems={"end"} flex={1} display={{ xs: "flex", sm: "none" }}>
                    <MenuIcon onClick={() => setMobileMenu(true)} color="neutral" display="block" sx={{ cursor: "pointer" }} />
                </Stack>

                <SwipeableDrawer open={mobileMenu} onClose={() => setMobileMenu(false)}>
                    <MobileMenu>
                        <Box sx={{ width: "120px" }} mb={3}>
                            <img src={logo} alt="Our logo" className="image" />
                        </Box>

                        <Stack gap={{ xs: 2, md: 4 }} mb={3}>
                            <HashLink to="/#hero"><NavLink variant="body2">{t("header.home")}</NavLink></HashLink>
                            <HashLink to="/#services"><NavLink variant="body2">{t("header.services")}</NavLink></HashLink>
                            <HashLink to="/#about"><NavLink variant="body2">{t("header.about")}</NavLink></HashLink>
                            <HashLink to="/#contact"><NavLink variant="body2">{t("header.contact")}</NavLink></HashLink>
                        </Stack>

                        <LngSwitcher />
                    </MobileMenu>
                </SwipeableDrawer>

            </Toolbar>
        </NavigationBar>
    )
}

export default Header