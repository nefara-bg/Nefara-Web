import { duration } from "@mui/material"
import { motion } from "motion/react"



const FadeInSection = ({ children }) => {
    const sectionVariants = {
        initial: {
            y: 75,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    }



    return (
        <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    )
}

export default FadeInSection