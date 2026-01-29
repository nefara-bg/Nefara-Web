import React from 'react'
import * as motion from 'motion/react-client'
import { cn } from '@/lib/utils'

interface ServiceCardContentProps {
    content?: string;
}

const ServiceCardContent: React.FC<ServiceCardContentProps> = ({ content = "" }) => {
    const containerVariants = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0,
                staggerChildren: 0.2,
                when: "beforeChildren"
            } as const
        },
    } as const

    return (
        <motion.div
            className="flex flex-row items-center gap-3"
            variants={containerVariants}
        >
            <div className={cn(
                "w-2 h-2 rounded-full bg-primary",
                "transition-colors duration-300"
            )} />
            <p className="text-sm text-left text-muted-foreground">
                {content}
            </p>
        </motion.div>
    )
}

export default ServiceCardContent
