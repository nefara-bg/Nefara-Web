import React from 'react'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import { cn } from '@/lib/utils'

interface TeamCardProps {
    name: string;
    role: string;
    image: string;
    index: number;
    title: string;
    description: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, image, index, title, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: index * 0.2,
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.3
                }
            }}
            viewport={{ once: true, margin: "-50px" }}
            className={cn(
                "relative flex flex-col group",
                // Staggered layout implementation: Middle card (index 1) is pushed down on large screens
                index === 1 ? "lg:mt-16" : ""
            )}
        >
            {/* Image Container - Floating Effect */}
            <div className="relative w-full aspect-[4/5] z-10 mx-auto px-4 !overflow-visible">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:-translate-y-2">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain object-bottom drop-shadow-xl"
                        priority
                    />

                    {/* Floating Name Tag */}
                    <div className="absolute bottom-12 right-4 bg-white/90 backdrop-blur-sm shadow-md border px-4 py-2 rounded-full flex items-center gap-2 transform transition-all duration-500 group-hover:bottom-16 group-hover:scale-105 z-20">
                        <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                        <span className="text-xs font-semibold tracking-wide text-foreground whitespace-nowrap">
                            {name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Card */}
            <div className="relative -mt-24 pt-28 pb-10 px-8 bg-secondary/30 dark:bg-muted/30 rounded-[2rem] overflow-hidden flex flex-col h-full z-0 transition-colors duration-300 hover:bg-secondary/50 dark:hover:bg-muted/50">
                {/* Number Stripe */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-secondary/0 pointer-events-none" />

                <div className="mb-6 flex items-center">
                    <div className="bg-primary/10 dark:bg-primary/20 px-4 py-1 rounded-full">
                        <span className="text-sm font-bold text-foreground/80">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-foreground leading-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    {description}
                </p>

                {/* Decorative bottom fade/line */}
                <div className="mt-auto w-12 h-1 bg-primary/20 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-500" />
            </div>
        </motion.div>
    )
}

export default TeamCard
