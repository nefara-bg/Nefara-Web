import { Stack, SwipeableDrawer, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "@/i18n/navigation";
// import LngSwitcher from "@/components/Header/components/LngSwitcher/LngSwitcher";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MobileNav = () => {
    const [mobileMenu, setMobileMenu] = useState(false)



    const t = useTranslations()



    return (
        <>
            <Stack justifyContent={"end"} alignItems={"end"} flex={1} display={{ xs: "flex", md: "none" }}>
                <MenuIcon onClick={() => setMobileMenu(true)} color="neutral" display="block" sx={{ cursor: "pointer" }} />
            </Stack>

            <SwipeableDrawer open={mobileMenu} onOpen={() => setMobileMenu(true)} onClose={() => setMobileMenu(false)}>
                <Stack
                    sx={{
                        height: "100%",
                        py: 4,
                        px: 4
                    }}
                >
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
                        <Link href={`/#hero`}><Typography variant="body2" sx={{ transition: ".2s", "&:hover": { color: "var(--mui-palette-primary-main)" } }}>{t("header.home")}</Typography></Link>
                        <Link href={`/#services`}><Typography variant="body2" sx={{ transition: ".2s", "&:hover": { color: "var(--mui-palette-primary-main)" } }}>{t("header.services")}</Typography></Link>
                        <Link href={`/#about`}><Typography variant="body2" sx={{ transition: ".2s", "&:hover": { color: "var(--mui-palette-primary-main)" } }}>{t("header.about")}</Typography></Link>
                        <Link href={`/#contact`}><Typography variant="body2" sx={{ transition: ".2s", "&:hover": { color: "var(--mui-palette-primary-main)" } }}>{t("header.contact")}</Typography></Link>
                    </Stack>

                    {/* <LngSwitcher /> */}
                </Stack>
            </SwipeableDrawer>
        </>
    )
}

export default MobileNav