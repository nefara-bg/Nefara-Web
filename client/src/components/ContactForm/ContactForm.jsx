"use client"

import { Box, Button, Card, Divider, Grid, Snackbar, Stack, Typography } from "@mui/material"
import FormInputField from "../FormInputField/FormInputField"
import { ContactInfoBox } from "../../app/styling"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import axios from "axios"
import InfoFeature from "../InfoFeature/InfoFeature"
import { motion } from "motion/react"

const ContactForm = ({ phone = "", phoneLabel = "" }) => {
    const t = useTranslations()



    const emailRef = useRef();
    const subjectRef = useRef();
    const messageRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [toast, setToast] = useState(false)

    const handleSubmit = async () => {
        setLoading(true);
        setError(null)

        try {
            const res = await axios.post("https://nefara.org/api/contact", {
                email: emailRef.current.value,
                subject: subjectRef.current.value,
                message: messageRef.current.value,
            });

            emailRef.current.value = "";
            subjectRef.current.value = "";
            messageRef.current.value = "";

            if(res.status == 200) setToast(true)
        } catch (err) {
            console.log(err)
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };



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
                <Snackbar
                    open={toast}
                    onClose={() => setToast(false)}
                    message={t("contact.alert")}
                    autoHideDuration={5000}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                />

                <Grid size={{ xs: 12, lg: 8 }} p={{ xs: 3, sm: 6 }} component={Stack} justifyContent={"center"}>
                    <Stack gap={1} mb={4}>
                        <Typography color="primary" variant="h5">{t("contact.formTitle")}</Typography>
                        <Typography variant="body2">{t("contact.formText")}</Typography>
                        {error && <Typography variant="body2" color="error" fontStyle={"italic"}>{error}</Typography>}
                    </Stack>

                    <Stack gap={3}>
                        <Stack width={"100%"} direction={"row"} gap={2}>
                            <FormInputField
                                label={t("contact.email")}
                                placeholder={t("contact.emailPlaceholder")}
                                inputRef={emailRef}
                            />
                            <FormInputField
                                label={t("contact.subject")}
                                placeholder={t("contact.subjectPlaceholder")}
                                inputRef={subjectRef}
                            />
                        </Stack>
                        <FormInputField
                            label={t("contact.message")}
                            placeholder={t("contact.messagePlaceholder")}
                            multiline={true}
                            rows={4}
                            inputRef={messageRef}
                        />
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? t("contact.loading") : t("contact.button")}
                        </Button>
                    </Stack>
                </Grid>

                <ContactInfoBox
                    size="grow"
                    justifyContent={"center"}
                    p={{ xs: 4, sm: 6 }}
                    component={Stack}
                >
                    <form onSubmit={handleSubmit}>
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
                            <Typography component={"a"} href={`tel:${phone}`} variant="body2" color="background">📞 {phoneLabel}</Typography>
                        </Stack>
                    </form>
                </ContactInfoBox>
            </Card>
        </Box>
    )
}

export default ContactForm