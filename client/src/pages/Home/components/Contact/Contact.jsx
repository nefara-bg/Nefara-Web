import { Box, Button, Divider, Grid, Stack, styled, TextField, Typography } from "@mui/material"
import { HomeContainer } from "../../Home"
import contact from "../../../../../img/contact.webp"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { useRef, useState } from "react";
import axios from "axios";

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

    return (
        <ContactSection>
            <Grid container spacing={8} alignItems={"center"} justifyContent={"center"}>
                <Grid size={6}>
                    <Typography variant="h3" color="neutral.main" mb={1}>Get in Touch</Typography>
                    <Typography variant="body2" mb={5}>Ready to start your project? Contact us now. We will review your request and get back to you as soon as possible to hopefully start working together.</Typography>

                    <Stack gap={3}>
                        <TextField
                            variant="outlined"
                            label="Your email"
                            inputRef={emailRef}
                            inputProps={inputProps}
                        />
                        <TextField
                            variant="outlined"
                            label="Subject"
                            inputRef={subjectRef}
                            inputProps={inputProps}
                        />
                        <TextField
                            variant="outlined"
                            label="Your message"
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
                            {loading ? "Sending..." : "Contact Us"}
                        </Button>
                    </Stack>
                </Grid>
                <Grid size={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box sx={{ width: "75%" }} mb={4}>
                        <img src={contact} alt="Envelope illustration" className="image" />
                    </Box>

                    <Divider sx={{ width: "100%" }}>
                        <Typography variant="body2">You can also reach us at</Typography>
                    </Divider>

                    <Stack direction={"row"} gap={4} mt={3} alignItems={"center"}>
                        <Stack direction={"row"} alignItems={"center"} gap={1}>
                            <EmailOutlinedIcon color="primary" fontSize="large" />
                            <Typography variant="body1">johndoe@gmail.com</Typography>
                        </Stack>
                        <Stack direction={"row"} alignItems={"center"} gap={1}>
                            <LocalPhoneOutlinedIcon color="primary" fontSize="large" />
                            <Typography variant="body1">0888 888 888</Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </ContactSection>
    )
}

export default Contact