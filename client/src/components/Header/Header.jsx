import { Stack, Toolbar, Typography } from "@mui/material"
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import LngSwitcher from "./components/LngSwitcher/LngSwitcher";
import { NavigationBar, NavLink } from "./styling";
import MobileNav from "./components/MobileNav/MobileNav";
import Image from "next/image";

const Header = async () => {
    const t = await getTranslations()
    const locale = await getLocale()



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
                        <Link href={`/${locale}#hero`}><NavLink variant="body2">{t("header.home")}</NavLink></Link>
                        <Link href={`/${locale}#services`}><NavLink variant="body2">{t("header.services")}</NavLink></Link>
                        <Link href={`/${locale}#about`}><NavLink variant="body2">{t("header.about")}</NavLink></Link>
                        <Link href={`/${locale}#contact`}><NavLink variant="body2">{t("header.contact")}</NavLink></Link>
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