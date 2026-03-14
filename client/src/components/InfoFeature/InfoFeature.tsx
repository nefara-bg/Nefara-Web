import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import * as motion from 'motion/react-client'

interface FeatureObject {
    title?: string;
    content?: string;
}

interface InfoFeatureProps {
    featureObject?: FeatureObject;
    index?: number;
    isLast?: boolean;
}

const InfoFeature: React.FC<InfoFeatureProps> = ({ featureObject = {}, index = 0, isLast = false }) => {
    const baseDelay = index * 0.4

    return (
        <div className="flex flex-row gap-4 items-start relative">
            <div className="flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: baseDelay,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    className={cn(
                        "flex justify-center items-center shrink-0",
                        "rounded-full bg-primary text-primary-foreground",
                        "w-6 h-6 z-10 shadow-lg"
                    )}
                >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </motion.div>

                {!isLast && (
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                            delay: baseDelay + 0.2,
                            duration: 0.3,
                            ease: "easeOut"
                        }}
                        className="w-0.5 bg-gray-500/50 absolute top-6 bottom-0"
                        style={{ height: 'calc(100% - 6px)' }} // Adjust length to not overlap next circle nicely
                    />
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                    delay: baseDelay + 0.1,
                    duration: 0.4
                }}
                className="flex flex-col gap-1 pb-6"
            >
                <p className="text-sm font-semibold text-white tracking-wide">
                    {featureObject?.title}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed max-w-[240px]">
                    {featureObject?.content}
                </p>
            </motion.div>
        </div>
    )
}

export default InfoFeature
