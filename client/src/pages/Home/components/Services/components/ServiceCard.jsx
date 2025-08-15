import { Grid, Typography } from "@mui/material"

const ServiceCard = ({ serviceObject }) => {
    return (
        <Grid size={6}>
            <Grid container spacing={4}>
                <Grid size={2}>
                    {
                        serviceObject.icon &&
                        <img className="image" src={serviceObject.icon} alt="icon" />
                    }
                </Grid>
                <Grid size="grow">
                    <Typography variant="h5" color="neutral.main" mb={1}>{serviceObject?.title}</Typography>
                    <Typography variant="body2">{serviceObject?.content}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ServiceCard