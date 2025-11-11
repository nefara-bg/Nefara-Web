"use client"

import { Divider, Grid, Stack, Typography } from "@mui/material"
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SectionContainer from "@/components/SectionContainer/SectionContainer";
import Image from "next/image"

const Footer = () => {
    const { t } = useTranslations()


    const links = [
        {
            title: t("footer.services.web"),
            link: `/#services`
        },
        {
            title: t("footer.services.desktop"),
            link: `/#services`
        },
        {
            title: t("footer.services.mobile"),
            link: `/#services`
        },
        {
            title: t("footer.services.consulting"),
            link: `/#contact`
        }
    ]



    const email = "contacts@nefara.org"
    const phone = "+359887383000"
    const phoneLabel = "+359 88 738 3000"



    return (
        <Stack
            sx={{
                background: "linear-gradient(135deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-neutral-700) 50%, var(--mui-palette-neutral-900) 100%)",
                position: "relative",
                zIndex: 10,
                py: { xs: 6, sm: 9, md: 9 },
                px: { xs: 2, sm: 2, md: 12 },
                gap: { xs: 3, md: 4 }
            }}
        >

            <SectionContainer>
                <Stack>
                    <Grid container mb={4} spacing={{ xs: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, lg: 6 }} spacing={4}>
                            <Stack direction={"row"} gap={2} alignItems={"center"} mb={3}>
                                <Image
                                    src="/footer-logo.svg"
                                    alt="Our logo"
                                    width={56}
                                    height={56}
                                    style={{
                                        width: "3.2rem"
                                    }}
                                />
                                <Typography variant="h5" color="background">Nefara</Typography>
                            </Stack>

                            <Typography variant="body2" color="neutral.300">{t("footer.text")}</Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Typography variant="body1" fontWeight={"bold"} color="background" mb={3}>{t("footer.services.title")}</Typography>

                            <Stack gap={1}>
                                {
                                    links.map((link, i) => (
                                        <Link key={i} href={link.link}><Typography variant="body2" sx={{ color: "var(--mui-palette-neutral-400)", transition: ".2s", "&:hover": { color: "var(--mui-palette-neutral-100)" }, flexWrap: "nowrap", whiteSpace: "nowrap" }}>{link.title}</Typography></Link>
                                    ))
                                }
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Typography variant="body1" fontWeight={"bold"} color="background" mb={3}>{t("footer.contact.title")}</Typography>

                            <Stack gap={2}>
                                <Stack direction={"row"} gap={1}>
                                    <Typography variant="body2">📧</Typography>

                                    <Stack>
                                        <Typography variant="body2" fontWeight={"bold"} color="background">{t("footer.contact.email")}</Typography>
                                        <Typography component="a" href={`mailto:${email}`} variant="body2" sx={{ color: "var(--mui-palette-neutral-400)", transition: ".2s", "&:hover": { color: "var(--mui-palette-neutral-100)" }, flexWrap: "nowrap", whiteSpace: "nowrap" }}>{email}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction={"row"} gap={1}>
                                    <Typography variant="body2">📞</Typography>

                                    <Stack>
                                        <Typography variant="body2" fontWeight={"bold"} color="background">{t("footer.contact.phone")}</Typography>
                                        <Typography component="a" href={`mailto:${phone}`} variant="body2" sx={{ color: "var(--mui-palette-neutral-400)", transition: ".2s", "&:hover": { color: "var(--mui-palette-neutral-100)" }, flexWrap: "nowrap", whiteSpace: "nowrap" }}>{phoneLabel}</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider sx={{ bgcolor: "neutral.500" }} />

                    <Stack mt={4} direction={{ sm: "row" }} gap={1} justifyContent={"space-between"}>
                        <Typography variant="body2" color="neutral.500">&copy; {new Date().getFullYear()} {t("footer.copyright")}</Typography>
                        <Link href={`/#hero`}><Typography variant="body2" sx={{ color: "var(--mui-palette-neutral-400)", transition: ".2s", "&:hover": { color: "var(--mui-palette-neutral-100)" }, flexWrap: "nowrap", whiteSpace: "nowrap" }}>{t("footer.back")} ↗️</Typography></Link>
                    </Stack>
                </Stack>
            </SectionContainer>
        </Stack>
    )
}

export default Footer