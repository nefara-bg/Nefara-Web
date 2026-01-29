import React, { ReactNode } from 'react'
import * as motion from 'motion/react-client'

interface FadeInSectionProps {
    children: ReactNode;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
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
            } as const
        }
    } as const

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
