import { Grid, Typography } from "@mui/material"
import { StyledCard } from "../../../../styles"
import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer"

const AboutCard = ({ cardContent }) => {
    return (
        <Grid size={{ xs: 12, sm: 6, lg:4 }}>
            <StyledCard variant="outlined">
                {
                    cardContent.icon &&
                    <ImageContainer
                        src={cardContent?.icon}
                        alt={cardContent?.title}
                        props={{
                            sx: { 
                                display: "flex",
                                width: { xs: "30%", sm: "40%", md: "30%" } 
                            },
                            mb: 3
                        }}
                    />
                }
                <Typography variant="h5" color="neutral.main" mb={1}>{cardContent?.title}</Typography>
                <Typography variant="body2">{cardContent?.content}</Typography>
            </StyledCard>
        </Grid>
    )
}

export default AboutCard