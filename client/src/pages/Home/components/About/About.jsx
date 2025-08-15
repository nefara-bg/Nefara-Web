import { Typography } from "@mui/material"

const About = () => {
    const reasons = [
        "Experienced team of developers",
        "High-quality code and design",
        "Tailored solutions to meet your needs"
    ]


    return (
        <>
            <Typography variant="h3">Why Choose Us</Typography>
            {
                reasons.map((reason, i) => (
                    <Typography variant="body2" key={i}>{reason}</Typography>
                ))
            }
        </>
    )
}

export default About