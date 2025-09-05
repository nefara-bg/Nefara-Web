import { createTheme } from "@mui/material";
import { transform } from "motion/react";

const headingStyles = {
    fontWeight: "bold"
}

export const theme = createTheme({
    spacing: `0.5rem`,
    palette: {
        background: {
            main: "hsl(0, 0%, 100%)"
        },
        primary: {
            main: "#000",
            contrastText: "#fff"
        },
        neutral: {
            main: "#000",
            light: "hsl(0 0% 45%)",
            50: "hsl(0 0% 98%)",
            100: "hsl(0 0% 96%)",
            200: "hsl(0 0% 93%)",
            300: "hsl(0 0% 87%)",
            400: "hsl(0 0% 68%)",
            500: "hsl(0 0% 53%)",
            600: "hsl(0 0% 38%)",
            700: "hsl(0 0% 26%)",
            800: "hsl(0 0% 15%)",
            900: "hsl(0 0% 9%)"
        },
        border: {
            main: "hsl(0, 0%, 90%)"
        }
    },
    shape: {
        borderRadius: "0.375rem",
        roundedBorderRadius: "1.2rem"
    },
    typography: {
        fontFamily: ["Inter", 'sans-serif'].join(","),
        h1: { 
            ...headingStyles,
            fontSize: "5.4rem"
        },
        h2: { ...headingStyles },
        h3: { ...headingStyles },
        h4: { ...headingStyles },
        h5: { ...headingStyles },
        body1: {
            fontSize: "1.25rem"
        },
        body2: {
            fontSize: "1rem"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    transition: "0.2s",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 10px 15px -3px hsl(0 0% 0% / 0.1), 0 4px 6px -4px hsl(0 0% 0% / 0.1)"
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: "1rem"
                },
                shrink: {
                    fontSize: "1.25rem"
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

theme.typography.h1 = {
    ...theme.typography.h1,
    [theme.breakpoints.down("md")]: { fontSize: "3.5rem" },
    [theme.breakpoints.down("md")]: { fontSize: "3rem" }
}

theme.typography.h3 = {
    ...theme.typography.h3,
    [theme.breakpoints.down("md")]: { fontSize: "2.5rem" }
}

theme.components.MuiButton.styleOverrides.outlinedPrimary = {
    backgroundColor: theme.palette.background.main,
    border: `solid 2px ${theme.palette.border.main}`
}

theme.components.MuiPaper = {
    styleOverrides: {
        outlined: {
            border: `solid 2px ${theme.palette.border.main}`,
            transition: ".2s",
            "&:hover": {
                boxShadow: `0 0 24px ${theme.palette.neutral["200"]}`
            }
        },
        elevation2: {
            boxShadow: `0 0 4px ${theme.palette.neutral["400"]}`
        }
    }
}

theme.components.MuiCard = {
    styleOverrides: {
        outlined: {
            
        }
    }
}