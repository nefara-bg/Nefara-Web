import { Stack, styled } from "@mui/material";

export const Tag = styled(Stack)(({ theme }) => ({
    background: theme.palette.neutral["100"],
    borderRadius: theme.shape.roundedBorderRadius,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    transition: "0.2s",

    "&:hover": {
        boxShadow: "0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)"
    }
}))