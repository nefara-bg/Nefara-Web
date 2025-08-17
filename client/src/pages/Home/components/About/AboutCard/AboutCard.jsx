import { Box, Card, CardHeader, Grid, styled, Typography } from "@mui/material"

const AboutCard = ({ cardContent }) => {
    const StyledCard = styled(Card)(({ theme }) => ({
        textAlign: "center",
        height: "100%",
        transition: ".2s",
        background: theme.palette.background.secondary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
        "&:hover": {
            transform: "scale(1.05)"
        },

        padding: `${theme.spacing(4)}`,
        [theme.breakpoints.down("md")]: { padding: `${theme.spacing(2)}` },
        [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(4)}` }
    }))



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