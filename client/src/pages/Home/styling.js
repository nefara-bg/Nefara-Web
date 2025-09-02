import { Box, Card, Grid, Stack, styled, Typography } from "@mui/material";

export const HomeContainer = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(9)} ${theme.spacing(12)}`,
    // paddingLeft: `max(${theme.spacing(12)}, 2vw)`,
    [theme.breakpoints.down("lg")]: { padding: `${theme.spacing(9)} ${theme.spacing(8)}` },
    [theme.breakpoints.down("md")]: { padding: `${theme.spacing(9)} ${theme.spacing(6)}` },
    [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(9)} ${theme.spacing(2)}` }
}))



export const StyledCard = styled(Card)(({ theme }) => ({
    textAlign: "center",
    height: "100%",
    background: theme.palette.background.secondary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: `${theme.spacing(4)}`,
    [theme.breakpoints.down("md")]: { padding: `${theme.spacing(2)}` },
    [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(4)}` }
}))



export const ContactSection = styled(HomeContainer)(({ theme }) => ({
    background: theme.palette.background.secondary,
    minHeight: "min(100vh, 60rem)",

    display: "flex"
}))



export const HeroSection = styled(HomeContainer)(({ theme }) => ({
    // backgroundColor: theme.palette.background.secondary,
    background: `linear-gradient(135deg, ${theme.palette.background.main} 0%, ${theme.palette.neutral["50"]} 50%, ${theme.palette.neutral["100"]} 100%)`,
    minHeight: "min(100vh, 60rem)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(12)
}))



export const TextBox = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    textAlign: "center",
    maxWidth: "60rem",

    [theme.breakpoints.down("md")]: {
        alignItems: "center",
        textAlign: "center"
    }
}))



export const Excellence = styled(Box)(({ theme }) => ({
    background: theme.palette.neutral["100"],
    borderRadius: theme.shape.roundedBorderRadius,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    transition: "0.2s",

    "&:hover": {
        boxShadow: "0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)"
    }
}))



export const TitleGradient = styled(Typography)(({ theme }) => ({
    background: "-webkit-linear-gradient(135deg, hsl(0 0% 38%) 0%, hsl(0 0% 0%) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
}))



export const ServiceContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.secondary,
        borderRadius: theme.shape.borderRadius,
        padding: `${theme.spacing(6)} ${theme.spacing(4)}`
    }
}))