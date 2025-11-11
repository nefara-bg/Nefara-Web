import { Stack, Typography } from "@mui/material"
import { StyledFeatureCard } from "@/app/styling"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimate } from "motion/react"
import { theme } from "@/theme/theme"

const FeatureCard = ({ feature = {} }) => {
    const [scope, animate] = useAnimate()

    const iconVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1 }
    }

    const titleVariants = {
        initial: { color: theme.palette.primary.main },
        hover: { color: theme.palette.neutral["700"] }
    }



    const [hover, setHover] = useState(false)
    const iconRef = useRef(null)
    const titleRef = useRef(null)



    useEffect(() => {
        if(hover) {
            animate(iconRef.current, iconVariants.hover, { duration: 0.2 })
            animate(titleRef.current, titleVariants.hover, { duration: 0.2 })
        }
        else {
            animate(iconRef.current, iconVariants.initial, { duration: 0.2 })
            animate(titleRef.current, titleVariants.initial, { duration: 0.2 })
        }
    }, [hover])



    return (
        <StyledFeatureCard
            variant="outlined"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            ref={scope}
            component={motion.div}
        >
            <Stack direction={"row"} gap={1} alignItems={"start"}>
                <Stack
                    ref={iconRef}
                    p={1}
                    sx={{ aspectRatio: "1 / 1", bgcolor: "neutral.50" }}
                    component={motion.div}
                    variants={iconVariants}
                >
                    <Typography variant="h5">{feature?.icon}</Typography>
                </Stack>

                <Stack gap={1}>
                    <Typography
                        ref={titleRef}
                        variant="body2"
                        color="primary"
                        fontWeight={"bold"}
                        component={motion.p}
                        variants={titleVariants}
                    >
                        {feature?.title}
                    </Typography>
                    <Typography variant="body2">{feature?.description}</Typography>
                </Stack>
            </Stack>
        </StyledFeatureCard>
    )
}

export default FeatureCard