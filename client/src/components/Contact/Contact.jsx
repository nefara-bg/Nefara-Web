import { Stack } from "@mui/material"
import FadeInSection from "@/components/FadeInSection/FadeInSection";
import ContactForm from "@/components/ContactForm/ContactForm";
import OurContacts from "@/components/OurContacts/OurContacts";

const Contact = () => {
    const phone = "+359887383000"
    const phoneLabel = "+359 88 738 3000"
    const email = "contacts@nefara.org"



    return (
        <FadeInSection>
            <Stack 
                id="contact"
                sx={{
                    py: { xs: 9, sm: 9, md: 9, lg: 9, xl: 9 },
                    px: { xs: 2, sm: 6, md: 6, lg: 8, xl: 12 },
                    alignItems: "center",
                    background: "var(--mui-palette-background-main)",
                    minHeight: "min(100vh, 60rem)",
                    display: "flex"
                }}
            >
                <Stack maxWidth={"60rem"} textAlign={"center"} alignItems={"center"}>
                    <OurContacts
                        email={email}
                        phone={phone}
                        phoneLabel={phoneLabel}
                    />

                    <ContactForm
                        phone={phone}
                        phoneLabel={phoneLabel}
                    />
                </Stack>
            </Stack>
        </FadeInSection>
    )
}

export default Contact