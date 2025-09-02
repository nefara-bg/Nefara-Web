import { styled, Typography } from "@mui/material";

export const Gradient = styled(Typography)(({ theme }) => ({
    background: "-webkit-linear-gradient(135deg, hsl(0 0% 38%) 0%, hsl(0 0% 0%) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
}))