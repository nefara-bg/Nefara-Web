import { Box, duration } from "@mui/material"
import desktop from "../../../../../../img/hero-desktop.webp"
import phone from "../../../../../../img/hero-phone.webp"
import tablet from "../../../../../../img/hero-tablet.webp"
import charm from "../../../../../../img/hero-charm.webp"
import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer"
import { motion } from "motion/react"

const ImageComposition = () => {
    const containerVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }

    const childrenVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1,
            transition: {
                duration: 0.3,
                type: "spring"
            }
        }
    }



    return (
        <Box
            sx={{ position: "relative" }}
            px={{ xs: 12, sm: 16, md: 4, lg: 12 }}
        >

            <ImageContainer
                src={desktop}
                alt="Desktop"
                props={{
                    sx: {
                        position: "relative"
                    },
                    component: motion.div,
                    variants: containerVariants,
                    initial: "initial",
                    whileInView: "animate",
                    viewport: { once: true }
                }}
            >
                <ImageContainer
                    src={phone}
                    alt="Phone"
                    props={{
                        sx: {
                            position: "absolute",
                            zIndex: 1,
                            width: "25%",
                            bottom: 0,
                            left: "-15%",
                            background: "white",
                            borderRadius: "20px",
                        },
                        component: motion.div,
                        variants: childrenVariants
                    }}
                />

                <ImageContainer
                    src={tablet}
                    alt="Tablet"
                    props={{
                        sx: {
                            position: "absolute",
                            zIndex: 1,
                            width: "40%",
                            bottom: 0,
                            right: "-25%",
                            background: "white",
                            borderRadius: "20px",
                        },
                        component: motion.div,
                        variants: childrenVariants
                    }}
                />

                <ImageContainer 
                    src={charm}
                    alt="Charm"
                    props={{
                        sx: {
                            position: "absolute",
                            zIndex: 1,
                            width: "20%",
                            top: "10%",
                            right: "-20%",
                            borderRadius: "20px"
                        },
                        component: motion.div,
                        variants: childrenVariants
                    }}
                    imgClass="charm reverse"
                />

                <ImageContainer 
                    src={charm}
                    alt="Charm"
                    props={{
                        sx: {
                            position: "absolute",
                            zIndex: 1,
                            width: "25%",
                            top: "-12%",
                            right: 0,
                            borderRadius: "20px"
                        },
                        component: motion.div,
                        variants: childrenVariants
                    }}
                    imgClass="charm"
                />
            </ImageContainer>

        </Box>
    )
}

export default ImageComposition