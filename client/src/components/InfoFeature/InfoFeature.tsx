import React from 'react'
import { cn } from '@/lib/utils'

interface FeatureObject {
    title?: string;
    content?: string;
}

interface InfoFeatureProps {
    featureObject?: FeatureObject;
}

const InfoFeature: React.FC<InfoFeatureProps> = ({ featureObject = {} }) => {
    return (
        <div className="flex flex-row gap-3 items-start">
            <div className={cn(
                "flex justify-center items-center",
                "rounded-full bg-gray-600",
                "w-6 h-6 aspect-square"
            )}>
                <span className="text-sm text-background">✓</span>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-background">
                    {featureObject?.title}
                </p>
                <p className="text-xs text-gray-400">
                    {featureObject?.content}
                </p>
            </div>
        </div>
    )
}

export default InfoFeature
