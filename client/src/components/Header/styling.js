import { AppBar, Card, Stack, styled, Typography } from "@mui/material"

export const NavigationBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.secondary,
    padding: `${theme.spacing(1)} ${theme.spacing(9)}`,
    [theme.breakpoints.down("lg")]: { padding: `${theme.spacing(1)} ${theme.spacing(5)}` },
    [theme.breakpoints.down("md")]: { padding: `${theme.spacing(1)} ${theme.spacing(3)}` },
    [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(1)} ${theme.spacing(1)}` }
}))



export const MobileMenu = styled(Stack)(({ theme }) => ({
    height: "100%",
    padding: `${theme.spacing(4)} ${theme.spacing(8)}`,
    paddingLeft: theme.spacing(4)
}))



export const NavLink = styled(Typography)(({ theme }) => ({
    transition: ".2s",
    "&:hover": {
        color: theme.palette.primary.main
    }
}))



export const Dropdown = styled(Card)(({ theme }) => ({
    position: "absolute",
    bottom: theme.spacing(0),
    left: 0,
    transform: "translateY(100%)",
    zIndex: 1,

    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    textAlign: "left",

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1)
}))



export const LngOption = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    gap: theme.spacing(1),
    alignItems: "center"
}))