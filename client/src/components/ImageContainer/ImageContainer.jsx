import { Box } from "@mui/material"

const ImageContainer = ({ props, imgClass = "", src = null, alt = "Image", children }) => {
    return (
        <Box {...props}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`image ${imgClass}`}
            />
            {children}
        </Box>
    )
}

export default ImageContainer