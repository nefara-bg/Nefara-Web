import { Box } from "@mui/material"
import desktop from "../../../../../../img/hero-desktop.webp"
import phone from "../../../../../../img/hero-phone.webp"
import tablet from "../../../../../../img/hero-tablet.webp"
import charm from "../../../../../../img/hero-charm.webp"
import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer"

const ImageComposition = () => {
    return (
        <Box sx={{ position: "relative" }} px={{ xs: 12, sm: 24, md: 12 }}>

            <ImageContainer
                src={desktop}
                alt="Desktop"
            />

            <ImageContainer
                src={phone}
                alt="Phone"
                props={{
                    sx: {
                        position: "absolute",
                        zIndex: 1,
                        width: "120px",
                        bottom: 0,
                        left: "24px",
                        background: "white",
                        borderRadius: "20px",
                    }
                }}
            />

            <ImageContainer
                src={tablet}
                alt="Tablet"
                props={{
                    sx: {
                        position: "absolute",
                        zIndex: 1,
                        width: "180px",
                        bottom: "-30px",
                        right: "-20px",
                        background: "white",
                        borderRadius: "20px",
                    }
                }}
            />

            <ImageContainer 
                src={charm}
                alt="Charm"
                props={{
                    sx: {
                        position: "absolute",
                        zIndex: 1,
                        width: "100px",
                        top: "-52px",
                        right: "72px",
                        borderRadius: "20px"
                    }
                }}
                imgClass="charm"
            />

            <ImageContainer 
                src={charm}
                alt="Charm"
                props={{
                    sx: {
                        position: "absolute",
                        zIndex: 1,
                        width: "80px",
                        top: "48px",
                        right: 0,
                        borderRadius: "20px"
                    }
                }}
                imgClass="charm reverse"
            />

        </Box>
    )
}

export default ImageComposition