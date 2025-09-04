import { Stack, Typography } from "@mui/material"
import { CheckBox } from "../../../../styling"

const InfoFeature = ({ featureObject = {} }) => {
    return (
        <Stack direction={"row"} gap={1.5} alignItems={"start"}>
            <CheckBox>
                <Typography variant="body2" color="background">✓</Typography>
            </CheckBox>

            <Stack gap={0.5}>
                <Typography variant="body2" fontSize={"0.9rem"} color="background" fontWeight={500}>{featureObject?.title}</Typography>
                <Typography variant="body2" fontSize={"0.8rem"} color="neutral.400">{featureObject?.content}</Typography>
            </Stack>
        </Stack>
    )
}

export default InfoFeature