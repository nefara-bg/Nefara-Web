import { Box, Card, Grid, Stack, Typography } from "@mui/material"
import * as motion from "motion/react-client"
import ServiceCardContent from "@/components/ServiceCardContent/ServiceCardContent";
import Image from "next/image";
import "./animation.css"

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
        <Grid
            size={{ xs: 12, md: 4 }}
            component={motion.div}
            variants={cardVariants}
        >
            <Card 
                component={motion.div}
                variant="outlined" 
                className="service-card"
                sx={{
                    padding: 3,
                    paddingBottom: 5,
                    backgroundColor: "linear-gradient(145deg, hsl(0 0 100%) 0%, hsl(0 0 98%) 100%)",
                    textAlign: "center",
                    height: "100%",
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
                    className="service-card-overlay"
                />

                <Box
                    borderRadius="1rem"
                    overflow="hidden"
                    marginBottom={3}
                    position={"relative"}
                >
                    <Typography
                        variant="h2"
                        sx={{ opacity: 0, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}
                        className="service-card-icon"
                    >
                        {serviceObject?.icon}
                    </Typography>
                    <Box
                        sx={{
                            aspectRatio: "16 / 9",
                            width: "100%",
                            position: "relative",
                            overflow: "hidden"
                        }}
                        className="service-card-image"
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
                            className="service-card-title"
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
                            />
                        ))}
                    </Stack>
                </Stack>
            </Card>
        </Grid>
    )
}

export default ServiceCard