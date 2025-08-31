import { duration, Grid, Typography } from "@mui/material"
import { StyledCard } from "../../../../styling"
import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer"
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
                    <ImageContainer
                        src={cardContent?.icon}
                        alt={cardContent?.title}
                        props={{
                            sx: { 
                                display: "flex",
                                width: { xs: "30%", sm: "40%", md: "min(30%, 8rem)" } 
                            },
                            mb: 3
                        }}
                    />
                }
                <Typography variant="h5" color="neutral.main" mb={1}>{cardContent?.title}</Typography>
                <Typography variant="body2">{cardContent?.content}</Typography>
            </StyledCard>
        </Grid>
    )
}

export default AboutCard