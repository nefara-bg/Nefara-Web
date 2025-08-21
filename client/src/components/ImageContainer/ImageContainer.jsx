import { Box } from "@mui/material"

const ImageContainer = ({ props, imgClass = "", src = null, alt = "Image", children }) => {
    return (
        <Box {...props} className="scale-in">
            <img src={src} alt={alt} className={`image ${imgClass}`} />
            {children}
        </Box>
    )
}

export default ImageContainer