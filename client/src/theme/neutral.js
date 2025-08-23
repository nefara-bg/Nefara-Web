import { createTheme } from "@mui/material";

const headingStyles = {
    fontWeight: "bold"
}

export const neutral = createTheme({
    palette: {
        mode: "dark",
        background: {
            secondary: "#0c0c0cff",
            main: "#000"
            // secondary: "#f4f8ffff"
        },
        primary: {
            main: "#cccccc",
            light: "#e6e6e6",
            lighter: "#fff",
            dark: "#999999",
            darker: "#191919",
            contrastText: "#000"
        },
        neutral: {
            main: "#e6e6e6",
            light: "#a0a0a0ff"
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

neutral.typography.body1 = {
    ...neutral.typography.body1,
    color: neutral.palette.neutral.light
}

neutral.typography.body2 = {
    ...neutral.typography.body2,
    color: neutral.palette.neutral.light
}

neutral.typography.h1 = {
    ...neutral.typography.h1,
    [neutral.breakpoints.down("md")]: { fontSize: "56px" },
    [neutral.breakpoints.down("md")]: { fontSize: "48px" }
}

neutral.typography.h3 = {
    ...neutral.typography.h3,
    [neutral.breakpoints.down("md")]: { fontSize: "40px" }
}