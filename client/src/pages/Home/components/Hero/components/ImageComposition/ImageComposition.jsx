import { Box } from "@mui/material"
import desktop from "../../../../../../img/hero-desktop.webp"
import phone from "../../../../../../img/hero-phone.webp"
import tablet from "../../../../../../img/hero-tablet.webp"
import charm from "../../../../../../img/hero-charm.webp"
import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer"

const ImageComposition = () => {
    return (
        <Box sx={{ position: "relative" }} px={{ xs: 12, sm: 16, md: 4, lg: 12 }}>

            <ImageContainer
                src={desktop}
                alt="Desktop"
                props={{
                    sx: {
                        position: "relative"
                    }
                }}
            >
                <ImageContainer
                    src={phone}
                    alt="Phone"
                    props={{
                        sx: {
                            position: "absolute",
                            zIndex: 1,
                            width: "25%",
                            bottom: 0,
                            left: "-15%",
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
                            width: "40%",
                            bottom: 0,
                            right: "-25%",
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
                            width: "25%",
                            top: "-12%",
                            right: 0,
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
                            width: "20%",
                            top: "10%",
                            right: "-20%",
                            borderRadius: "20px"
                        }
                    }}
                    imgClass="charm reverse"
                />
            </ImageContainer>

        </Box>
    )
}

export default ImageComposition