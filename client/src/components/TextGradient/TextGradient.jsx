import { Typography } from "@mui/material"

const TextGradient = ({ props, children }) => {
    return (
        <Typography 
            {...props}
            sx={{
                background: "-webkit-linear-gradient(135deg, hsl(0 0% 38%) 0%, hsl(0 0% 0%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
            }}
        >
            {children}
        </Typography>
    )
}

export default TextGradient