import { Card, Grid, Typography } from "@mui/material"
import * as motion from "motion/react-client"

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
            <Card 
                variant="outlined"
                sx={{
                    padding: 4,
                    transition: "0.2s",
                    height: "100%",
                    "&:hover": {
                        scale: 1.05
                    }
                }}
            >
                <Typography mb={2} variant="h3">{icon}</Typography>
                <Typography variant="body1" mb={1} color="primary" fontWeight={"bold"}>{title}</Typography>
                <Typography variant="body2" mb={1.5}>{content}</Typography>
                <Typography variant="body2" fontWeight={500} color="primary">{contact}</Typography>
            </Card>
        </Grid>
    )
}

export default ContactCard