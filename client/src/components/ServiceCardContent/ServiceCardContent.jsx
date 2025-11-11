import CircleIcon from '@mui/icons-material/Circle';
import { Stack, Typography } from "@mui/material"
import { motion } from "motion/react"
import { theme } from '@/theme/theme';
import { useEffect, useRef } from 'react';

const ServiceCardContent = ({ content = "", hovered = false, animate }) => {
    const containerVariants = {
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
        },
    }

    const iconVariants = {
        initial: {
            rotate: "360deg",
            scale: 0,
            y: 5
        },
        animate: {
            rotate: "0deg",
            scale: 1,
            y: 1,
            transition: {
                duration: 1,
                type: "spring"
            }
        }
    }

    const textVariants = {
        initial: {
            y: 5,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                type: "spring"
            }
        },
        hover: {
            color: theme.palette.neutral.main
        },
        unhover: {
            color: theme.palette.neutral.light
        }
    }



    const bulletVariants = {
        initial: {
            scale: 1
        },
        hover: {
            scale: 1.5
        },
        unhover: {
            scale: 1
        }
    }



    const bulletRef = useRef(null)
    const textRef = useRef(null)



    useEffect(() => {
        if(hovered) {
            animate(textRef.current, textVariants.hover, { duration: 0.5 })
            animate(bulletRef.current, bulletVariants.hover, { duration: 0.5 })
        }
        else {
            animate(textRef.current, textVariants.unhover, { duration: 0.5 })
            animate(bulletRef.current, bulletVariants.unhover, { duration: 0.5 })
        }
    }, [hovered])



    return (
        <Stack
            direction="row"
            alignItems="center"
            // justifyContent={"center"}
            spacing={1.5}
            // pl={2}
            component={motion.div}
            variants={containerVariants}
        >
            <CircleIcon
                sx={{ width: "0.5rem", height: "0.5rem" }}
                component={motion.svg}
                ref={bulletRef}
                variants={bulletVariants}
                initial="initial"
            />
            <Typography
                variant="body2"
                textAlign={"start"}
                component={motion.p}
                variants={textVariants}
                fontWeight={"500"}
                ref={textRef}
            >
                {content}
            </Typography>
        </Stack>
    )
}

export default ServiceCardContent