import React, { ReactNode } from 'react'
import * as motion from 'motion/react-client'
import { cn } from '@/lib/utils'

interface Feature {
    icon?: ReactNode;
    title?: string;
    description?: string;
}

interface FeatureCardProps {
    feature?: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature = {} }) => {
    return (
        <motion.div
            className={cn(
                "border rounded-lg p-6",
                "transition-all duration-300",
                "hover:shadow-md hover:border-primary/50"
            )}
        >
            <div className="flex flex-row gap-2 items-start">
                <div
                    className={cn(
                        "p-2 bg-secondary/50 rounded-lg aspect-square text-primary",
                        "transition-all duration-300",
                        "hover:scale-110",
                        "flex justify-center items-center"
                    )}
                >
                    <span className="flex justify-center items-center w-8 h-8">
                        {feature?.icon}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <p className={cn(
                        "text-sm font-bold text-primary",
                        "transition-all duration-300"
                    )}>
                        {feature?.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {feature?.description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default FeatureCard
