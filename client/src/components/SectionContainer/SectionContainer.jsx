import { Container } from "@mui/material"

const SectionContainer = ({ children, props }) => {
    return (
        <Container maxWidth={"xl"} {...props}>
            {children}
        </Container>
    )
}

export default SectionContainer