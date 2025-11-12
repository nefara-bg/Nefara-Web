"use client"

import { AppBar, Stack, Toolbar, Typography } from "@mui/material"
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LngSwitcher from "@/components/Header/components/LngSwitcher/LngSwitcher";
import MobileNav from "@/components/Header/components/MobileNav/MobileNav";
import Image from "next/image";

const Header = ({ locale = "en" }) => {
    const t = useTranslations()



    return (
        <AppBar 
            elevation={2} 
            position="fixed"
            sx={{
                backgroundColor: "var(--mui-palette-background-main)",
                py: 0,
                px: { xs: 1, sm: 3, md: 3, lg: 5, xl: 9 }
            }}
        >
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
                        <Link href={`/#hero`}><Typography variant="body2" sx={{ transition: ".2s", "&:hover": { color: "var(--mui-palette-primary-main)" } }}>{t("header.home")}</Typography></Link>
                        <Link href={`/#services`}><Typography variant="body2" sx={{ transition: ".2s", "&:hover": { color: "var(--mui-palette-primary-main)" } }}>{t("header.services")}</Typography></Link>
                        <Link href={`/#about`}><Typography variant="body2" sx={{ transition: ".2s", "&:hover": { color: "var(--mui-palette-primary-main)" } }}>{t("header.about")}</Typography></Link>
                        <Link href={`/#contact`}><Typography variant="body2" sx={{ transition: ".2s", "&:hover": { color: "var(--mui-palette-primary-main)" } }}>{t("header.contact")}</Typography></Link>
                    </Stack>
                    
                    <Stack direction={"row"} gap={{ xs: 1, md: 2 }}>
                        <LngSwitcher locale={locale} />

                    </Stack>
                </Stack>

                <MobileNav locale={locale} />
            </Toolbar>
        </AppBar>
    )
}

export default Header