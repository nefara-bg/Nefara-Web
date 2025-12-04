import { Stack } from "@mui/material"
import FadeInSection from "@/components/FadeInSection/FadeInSection";
import ContactFormCard from "@/components/ContactFormCard/ContactFormCard";
import OurContacts from "@/components/OurContacts/OurContacts";
import { parseBgPhone } from "@/utils/phone/phone";
import { validateContactEmail, validateContactPhone } from "@/utils/env/env";

const Contact = () => {
    const phone = validateContactPhone(process.env.NEXT_PUBLIC_CONTACT_PHONE)
    const phoneLabel = phone ? parseBgPhone(phone) : ''
    const email = validateContactEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL)



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

                    <ContactFormCard
                        phone={phone}
                        phoneLabel={phoneLabel}
                    />
                </Stack>
            </Stack>
        </FadeInSection>
    )
}

export default Contact