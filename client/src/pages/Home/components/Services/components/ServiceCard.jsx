import { Box, Grid, Stack, Typography } from "@mui/material"
import { ServiceOverlay, StyledServiceCard } from "../../../styling"
import { motion, useAnimate } from "motion/react";
import ServiceCardContent from "./components/ServiceCardContent/ServiceCardContent";
import { useEffect, useRef, useState } from "react";
import { theme } from "../../../../../theme/theme";

const ServiceCard = ({ serviceObject }) => {
    const cardVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1,
            transition: {
                duration: 1,
                type: "spring"
            }
        }
    }



    const iconVariants = {
        initial: {
            opacity: 0
        },
        hover: {
            opacity: 1
        }
    }



    const titleVariants = {
        hover: {
            color: theme.palette.neutral["600"]
        },
        unhover: {
            color: theme.palette.neutral.main
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


    const imageVariants = {
        initial: {
            scale: 1,
            opacity: 1
        },
        hover: {
            scale: 1.1,
            opacity: 0.4
        },
        unhover: {
            scale: 1,
            opacity: 1
        }
    }



    const overlayVariants = {
        initial: {
            opacity: 0
        },
        hover: {
            opacity: 1
        }
    }


    const [scope, animate] = useAnimate()
    const titleRef = useRef(null)
    const imageRef = useRef(null)
    const iconRef = useRef(null)
    const overlayRef = useRef(null)

    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        if(hovered) {
            animate(titleRef.current, titleVariants.hover, { duration: 0.5 })
            animate(imageRef.current, imageVariants.hover, { duration: 0.5 })
            animate(iconRef.current, iconVariants.hover, { duration: 0.5 })
            animate(overlayRef.current, overlayVariants.hover, { duration: 0.5 })
        }
        else {
            animate(titleRef.current, titleVariants.unhover, { duration: 0.5 })
            animate(imageRef.current, imageVariants.unhover, { duration: 0.5 })
            animate(iconRef.current, iconVariants.initial, { duration: 0.5 })
            animate(overlayRef.current, overlayVariants.initial, { duration: 0.5 })
        }
    }, [hovered])



    return (
        <Grid
            size={{ xs: 12, md: 4 }}
            component={motion.div}
            variants={cardVariants}
        >
            <StyledServiceCard component={motion.div} ref={scope} variant="outlined" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

                <ServiceOverlay
                    sx={{ 
                        backgroundImage: `linear-gradient(to bottom right, ${serviceObject.colors[0]}1A, ${serviceObject.colors[1]}1A)`,
                    }}
                    component={motion.div}
                    ref={overlayRef}
                    variants={overlayVariants}
                />

                <Box
                    borderRadius="1rem"
                    overflow="hidden"
                    marginBottom="1.5rem"
                    position={"relative"}
                >
                    <Typography
                        variant="h2"
                        sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}
                        component={motion.p}
                        variants={iconVariants}
                        ref={iconRef}
                    >
                        {serviceObject?.icon}
                    </Typography>
                    <motion.img
                        src={serviceObject?.image}
                        alt="Service Image"
                        loading="lazy"
                        className={`image service-img`}
                        ref={imageRef}
                        variants={imageVariants}
                    />
                </Box>

                <Stack sx={{ position: "relative", zIndex: 10, flex: 1 }}>
                    <Stack>
                        <Typography
                            variant="h5"
                            color="neutral.main" 
                            mb={1}
                            component={motion.h5}
                            variants={titleVariants}
                            ref={titleRef}
                        >
                            {serviceObject?.title}
                        </Typography>
                        <Typography variant="body2" mb={3}>{serviceObject?.text}</Typography>
                    </Stack>

                    <Stack
                        gap={1}
                        component={motion.div}
                        variants={listVariants}
                        mt={"auto"}
                    >
                        {serviceObject.content?.map((point, index) => (
                            <ServiceCardContent
                                key={index}
                                content={point}
                                animate={animate}
                                hovered={hovered}
                            />
                        ))}
                    </Stack>
                </Stack>
            </StyledServiceCard>
        </Grid>
    )
}

export default ServiceCard