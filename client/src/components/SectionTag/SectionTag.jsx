import { Stack, Typography } from "@mui/material"
import { Tag } from "./styling"

const SectionTag = ({ props = {}, content = "" }) => {
    return (
        <Stack alignItems={"start"} {...props}>
            <Tag>
                <Typography variant="body2" fontWeight={500} color="neutral">{content}</Typography>
            </Tag>
        </Stack>
    )
}

export default SectionTag