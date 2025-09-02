import { Typography } from "@mui/material"
import { Tag } from "./styling"

const SectionTag = ({ props = {}, content = "" }) => {
    return (
        <Tag {...props}>
            <Typography variant="body2">{content}</Typography>
        </Tag>
    )
}

export default SectionTag