import { AppBar, Box, Button, Drawer, Select, Stack, styled, SwipeableDrawer, Toolbar, Typography } from "@mui/material"
import { HashLink } from "react-router-hash-link"
import logo from "../../../img/logo.webp"
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LngSwitcher from "./components/LngSwitcher/LngSwitcher";

const Header = () => {
    const NavigationBar = styled(AppBar)(({ theme }) => ({
        backgroundColor: theme.palette.background.secondary,
        padding: `${theme.spacing(1)} ${theme.spacing(9)}`,
        [theme.breakpoints.down("lg")]: { padding: `${theme.spacing(1)} ${theme.spacing(5)}` },
        [theme.breakpoints.down("md")]: { padding: `${theme.spacing(1)} ${theme.spacing(3)}` },
        [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(1)} ${theme.spacing(1)}` }
    }))



    const MobileMenu = styled(Stack)(({ theme }) => ({
        height: "100%",
        padding: `${theme.spacing(4)} ${theme.spacing(8)}`,
        paddingLeft: theme.spacing(4)
    }))



    const [mobileMenu, setMobileMenu] = useState(false)



    const { t } = useTranslation()



    return (
        <NavigationBar elevation={0} position="sticky">
            <Toolbar>
                <Box sx={{ width: { xs: "100px", md: "156px" } }}>
                    <img src={logo} alt="Our logo" className="image" />
                </Box>
                <Stack flex={1} direction={"row"} alignItems={"center"} justifyContent={"end"} gap={{ xs: 3, md: 5 }} sx={{ display: { xs: "none", sm: "flex" } }}>
                    <Stack direction={"row"} gap={{ xs: 2, md: 4 }}>
                        <HashLink to="/#hero"><Typography variant="body2">{t("header.home")}</Typography></HashLink>
                        <HashLink to="/#services"><Typography variant="body2">{t("header.services")}</Typography></HashLink>
                        <HashLink to="/#about"><Typography variant="body2">{t("header.about")}</Typography></HashLink>
                        <HashLink to="/#contact"><Typography variant="body2">{t("header.contact")}</Typography></HashLink>
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

                        <Stack gap={{ xs: 2, md: 4 }}>
                            <HashLink to="/#hero"><Typography variant="body2">{t("header.home")}</Typography></HashLink>
                            <HashLink to="/#services"><Typography variant="body2">{t("header.services")}</Typography></HashLink>
                            <HashLink to="/#about"><Typography variant="body2">{t("header.about")}</Typography></HashLink>
                            <HashLink to="/#contact"><Typography variant="body2">{t("header.contact")}</Typography></HashLink>
                        </Stack>
                    </MobileMenu>
                </SwipeableDrawer>

            </Toolbar>
        </NavigationBar>
    )
}

export default Header