import { Box, Card, Divider, Grid, Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import InfoFeature from "@/components/InfoFeature/InfoFeature"
import * as motion from "motion/react-client"
import ContactForm from "@/components/ContactForm/ContactForm"
import { Twemoji } from "react-emoji-render"
import { encodePhoneForTel } from "@/utils/url/url";

const ContactFormCard =  ({ phone = "", phoneLabel = "" }) => {
    const t = useTranslations()



    const infoFeatures = [
        {
            title: t("contact.time.title"),
            content: t("contact.time.content")
        },
        {
            title: t("contact.consultation.title"),
            content: t("contact.consultation.content")
        },
        {
            title: t("contact.proposals.title"),
            content: t("contact.proposals.content")
        }
    ]



    return (
        <Box
            component={motion.div}
            initial={{
                scale: 0
            }}
            whileInView={{
                scale: 1,
                transition: {
                    duration: 1.5,
                    type: "spring"
                }
            }}
            viewport={{ once: true }}
        >
            <Card
                variant="outlined"
                component={Grid}
                container
                width={"100%"}
                textAlign={"start"}
            >
                <Grid size={{ xs: 12, lg: 8 }} p={{ xs: 3, sm: 6 }} component={Stack} justifyContent={"center"}>
                    <Stack gap={1} mb={4}>
                        <Typography color="primary" variant="h5">{t("contact.formTitle")}</Typography>
                        <Typography variant="body2">{t("contact.formText")}</Typography>
                    </Stack>

                    <ContactForm />
                </Grid>

                <Grid
                    size="grow"
                    sx={{
                        background: "linear-gradient(135deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-neutral-700) 50%, var(--mui-palette-neutral-900) 100%)"
                    }}
                    justifyContent={"center"}
                    p={{ xs: 4, sm: 6 }}
                    component={Stack}
                >
                    <Typography variant="h5" mb={2} color="background">{t("contact.infoTitle")}</Typography>

                    <Stack gap={2} mb={4}>
                        {
                            infoFeatures.map((feature, i) => (
                                <InfoFeature
                                    featureObject={feature}
                                    key={i}
                                />
                            ))
                        }
                    </Stack>

                    <Divider sx={{ bgcolor: "neutral.500" }} />

                    <Stack mt={4} gap={2}>
                        <Typography variant="body2" color="background" fontWeight={600}>{t("contact.call")}</Typography>
                        <Typography component={"a"} href={`tel:${encodePhoneForTel(phone)}`} variant="body2" color="background"><Twemoji svg text={`☎️ ${phoneLabel}`} /></Typography>
                    </Stack>
                </Grid>
            </Card>
        </Box>
    )
}

export default ContactFormCard