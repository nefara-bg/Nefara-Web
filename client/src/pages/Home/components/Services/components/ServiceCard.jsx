import { Grid, Typography } from "@mui/material"

const ServiceCard = ({ serviceObject }) => {
    return (
        <Grid size={6}>
            <Typography variant="h5">{serviceObject?.title}</Typography>
            <Typography variant="body2">{serviceObject?.content}</Typography>
        </Grid>
    )
}

export default ServiceCard