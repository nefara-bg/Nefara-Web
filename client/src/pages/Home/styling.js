import { Box, Card, Grid, Stack, styled, Typography } from "@mui/material";

export const HomeContainer = styled(Stack)(({ theme }) => ({
    padding: `${theme.spacing(9)} ${theme.spacing(12)}`,
    [theme.breakpoints.down("lg")]: { padding: `${theme.spacing(9)} ${theme.spacing(8)}` },
    [theme.breakpoints.down("md")]: { padding: `${theme.spacing(9)} ${theme.spacing(6)}` },
    [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(9)} ${theme.spacing(2)}` },
    alignItems: "center"
}))



export const StyledCard = styled(Card)(({ theme }) => ({
    textAlign: "center",
    height: "100%",
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



export const StyledServiceCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    backgroundColor: "linear-gradient(145deg, hsl(0 0 100%) 0%, hsl(0 0 98%) 100%)",
    textAlign: "center",
    height: "100%",
    transition: "0.5s",
    "&:hover": {
        transform: "scale(1.05)"
    },
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column"
}))



export const ServiceOverlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0
})



export const ServiceContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.secondary,
        borderRadius: theme.shape.borderRadius,
        padding: `${theme.spacing(6)} ${theme.spacing(4)}`
    }
}))