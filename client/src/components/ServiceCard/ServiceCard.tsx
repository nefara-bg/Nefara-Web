import React from 'react'
import * as motion from 'motion/react-client'
import ServiceCardContent from '@/components/ServiceCardContent/ServiceCardContent'
import Image from 'next/image'
import { Twemoji } from 'react-emoji-render'
import { cn } from '@/lib/utils'

interface ServiceObject {
    title: string;
    text: string;
    content?: string[];
    icon?: string;
    image: string;
    colors: [string, string];
}

interface ServiceCardProps {
    serviceObject: ServiceObject;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ serviceObject }) => {
    const cardVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1,
            transition: {
                duration: 1,
                type: "spring"
            } as const
        }
    } as const

    const listVariants = {
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
        }
    } as const

    return (
        <motion.div
            className="w-full md:w-1/3 p-4"
            variants={cardVariants}
        >
            <motion.div
                className={cn(
                    "border rounded-lg p-6 pb-10",
                    "bg-gradient-to-br from-white to-gray-50",
                    "text-center h-full",
                    "hover:scale-105 transition-transform duration-300",
                    "overflow-hidden relative flex flex-col",
                    "group"
                )}
            >
                <div
                    className={cn(
                        "absolute top-0 left-0 w-full h-full opacity-0",
                        "group-hover:opacity-100 transition-opacity duration-300"
                    )}
                    style={{
                        backgroundImage: `linear-gradient(to bottom right, ${serviceObject.colors[0]}1A, ${serviceObject.colors[1]}1A)`,
                    }}
                />

                <div className="rounded-2xl overflow-hidden mb-6 relative">
                    <div className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        "text-6xl"
                    )}>
                        <Twemoji svg text={serviceObject?.icon || ""} />
                    </div>
                    <div className={cn(
                        "aspect-video w-full relative overflow-hidden",
                        "group-hover:opacity-10 transition-opacity duration-300"
                    )}>
                        <Image
                            src={serviceObject?.image}
                            alt="Service Image"
                            fill
                            style={{
                                objectFit: "cover"
                            }}
                            sizes="425px"
                        />
                    </div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                    <div>
                        <h5 className={cn(
                            "text-xl font-bold mb-2 text-foreground",
                            "group-hover:text-primary transition-colors duration-300"
                        )}>
                            {serviceObject?.title}
                        </h5>
                        <p className="text-sm mb-6 text-muted-foreground">
                            {serviceObject?.text}
                        </p>
                    </div>

                    <motion.div
                        className="flex flex-col gap-2 mt-auto"
                        variants={listVariants}
                    >
                        {serviceObject.content?.map((point, index) => (
                            <ServiceCardContent
                                key={index}
                                content={point}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ServiceCard
