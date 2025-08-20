import { Stack, SwipeableDrawer } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { MobileMenu, NavLink } from "../../styles";
import { HashLink } from "react-router-hash-link";
import LngSwitcher from "../LngSwitcher/LngSwitcher";
import { useState } from "react";
import logo from "../../../../img/logo.webp"
import { useTranslation } from "react-i18next";
import ImageContainer from "../../../ImageContainer/ImageContainer";

const MobileNav = () => {
    const [mobileMenu, setMobileMenu] = useState(false)



    const { t } = useTranslation()



    return (
        <>
            <Stack justifyContent={"end"} alignItems={"end"} flex={1} display={{ xs: "flex", md: "none" }}>
                <MenuIcon onClick={() => setMobileMenu(true)} color="neutral" display="block" sx={{ cursor: "pointer" }} />
            </Stack>

            <SwipeableDrawer open={mobileMenu} onOpen={() => setMobileMenu(true)} onClose={() => setMobileMenu(false)}>
                <MobileMenu>
                    <ImageContainer
                        src={logo}
                        alt="Our logo"
                        props={{
                            sx: { 
                                width: "120px"
                            },
                            mb: 3
                        }}
                    />

                    <Stack gap={{ xs: 2, md: 4 }} mb={3}>
                        <HashLink to="/#hero"><NavLink variant="body2">{t("header.home")}</NavLink></HashLink>
                        <HashLink to="/#services"><NavLink variant="body2">{t("header.services")}</NavLink></HashLink>
                        <HashLink to="/#about"><NavLink variant="body2">{t("header.about")}</NavLink></HashLink>
                        <HashLink to="/#contact"><NavLink variant="body2">{t("header.contact")}</NavLink></HashLink>
                    </Stack>

                    <LngSwitcher />
                </MobileMenu>
            </SwipeableDrawer>
        </>
    )
}

export default MobileNav