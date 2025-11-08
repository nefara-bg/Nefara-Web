import { Stack } from "@mui/material"
import { ContactSection } from "../../app/styling";
import FadeInSection from "../FadeInSection/FadeInSection";
import ContactForm from "./components/ContactForm/ContactForm";
import OurContacts from "./components/OurContacts/OurContacts";

const Contact = () => {
    const phone = "+359887383000"
    const phoneLabel = "+359 88 738 3000"
    const email = "contacts@nefara.org"



    return (
        <FadeInSection>
            <ContactSection id="contact">
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
            </ContactSection>
        </FadeInSection>
    )
}

export default Contact