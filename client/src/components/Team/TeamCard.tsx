import React from 'react'
import * as motion from 'motion/react-client'
import { cn } from '@/lib/utils'
import { Linkedin } from 'lucide-react'

interface TeamCardProps {
    name: string;
    role: string;
    image: string;
    index: number;
    title: string;
    description: string;
    linkedin?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, image, index, title, description, linkedin }) => {
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
            {/* Content Card */}
            <div 
                className="relative pt-10 pb-10 px-8 rounded-[2rem] overflow-hidden flex flex-col h-full z-0 transition-all duration-300 border border-border/50 shadow-lg hover:shadow-xl"
                style={{
                    background: index === 0 
                        ? 'linear-gradient(135deg, hsl(200, 40%, 85%) 0%, hsl(220, 35%, 88%) 50%, hsl(240, 30%, 90%) 100%)'
                        : index === 1
                        ? 'linear-gradient(135deg, hsl(260, 35%, 85%) 0%, hsl(240, 30%, 88%) 50%, hsl(220, 35%, 90%) 100%)'
                        : 'linear-gradient(135deg, hsl(180, 40%, 85%) 0%, hsl(200, 35%, 88%) 50%, hsl(215, 30%, 90%) 100%)'
                }}
            >
                {/* Gradient overlay for depth and readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/30 pointer-events-none" />
                
                {/* Number Stripe */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-background/0 pointer-events-none" />

                <div className="relative z-10 mb-6 flex items-center justify-center">
                    <div className="bg-primary/10 dark:bg-primary/20 px-4 py-1 rounded-full backdrop-blur-sm">
                        <span className="text-sm font-bold text-foreground/80">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* LinkedIn Icon - Centered */}
                {linkedin && (
                    <div className="relative z-10 flex items-center justify-center mb-6">
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-16 h-16 rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary transition-all duration-300 shadow-lg group-hover:scale-105"
                            aria-label={`${name}'s LinkedIn profile`}
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                    </div>
                )}

                <h3 className="relative z-10 text-2xl font-bold mb-4 text-foreground leading-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="relative z-10 text-muted-foreground text-sm leading-relaxed mb-8">
                    {description}
                </p>

                {/* Decorative bottom fade/line */}
                <div className="mt-auto w-12 h-1 bg-primary/20 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-500" />
            </div>
        </motion.div>
    )
}

export default TeamCard
