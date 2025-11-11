import { Box, Card, Grid, Stack, Typography } from "@mui/material"
import { motion, useAnimate } from "motion/react";
import ServiceCardContent from "@/components/ServiceCardContent/ServiceCardContent";
import { useEffect, useRef, useState } from "react";
import { theme } from "@/theme/theme";
import Image from "next/image";

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
            <Card 
                component={motion.div} 
                ref={scope} 
                variant="outlined" 
                onMouseEnter={() => setHovered(true)} 
                onMouseLeave={() => setHovered(false)}
                sx={{
                    padding: 3,
                    paddingBottom: 5,
                    backgroundColor: "linear-gradient(145deg, hsl(0 0 100%) 0%, hsl(0 0 98%) 100%)",
                    textAlign: "center",
                    height: "100%",
                    transition: "0.5s",
                    "&:hover": {
                        transform: "scale(1.05)"
                    },
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box
                    sx={{ 
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        backgroundImage: `linear-gradient(to bottom right, ${serviceObject.colors[0]}1A, ${serviceObject.colors[1]}1A)`,
                    }}
                    component={motion.div}
                    ref={overlayRef}
                    variants={overlayVariants}
                />

                <Box
                    borderRadius="1rem"
                    overflow="hidden"
                    marginBottom={3}
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
                    <Box
                        component={motion.div}
                        ref={imageRef}
                        variants={imageVariants}
                        sx={{
                            aspectRatio: "16 / 9",
                            width: "100%",
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >
                        <Image
                            src={serviceObject?.image}
                            alt="Service Image"
                            fill
                            style={{
                                objectFit: "cover"
                            }}
                            sizes="425px"
                        />
                    </Box>
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
            </Card>
        </Grid>
    )
}

export default ServiceCard