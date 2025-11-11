import { Stack, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import { useTranslation } from "react-i18next";
import LngSwitcher from "@/components/Header/components/LngSwitcher/LngSwitcher";
import { NavigationBar, NavLink } from "@/components/Header/styling";
import MobileNav from "@/components/Header/components/MobileNav/MobileNav";
import { useParams } from "react-router-dom";
import Image from "next/image";

const Header = () => {
    const { lng } = useParams()
    const { t } = useTranslation()



    return (
        <NavigationBar elevation={2} position="fixed">
            <Toolbar sx={{ maxWidth: "96rem", width: "100%", mx: "auto" }}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Image
                        src="/logo.svg"
                        alt="Our logo"
                        width={32}
                        height={32}
                    />
                    <Typography variant="h5" sx={{ userSelect: "none" }} color="primary">Nefara</Typography>
                </Stack>
                
                <Stack flex={1} direction={"row"} alignItems={"center"} justifyContent={"end"} gap={{ xs: 3, lg: 5 }} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Stack direction={"row"} gap={{ xs: 2, lg: 4 }}>
                        <Link href={`/${lng}/#hero`}><NavLink variant="body2">{t("header.home")}</NavLink></Link>
                        <Link href={`/${lng}/#services`}><NavLink variant="body2">{t("header.services")}</NavLink></Link>
                        <Link href={`/${lng}/#about`}><NavLink variant="body2">{t("header.about")}</NavLink></Link>
                        <Link href={`/${lng}/#contact`}><NavLink variant="body2">{t("header.contact")}</NavLink></Link>
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