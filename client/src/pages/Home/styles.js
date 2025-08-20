import { Box, Card, Grid, Stack, styled } from "@mui/material";

export const HomeContainer = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(9)} ${theme.spacing(12)}`,
    [theme.breakpoints.down("lg")]: { padding: `${theme.spacing(9)} ${theme.spacing(8)}` },
    [theme.breakpoints.down("md")]: { padding: `${theme.spacing(9)} ${theme.spacing(6)}` },
    [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(9)} ${theme.spacing(2)}` }
}))



export const StyledCard = styled(Card)(({ theme }) => ({
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



export const ContactSection = styled(HomeContainer)(({ theme }) => ({
    background: theme.palette.background.secondary,
}))



export const HeroSection = styled(HomeContainer)(({ theme }) => ({
    backgroundColor: theme.palette.background.secondary,
    minHeight: "100vh",

    display: "flex",
    alignItems: "center"
}))



export const TextBox = styled(Stack)(({ theme }) => ({
    alignItems: "start",

    [theme.breakpoints.down("md")]: {
        alignItems: "center",
        textAlign: "center"
    }
}))



export const ServiceContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        backgroundColor: theme.palette.background.secondary,
        borderRadius: theme.shape.borderRadius,
        padding: `${theme.spacing(6)} ${theme.spacing(4)}`
    }
}))