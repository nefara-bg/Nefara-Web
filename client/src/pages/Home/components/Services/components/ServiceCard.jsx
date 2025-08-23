import { Grid, Stack, Typography } from "@mui/material"
import { CheckCircle } from "@mui/icons-material";
import { ServiceContainer } from "../../../styling"
import ImageContainer from "../../../../../components/ImageContainer/ImageContainer"

const ServiceCard = ({ serviceObject }) => {
    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <ServiceContainer container spacing={{ xs: 3, sm: 2, lg: 4}}>
                <Grid size={{ xs: 12, sm: 1.5, md: 2 }}>
                    {
                        serviceObject.icon &&
                        <ImageContainer
                            src={serviceObject.icon}
                            alt="icon" 
                            props={{ 
                                sx: { 
                                    width: { xs: "20%", sm: "100%" },
                                    margin: { xs: "0 auto", sm: "0" } 
                                } 
                            }} 
                        />
                    }
                </Grid>
                <Grid size="grow">
                    <Typography variant="h5" color="neutral.main" mb={1}>{serviceObject?.title}</Typography>
                    
                    {serviceObject.content?.map((point, index) => (
                        <Stack
                            key={index}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            mb={0.5}
                            pl={2}
                        >
                            <CheckCircle sx={{ color: "primary.main" }} />
                            <Typography variant="body2">{point}</Typography>
                        </Stack>
                    ))}
                </Grid>
            </ServiceContainer>
        </Grid>
    )
}

export default ServiceCard