import { createTheme } from "@mui/material";

const headingStyles = {
    fontWeight: "bold"
}

export const theme = createTheme({
    palette: {
        background: {
            main: "#fff",
            // secondary: "#fdfdfd"
            secondary: "#f4f8ffff"
        },
        primary: {
            main: "#4081e2",
            light: "#669ae8",
            dark: "#3367b5",
            contrastText: "#fff"
        },
        neutral: {
            main: "#20354e",
            light: "#4d5d71"
        }
    },
    shape: {
        borderRadius: "20px"
    },
    typography: {
        fontFamily: ["Inter", 'sans-serif'].join(","),
        h1: { 
            ...headingStyles,
            fontSize: "64px"
        },
        h2: { ...headingStyles },
        h3: { ...headingStyles },
        h4: { ...headingStyles },
        h5: { ...headingStyles },
        body1: {
            fontSize: "20px"
        },
        body2: {
            fontSize: "16px"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                }
            }
        }
    }
})

theme.typography.body1 = {
    ...theme.typography.body1,
    color: theme.palette.neutral.light
}

theme.typography.body2 = {
    ...theme.typography.body2,
    color: theme.palette.neutral.light
}