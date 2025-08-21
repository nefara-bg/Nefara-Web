import { Box } from "@mui/material"
import { useState } from "react"

const ImageContainer = ({ props, imgClass = "", src = null, alt = "Image", children }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    


    return (
        <Box {...props} className={`${isLoaded ? "scale-in" : ""}`}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`image ${imgClass}`}
                onLoad={() => setIsLoaded(true)}
            />
            {children}
        </Box>
    )
}

export default ImageContainer