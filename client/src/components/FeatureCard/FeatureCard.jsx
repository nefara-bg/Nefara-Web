import { Card, Stack, Typography } from "@mui/material"
import * as motion from "motion/react-client"
import "./animation.css"

const FeatureCard = ({ feature = {} }) => {
    return (
        <Card
            variant="outlined"
            component={motion.div}
            sx={{
                padding: 3
            }}
            className="feature-card"
        >
            <Stack direction={"row"} gap={1} alignItems={"start"}>
                <Stack
                    p={1}
                    sx={{ aspectRatio: "1 / 1", bgcolor: "neutral.50" }}
                    className="feature-card-icon"
                >
                    <Typography variant="h5">{feature?.icon}</Typography>
                </Stack>

                <Stack gap={1}>
                    <Typography
                        variant="body2"
                        color="primary"
                        fontWeight={"bold"}
                        className="feature-card-title"
                    >
                        {feature?.title}
                    </Typography>
                    <Typography variant="body2">{feature?.description}</Typography>
                </Stack>
            </Stack>
        </Card>
    )
}

export default FeatureCard