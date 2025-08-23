import { createTheme } from "@mui/material";

const headingStyles = {
    fontWeight: "bold"
}

export const dark = createTheme({
    palette: {
        mode: "dark",
        background: {
            secondary: "#050a12ff",
            main: "#020408"
            // secondary: "#f4f8ffff"
        },
        primary: {
            main: "#5981b1",
            light: "#7a9ac1",
            lighter: "#9bb3d0",
            dark: "#47678e",
            darker: "#121a23",
            contrastText: "#090d12"
        },
        neutral: {
            main: "#5981b1",
            light: "#989ca0ff"
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

dark.typography.body1 = {
    ...dark.typography.body1,
    color: dark.palette.neutral.light
}

dark.typography.body2 = {
    ...dark.typography.body2,
    color: dark.palette.neutral.light
}

dark.typography.h1 = {
    ...dark.typography.h1,
    [dark.breakpoints.down("md")]: { fontSize: "56px" },
    [dark.breakpoints.down("md")]: { fontSize: "48px" }
}

dark.typography.h3 = {
    ...dark.typography.h3,
    [dark.breakpoints.down("md")]: { fontSize: "40px" }
}