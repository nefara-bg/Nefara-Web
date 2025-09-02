import { Gradient } from "./styling"

const TextGradient = ({ props, children }) => {
    return (
        <Gradient {...props}>{children}</Gradient>
    )
}

export default TextGradient