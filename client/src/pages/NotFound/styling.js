import { Stack, styled } from "@mui/material";

export const Section = styled(Stack)(({ theme }) => ({
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: `${theme.spacing(16)} ${theme.spacing(2)}`,
    textAlign: "center"
}))