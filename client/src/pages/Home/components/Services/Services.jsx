import { Grid, Typography } from "@mui/material"
import ServiceCard from "./components/ServiceCard"

const Services = () => {
    const services = [
        {
            title: "Web Development",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, vel suscipit, aliquid sequi facilis maxime dolorum atque consequuntur quibusdam deleniti voluptate natus itaque cum? Doloremque qui nobis accusamus rem numquam, fuga quidem ipsum veniam sapiente officiis vero, cupiditate provident quae nisi voluptatibus. Qui, odit libero quia maiores ipsum facere magnam!"
        },
        {
            title: "Mobile Apps",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, vel suscipit, aliquid sequi facilis maxime dolorum atque consequuntur quibusdam deleniti voluptate natus itaque cum? Doloremque qui nobis accusamus rem numquam, fuga quidem ipsum veniam sapiente officiis vero, cupiditate provident quae nisi voluptatibus. Qui, odit libero quia maiores ipsum facere magnam!"
        },
        {
            title: "Desktop Apps",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, vel suscipit, aliquid sequi facilis maxime dolorum atque consequuntur quibusdam deleniti voluptate natus itaque cum? Doloremque qui nobis accusamus rem numquam, fuga quidem ipsum veniam sapiente officiis vero, cupiditate provident quae nisi voluptatibus. Qui, odit libero quia maiores ipsum facere magnam!"
        },
        {
            title: "Software Solutions",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, vel suscipit, aliquid sequi facilis maxime dolorum atque consequuntur quibusdam deleniti voluptate natus itaque cum? Doloremque qui nobis accusamus rem numquam, fuga quidem ipsum veniam sapiente officiis vero, cupiditate provident quae nisi voluptatibus. Qui, odit libero quia maiores ipsum facere magnam!"
        }
    ]



    return (
        <>
            <Typography variant="h3">Our Services</Typography>

            <Grid container>
                {
                    services.map((service, i) => (
                        <ServiceCard serviceObject={service} key={i} />
                    ))
                }
            </Grid>
        </>
    )
}

export default Services