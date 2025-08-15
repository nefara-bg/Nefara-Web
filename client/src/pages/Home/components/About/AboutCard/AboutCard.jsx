import { Box, Card, CardHeader, Grid, styled, Typography } from "@mui/material"

const AboutCard = ({ cardContent }) => {
    const StyledCard = styled(Card)(({ theme }) => ({
        textAlign: "center",
        padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
        height: "100%",
        transition: ".2s",
        background: theme.palette.background.secondary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        "&:hover": {
            transform: "scale(1.05)"
        }
    }))



    return (
        <Grid size={4}>
            <StyledCard variant="outlined">
                {
                    cardContent.icon &&
                    <Box sx={{ display: "flex", width: "30%" }} mb={3}>
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