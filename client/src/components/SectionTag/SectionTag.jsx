import { Stack, Typography } from "@mui/material"

const SectionTag = ({ props = {}, content = "" }) => {
    return (
        <Stack alignItems={"start"} {...props}>
            <Stack
                sx={{
                    background: "var(--mui-palette-neutral-100)",
                    borderRadius: "var(--mui-shape-roundedBorderRadius)",
                    py: 1,
                    px: 2,
                    transition: "0.2s",
                    "&:hover": {
                        boxShadow: "0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)"
                    }
                }}
            >
                <Typography variant="body2" fontWeight={500} color="neutral">{content}</Typography>
            </Stack>
        </Stack>
    )
}

export default SectionTag