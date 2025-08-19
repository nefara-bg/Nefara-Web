import { Box, Button, Divider, Grid, Stack, styled, TextField, Typography } from "@mui/material"
import { HomeContainer } from "../../Home"
import contact from "../../../../img/contact.webp"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Contact = () => {
    const ContactSection = styled(HomeContainer)(({ theme }) => ({
        background: theme.palette.background.secondary,
    }))


    const inputProps = {
        style: {
            fontSize: "16px"
        }
    }

    const emailRef = useRef();
    const subjectRef = useRef();
    const messageRef = useRef();

    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setResponseMsg("");

        try {
            const res = await axios.post("https://software-solutions-server.onrender.com/api/contact", {
                email: emailRef.current.value,
                subject: subjectRef.current.value,
                message: messageRef.current.value,
            });
            setResponseMsg(res.data);

            emailRef.current.value = "";
            subjectRef.current.value = "";
            messageRef.current.value = "";
        } catch (err) {
            console.error(err);
            setResponseMsg("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    const { t } = useTranslation()



    return (
        <ContactSection id="contact">
            <Grid container spacing={{ xs: 4, lg: 8 }} alignItems={"center"} justifyContent={"center"} sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Typography variant="h3" color="neutral.main" mb={1}>{t("contact.title")}</Typography>
                    <Typography variant="body2" mb={5}>{t("contact.content")}</Typography>

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
                <Grid size={"grow"} sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexDirection: { xs: "column-reverse", lg: "column", }, gap: { xs: "48px", lg: "32px" } }}>
                    <Box sx={{ width: "75%", px: { md: "128px", lg: 0 } }}>
                        <img src={contact} alt="Envelope illustration" className="image" />
                    </Box>

                    <Stack>
                        <Divider sx={{ width: "100%" }}>
                            <Typography variant="body2">{t("contact.divider")}</Typography>
                        </Divider>

                        <Stack direction={{ sm: "row" }} gap={{ xs: 0, sm: 4 }} mt={3} alignItems={"center"}>
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                <EmailOutlinedIcon color="primary" fontSize="large" />
                                <Typography variant="body1">johndoe@gmail.com</Typography>
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                <LocalPhoneOutlinedIcon color="primary" fontSize="large" />
                                <Typography variant="body1">0888 888 888</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </ContactSection>
    )
}

export default Contact