import { Box, Button, Divider, Grid, Snackbar, Stack, styled, TextField, Typography } from "@mui/material"
import contact from "../../../../img/contact.webp"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ContactSection } from "../../styling";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";
import FadeInSection from "../../../../components/FadeInSection/FadeInSection";

const Contact = () => {
    const inputProps = {
        style: {
            fontSize: "16px"
        }
    }

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
            const res = await axios.post("https://nefara-server-xz6h.onrender.com/api/contact", {   
                email: emailRef.current.value,
                subject: subjectRef.current.value,
                message: messageRef.current.value,
            });

            emailRef.current.value = "";
            subjectRef.current.value = "";
            messageRef.current.value = "";

            if(res.status == 200) setToast(true)
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    const { t } = useTranslation()



    const phone = "+359887383000"
    const phoneLabel = "+359 88 738 3000"
    const email = "contacts@nefara.org"



    return (
        <FadeInSection>
            <ContactSection id="contact">
                <Snackbar
                    open={toast}
                    onClose={() => setToast(false)}
                    message={t("contact.alert")}
                    autoHideDuration={5000}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                />

                <Grid container spacing={{ xs: 4, lg: 8 }} alignItems={"center"} justifyContent={"center"} sx={{ textAlign: { xs: "center", lg: "start" } }}>
                    <Grid size={{ xs: 12, lg: 6 }}>
                        
                        <Stack mb={5}>
                            <Typography variant="h3" color="neutral.main" mb={1}>{t("contact.title")}</Typography>
                            <Typography variant="body2" mb={1}>{t("contact.content")}</Typography>

                            {error && <Typography variant="body2" color="error" fontStyle={"italic"}>{error}</Typography>}
                        </Stack>

                        <Stack gap={3}>
                            <TextField
                                variant="outlined"
                                label={t("contact.email")}
                                inputRef={emailRef}
                                inputProps={inputProps}
                            />
                            <TextField
                                variant="outlined"
                                label={t("contact.subject")}
                                inputRef={subjectRef}
                                inputProps={inputProps}
                            />
                            <TextField
                                variant="outlined"
                                label={t("contact.message")}
                                multiline
                                rows={6}
                                inputRef={messageRef}
                                inputProps={inputProps}
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
                    <Grid size={"grow"} sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column-reverse", lg: "column", }, gap: { xs: "48px", lg: "32px" } }}>
                        <ImageContainer
                            src={contact}
                            alt="Envelope illustration"
                            props={{
                                sx: { 
                                    width: "75%",
                                    px: { md: "128px", lg: 0 } 
                                }
                            }}
                        />

                        <Stack>
                            <Divider sx={{ width: "100%" }}>
                                <Typography variant="body2">{t("contact.divider")}</Typography>
                            </Divider>

                            <Stack direction={{ sm: "row" }} gap={{ xs: 0, sm: 4 }} mt={3} alignItems={"center"}>
                                <Stack direction={"row"} alignItems={"center"} gap={1}>
                                    <EmailOutlinedIcon color="primary" fontSize="large" />
                                    <Typography
                                        variant="body1"
                                        component={"a"}
                                        href={`mailto:${email}`}
                                    >
                                        {email}
                                    </Typography>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"} gap={1}>
                                    <LocalPhoneOutlinedIcon color="primary" fontSize="large" />
                                    <Typography
                                        variant="body1"
                                        component={"a"}
                                        href={`tel:${phone}`}
                                    >
                                        {phoneLabel}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </ContactSection>
        </FadeInSection>
    )
}

export default Contact