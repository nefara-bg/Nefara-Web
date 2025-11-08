import { Stack, SwipeableDrawer } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { MobileMenu, NavLink } from "../../styling";
import { HashLink } from "react-router-hash-link";
import LngSwitcher from "../LngSwitcher/LngSwitcher";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Image from "next/image";

const MobileNav = () => {
    const { lng } = useParams()



    const [mobileMenu, setMobileMenu] = useState(false)



    const { t } = useTranslation()



    return (
        <>
            <Stack justifyContent={"end"} alignItems={"end"} flex={1} display={{ xs: "flex", md: "none" }}>
                <MenuIcon onClick={() => setMobileMenu(true)} color="neutral" display="block" sx={{ cursor: "pointer" }} />
            </Stack>

            <SwipeableDrawer open={mobileMenu} onOpen={() => setMobileMenu(true)} onClose={() => setMobileMenu(false)}>
                <MobileMenu>
                    <Image
                        src="/logo.svg"
                        alt="Our logo"
                        width={48}
                        height={48}
                        style={{
                            marginBottom: "24px",
                            width: "48px"
                        }}
                    />

                    <Stack gap={{ xs: 2, md: 4 }} mb={3}>
                        <HashLink to={`/${lng}/#hero`}><NavLink variant="body2">{t("header.home")}</NavLink></HashLink>
                        <HashLink to={`/${lng}/#services`}><NavLink variant="body2">{t("header.services")}</NavLink></HashLink>
                        <HashLink to={`/${lng}/#about`}><NavLink variant="body2">{t("header.about")}</NavLink></HashLink>
                        <HashLink to={`/${lng}/#contact`}><NavLink variant="body2">{t("header.contact")}</NavLink></HashLink>
                    </Stack>

                    <LngSwitcher />
                </MobileMenu>
            </SwipeableDrawer>
        </>
    )
}

export default MobileNav