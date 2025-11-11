import { Stack, Typography } from "@mui/material"

const InfoFeature = ({ featureObject = {} }) => {
    return (
        <Stack direction={"row"} gap={1.5} alignItems={"start"}>
            <Stack
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100%",
                    background: "var(--mui-palette-neutral-600)",
                    width: 3,
                    height: 3,
                    aspectRatio: "1 / 1"
                }}
            >
                <Typography variant="body2" color="background">✓</Typography>
            </Stack>

            <Stack gap={0.5}>
                <Typography variant="body2" fontSize={"0.9rem"} color="background" fontWeight={500}>{featureObject?.title}</Typography>
                <Typography variant="body2" fontSize={"0.8rem"} color="neutral.400">{featureObject?.content}</Typography>
            </Stack>
        </Stack>
    )
}

export default InfoFeature