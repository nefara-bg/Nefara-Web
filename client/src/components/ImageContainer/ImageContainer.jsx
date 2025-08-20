import { Box } from "@mui/material"

const ImageContainer = ({ props, src = null, alt = "Image" }) => {
    return (
        <Box {...props}>
            <img src={src} alt={alt} className="image" />
        </Box>
    )
}

export default ImageContainer