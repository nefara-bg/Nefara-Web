import { Grid, Typography } from "@mui/material"
import { StyledCard } from "../../app/styling"
import { motion } from "motion/react"

const AboutCard = ({ cardContent }) => {
    const cardVariants = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
            transition: {
                type: "spring",
                duration: 1.2
            }
        }
    }



    return (
        <Grid
            component={motion.div}
            size={{ xs: 12, sm: 6, lg:4 }}
            variants={cardVariants}
        >
            <StyledCard
                variant="outlined"  
                component={motion.div}
                initial={{ scale: 1 }}
                whileHover={{
                    scale: 1.03,
                    transition: {
                        duration: 0.5,
                        type: "spring",
                        bounce: 0.2
                    }
                }}
            >
                {
                    cardContent.icon &&
                    <Typography variant="h3" mb={2}>{cardContent?.icon}</Typography>
                }
                <Typography variant="h4" color="neutral.main" mb={0.5}>{cardContent?.number}</Typography>
                <Typography variant="body2" fontWeight={"bold"}>{cardContent?.label}</Typography>
            </StyledCard>
        </Grid>
    )
}

export default AboutCard