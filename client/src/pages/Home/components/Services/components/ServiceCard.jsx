import { Grid, List, Stack, Typography } from "@mui/material"
import { ServiceContainer, StyledServiceCard } from "../../../styling"
import ImageContainer from "../../../../../components/ImageContainer/ImageContainer"
import { motion, useAnimate } from "motion/react";
import ServiceCardContent from "./components/ServiceCardContent/ServiceCardContent";
import CircleIcon from '@mui/icons-material/Circle';
import { useEffect, useRef, useState } from "react";
import { theme } from "../../../../../theme/theme";

const ServiceCard = ({ serviceObject }) => {
    // const iconVariants = {
    //     initial: {
    //         scale: 0
    //     },
    //     animate: {
    //         scale: 1,
    //         transition: {
    //             duration: 1.2,
    //             type: "spring"
    //         }
    //     }
    // }



    // const textColVariants = {
    //     initial: {
    //         opacity: 0
    //     },
    //     animate: {
    //         opacity: 1,
    //         transition: {
    //             duration: 0.2,
    //             staggerChildren: 0.3,
    //             when: "beforeChildren"
    //         }
    //     }
    // }



    const titleVariants = {
        initial: {
            width: 0
        },
        animate: {
            width: "100%",
            transition: {
                duration: 3
            }
        },
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


    const [scope, animate] = useAnimate()
    const titleRef = useRef(null)

    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        if(hovered) animate(titleRef.current, titleVariants.hover, { duration: 0.5 })
        else animate(titleRef.current, titleVariants.unhover, { duration: 0.5 })
    }, [hovered])



    return (
        <Grid size={{ xs: 12, md: 4 }}>
            <StyledServiceCard component={motion.div} ref={scope} variant="outlined" onMouseEnter={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
                <ImageContainer
                    src={serviceObject?.image}
                    imgClass="service-img"
                    props={{
                        borderRadius: "1rem",
                        overflow: "hidden",
                        marginBottom: "1.5rem"
                    }}
                />

                <Typography
                    variant="h5"
                    color="neutral.main" 
                    mb={1}
                    width={0} 
                    overflow={"hidden"} 
                    whiteSpace={"nowrap"}
                    component={motion.h5}
                    variants={titleVariants}
                    ref={titleRef}
                >
                    {serviceObject?.title}
                </Typography>
                <Typography variant="body2" mb={3}>{serviceObject?.text}</Typography>

                <Stack
                    gap={1}
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
            </StyledServiceCard>
        </Grid>
        // <Grid size={{ xs: 12, md: 6 }}>
        //     <ServiceContainer container spacing={{ xs: 3, sm: 2, lg: 4 }}>
        //         <Grid size={{ xs: 12, sm: 1.5, md: 2 }}>
        //             {
        //                 serviceObject.icon &&
        //                 <ImageContainer
        //                     src={serviceObject.icon}
        //                     alt="icon" 
        //                     props={{ 
        //                         sx: { 
        //                             width: { xs: "20%", sm: "100%" },
        //                             margin: { xs: "0 auto", sm: "0" }
        //                         },
        //                         component: motion.div,
        //                         variants: iconVariants,
        //                         initial: "initial",
        //                         whileInView: "animate",
        //                         viewport: { once: true }
        //                     }} 
        //                 />
        //             }
        //         </Grid>
        //         <Grid
        //             size="grow"
        //             display={"flex"}
        //             flexDirection={"column"}
        //             alignItems={{ xs: "center", sm: "start" }}
        //             component={motion.div}
        //             variants={textColVariants}
        //             initial="initial"
        //             whileInView="animate"
        //             viewport={{ once: true }}
        //         >
                    // <Typography
                    //     variant="h5"
                    //     color="neutral.main" 
                    //     mb={1}
                    //     width={0} 
                    //     overflow={"hidden"} 
                    //     whiteSpace={"nowrap"}
                    //     component={motion.h5}
                    //     variants={titleVariants}
                    // >
                    //     {serviceObject?.title}
                    // </Typography>
                    
                    // <Stack
                    //     gap={0.5}
                    //     component={motion.div}
                    //     variants={listVariants}
                    // >
                    //     {serviceObject.content?.map((point, index) => (
                    //         <ServiceCardContent
                    //             key={index}
                    //             content={point}
                    //         />
                    //     ))}
                    // </Stack>
        //         </Grid>
        //     </ServiceContainer>
        // </Grid>
    )
}

export default ServiceCard