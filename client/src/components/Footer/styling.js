import { Stack, styled, Typography } from "@mui/material"

export const FooterContainer = styled(Stack)(({ theme }) => ({
    background: theme.palette.primary.darker,
    padding: `${theme.spacing(9)} ${theme.spacing(12)}`,
    [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(6)} ${theme.spacing(2)}` },

    gap: theme.spacing(4),
    [theme.breakpoints.down("md")]: { gap: theme.spacing(3) }
}))


export const FooterLink = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.lighter,
    transition: ".2s",

    "&:hover": {
        color: theme.palette.primary.light
    },

    flexWrap: "nowrap",
    whiteSpace: "nowrap"
}))