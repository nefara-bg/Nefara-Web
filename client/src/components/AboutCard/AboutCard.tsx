import React, { ReactNode } from 'react'
import * as motion from 'motion/react-client'
import { cn } from '@/lib/utils'

interface CardContent {
    icon?: ReactNode;
    number?: string;
    label?: string;
}

interface AboutCardProps {
    cardContent: CardContent;
}

const AboutCard: React.FC<AboutCardProps> = ({ cardContent }) => {
    const cardVariants = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
            transition: {
                type: "spring",
                duration: 1.2
            } as const
        }
    } as const

    return (
        <motion.div
            className="w-full sm:w-1/2 lg:w-1/3 p-3"
            variants={cardVariants}
        >
            <motion.div
                initial={{ scale: 1 }}
                whileHover={{
                    scale: 1.03,
                    transition: {
                        duration: 0.5,
                        type: "spring",
                        bounce: 0.2
                    } as const
                }}
                className={cn(
                    "border rounded-lg h-full",
                    "flex flex-col items-center text-center",
                    "p-8 sm:p-8 md:p-4"
                )}
            >
                {cardContent.icon && (
                    <div className="mb-4 text-primary">
                        {cardContent.icon}
                    </div>
                )}
                <h4 className="text-3xl font-bold text-foreground mb-1">
                    {cardContent.number}
                </h4>
                <p className="text-sm font-bold text-muted-foreground">
                    {cardContent.label}
                </p>
            </motion.div>
        </motion.div>
    )
}

export default AboutCard
