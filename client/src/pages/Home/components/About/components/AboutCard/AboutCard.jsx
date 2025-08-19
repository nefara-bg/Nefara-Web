import { Box, Grid, Typography } from "@mui/material"
import { StyledCard } from "../../../../styles"

const AboutCard = ({ cardContent }) => {
    return (
        <Grid size={{ xs: 12, sm: 6, lg:4 }}>
            <StyledCard variant="outlined">
                {
                    cardContent.icon &&
                    <Box sx={{ display: "flex", width: { xs: "30%", sm: "40%", md: "30%" } }} mb={3}>
                        <img className="image" src={cardContent?.icon} alt={cardContent?.title} />
                    </Box>
                }
                <Typography variant="h5" color="neutral.main" mb={1}>{cardContent?.title}</Typography>
                <Typography variant="body2">{cardContent?.content}</Typography>
            </StyledCard>
        </Grid>
    )
}

export default AboutCard