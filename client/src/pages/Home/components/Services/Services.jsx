import { Grid, Typography } from "@mui/material"
import ServiceCard from "./components/ServiceCard"
import { HomeContainer } from "../../Home"
import styled from "@emotion/styled"
import web from "../../../../../img/web.webp"
import mobile from "../../../../../img/mobile.webp"
import desktop from "../../../../../img/desktop.webp"
import software from "../../../../../img/software.webp"

const Services = () => {
    const services = [
        {
            title: "Web Development",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, vel suscipit, aliquid sequi facilis maxime dolorum atque consequuntur quibusdam deleniti voluptate natus itaque cum? Doloremque qui nobis accusamus rem numquam, fuga quidem ipsum veniam sapiente officiis vero, cupiditate provident quae nisi voluptatibus. Qui, odit libero quia maiores ipsum facere magnam!",
            icon: web
        },
        {
            title: "Mobile Apps",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, vel suscipit, aliquid sequi facilis maxime dolorum atque consequuntur quibusdam deleniti voluptate natus itaque cum? Doloremque qui nobis accusamus rem numquam, fuga quidem ipsum veniam sapiente officiis vero, cupiditate provident quae nisi voluptatibus. Qui, odit libero quia maiores ipsum facere magnam!",
            icon: mobile
        },
        {
            title: "Desktop Apps",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, vel suscipit, aliquid sequi facilis maxime dolorum atque consequuntur quibusdam deleniti voluptate natus itaque cum? Doloremque qui nobis accusamus rem numquam, fuga quidem ipsum veniam sapiente officiis vero, cupiditate provident quae nisi voluptatibus. Qui, odit libero quia maiores ipsum facere magnam!",
            icon: desktop
        },
        {
            title: "Software Solutions",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, vel suscipit, aliquid sequi facilis maxime dolorum atque consequuntur quibusdam deleniti voluptate natus itaque cum? Doloremque qui nobis accusamus rem numquam, fuga quidem ipsum veniam sapiente officiis vero, cupiditate provident quae nisi voluptatibus. Qui, odit libero quia maiores ipsum facere magnam!",
            icon: software
        }
    ]



    return (
        <HomeContainer id="services">
            <Typography variant="h3" textAlign={"center"} mb={4} color="neutral.main">Our Services</Typography>

            <Grid container spacing={8}>
                {
                    services.map((service, i) => (
                        <ServiceCard serviceObject={service} key={i} />
                    ))
                }
            </Grid>
        </HomeContainer>
    )
}

export default Services