import CircleIcon from '@mui/icons-material/Circle';
import { ListItem, Stack, Typography } from "@mui/material"
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
            alignItems="center"
            // justifyContent={"center"}
            spacing={1.5}
            // pl={2}
            component={motion.div}
            variants={containerVariants}
        >
            <CircleIcon
                sx={{ width: "0.5rem", height: "0.5rem" }}
            />
            <Typography
                variant="body2"
                textAlign={"start"}
                component={motion.p}
                variants={textVariants}
                fontWeight={"500"}
            >
                {content}
            </Typography>
        </Stack>
    )
}

export default ServiceCardContent