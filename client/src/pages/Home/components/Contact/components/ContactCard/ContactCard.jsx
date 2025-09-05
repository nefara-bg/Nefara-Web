import { Grid, Typography } from "@mui/material"
import { StyledContactCard } from "../../../../styling"
import { motion } from "motion/react"

const ContactCard = ({ icon = "", title = "", content = "", contact = "", href = "" }) => {
    const variants = {
        initial: { scale: 0 },
        animate: {
            scale: 1,
            transition: {
                duration: 1.2,
                type: "spring"
            }
        }
    }



    return (
        <Grid
            component={motion.a}
            href={href}
            size={{ xs: 12, sm: 6 }}
            variants={variants}
        >
            <StyledContactCard variant="outlined">
                <Typography mb={2} variant="h3">{icon}</Typography>
                <Typography variant="body1" mb={1} color="primary" fontWeight={"bold"}>{title}</Typography>
                <Typography variant="body2" mb={1.5}>{content}</Typography>
                <Typography variant="body2" fontWeight={500} color="primary">{contact}</Typography>
            </StyledContactCard>
        </Grid>
    )
}

export default ContactCard