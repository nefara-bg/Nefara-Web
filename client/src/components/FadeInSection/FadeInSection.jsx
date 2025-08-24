import { motion, useAnimate, useInView } from "motion/react"
import { useEffect } from "react"



const FadeInSection = ({ children }) => {
    const [scope, animate] = useAnimate()
    const isInView = useInView(scope, { once: true })


    const sectionVariants = {
        initial: {
            y: 75,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        }
    }


    useEffect(() => {
        if(isInView) {
            animate(
                scope.current,
                sectionVariants.animate,
                {
                    duration: 1.2,
                    type: "spring",
                    bounce: 0.5
                }
            )
        }
    }, [isInView])



    return (
        <motion.div
            ref={scope}
            variants={sectionVariants}
            initial="initial"
        >
            {children}
        </motion.div>
    )
}

export default FadeInSection