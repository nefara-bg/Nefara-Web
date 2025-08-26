import { CheckCircle } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"
import { motion } from "motion/react"

const ServiceCardContent = ({ content = "" }) => {
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
        }
    }



    return (
        <Stack
            direction="row"
            alignItems="start"
            spacing={1}
            // pl={2}
            component={motion.div}
            variants={containerVariants}
        >
            <CheckCircle
                sx={{ color: "primary.main" }}
                component={motion.svg}
                variants={iconVariants}
            />
            <Typography
                variant="body2"
                component={motion.p}
                variants={textVariants}
            >
                {content}
            </Typography>
        </Stack>
    )
}

export default ServiceCardContent