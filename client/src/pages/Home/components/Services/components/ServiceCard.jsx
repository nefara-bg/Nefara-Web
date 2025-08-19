import { Grid, Typography } from "@mui/material"
import { ServiceContainer, ServiceImageContainer } from "../../../styles"

const ServiceCard = ({ serviceObject }) => {
    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <ServiceContainer container spacing={{ xs: 3, sm: 2, lg: 4}}>
                <Grid size={{ xs: 12, sm: 1.5, md: 2 }}>
                    {
                        serviceObject.icon &&
                        <ServiceImageContainer><img className="image" src={serviceObject.icon} alt="icon" /></ServiceImageContainer>
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