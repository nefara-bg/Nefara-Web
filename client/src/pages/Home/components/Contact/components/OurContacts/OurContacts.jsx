import { Grid, Stack, Typography } from "@mui/material"
import SectionTag from "../../../../../../components/SectionTag/SectionTag"
import TextGradient from "../../../../../../components/TextGradient/TextGradient"
import ContactCard from "../ContactCard/ContactCard"
import { useTranslation } from "react-i18next"
import { motion } from "motion/react"

const OurContacts = ({ email = "", phone = "", phoneLabel = "" }) => {
    const { t } = useTranslation()



    const variants = {
        initial: { scale: 0 },
        animate: {
            scale: 1,
            transition: {
                duration: 0,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }



    return (
        <>
            <Stack alignItems={"center"} mb={8}>
                <SectionTag props={{ mb: 3 }} content={`💡 ${t("contact.tag")}`} />

                <Stack mb={3}>
                    <Typography variant="h3">{t("contact.title")}</Typography>
                    <TextGradient props={{ variant: "h3" }}>{t("contact.subtitle")}</TextGradient>
                </Stack>

                <Typography variant="body1">{t("contact.content")}</Typography>
            </Stack>

            <Grid
                component={motion.div}
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                container
                width={"100%"}
                direction={"row"}
                alignItems={"stretch"}
                gap={3}
                mb={8}
            >
                <ContactCard
                    icon="✉️"
                    title={t("contact.emailTitle")}
                    content={t("contact.emailContent")}
                    contact={email}
                    href={`mailto:${email}`}
                />
                <ContactCard
                    icon="📞"
                    title={t("contact.phoneTitle")}
                    content={t("contact.phoneContent")}
                    contact={phoneLabel}
                    href={`tel:${phone}`}
                >
                    <Typography variant="h4"></Typography>
                </ContactCard>
            </Grid>
        </>
    )
}

export default OurContacts