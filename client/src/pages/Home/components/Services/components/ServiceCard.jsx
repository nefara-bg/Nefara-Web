import { Box, Grid, styled, Typography } from "@mui/material"

const ServiceCard = ({ serviceObject }) => {
    const ServiceContainer = styled(Grid)(({ theme }) => ({
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
            backgroundColor: theme.palette.background.secondary,
            borderRadius: theme.shape.borderRadius,
            padding: `${theme.spacing(6)} ${theme.spacing(4)}`
        }
    }))



    const ImageContainer = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down("sm")]: {
            width: "20%",
            margin: '0 auto',
        }
    }))
    


    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <ServiceContainer container spacing={{ xs: 3, sm: 2, lg: 4}}>
                <Grid size={{ xs: 12, sm: 1.5, md: 2 }}>
                    {
                        serviceObject.icon &&
                        <ImageContainer><img className="image" src={serviceObject.icon} alt="icon" /></ImageContainer>
                    }
                </Grid>
                <Grid size="grow">
                    <Typography variant="h5" color="neutral.main" mb={1}>{serviceObject?.title}</Typography>
                    <Typography variant="body2">{serviceObject?.content}</Typography>
                </Grid>
            </ServiceContainer>
        </Grid>
    )
}

export default ServiceCard