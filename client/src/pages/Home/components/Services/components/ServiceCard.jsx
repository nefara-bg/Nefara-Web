import { duration, Grid, Stack, Typography } from "@mui/material"
import { CheckCircle } from "@mui/icons-material";
import { ServiceContainer } from "../../../styling"
import ImageContainer from "../../../../../components/ImageContainer/ImageContainer"
import { motion } from "motion/react";
import ServiceCardContent from "./components/ServiceCardContent/ServiceCardContent";

const ServiceCard = ({ serviceObject }) => {
    const iconVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1,
            transition: {
                duration: 1.2,
                type: "spring"
            }
        }
    }



    const textColVariants = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.2,
                staggerChildren: 0.3,
                when: "beforeChildren"
            }
        }
    }



    const titleVariants = {
        initial: {
            width: 0
        },
        animate: {
            width: "100%",
            transition: {
                duration: 3
            }
        }
    }



    const listVariants = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0,
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    }



    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <ServiceContainer container spacing={{ xs: 3, sm: 2, lg: 4 }}>
                <Grid size={{ xs: 12, sm: 1.5, md: 2 }}>
                    {
                        serviceObject.icon &&
                        <ImageContainer
                            src={serviceObject.icon}
                            alt="icon" 
                            props={{ 
                                sx: { 
                                    width: { xs: "20%", sm: "100%" },
                                    margin: { xs: "0 auto", sm: "0" }
                                },
                                component: motion.div,
                                variants: iconVariants,
                                initial: "initial",
                                whileInView: "animate",
                                viewport: { once: true }
                            }} 
                        />
                    }
                </Grid>
                <Grid
                    size="grow"
                    component={motion.div}
                    variants={textColVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h5"
                        color="neutral.main" 
                        mb={1}
                        width={0} 
                        overflow={"hidden"} 
                        whiteSpace={"nowrap"}
                        component={motion.h5}
                        variants={titleVariants}
                    >
                        {serviceObject?.title}
                    </Typography>
                    
                    <Stack
                        gap={0.5}
                        component={motion.div}
                        variants={listVariants}
                    >
                        {serviceObject.content?.map((point, index) => (
                            <ServiceCardContent
                                key={index}
                                content={point}
                            />
                        ))}
                    </Stack>
                </Grid>
            </ServiceContainer>
        </Grid>
    )
}

export default ServiceCard