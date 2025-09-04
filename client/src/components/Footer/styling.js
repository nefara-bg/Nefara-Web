import { Box, Stack, styled, Typography } from "@mui/material"

export const FooterContainer = styled(Stack)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.neutral["700"]} 50%, ${theme.palette.neutral["900"]} 100%)`,
    position: "relative",
    zIndex: 10,
    padding: `${theme.spacing(9)} ${theme.spacing(12)}`,
    [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(6)} ${theme.spacing(2)}` },

    gap: theme.spacing(4),
    [theme.breakpoints.down("md")]: { gap: theme.spacing(3) }
}))


export const FooterLink = styled(Typography)(({ theme }) => ({
    color: theme.palette.neutral["400"],
    transition: ".2s",

    "&:hover": {
        color: theme.palette.neutral["100"]
    },

    flexWrap: "nowrap",
    whiteSpace: "nowrap"
}))