import React, { ReactNode } from 'react'
import * as motion from 'motion/react-client'
import { cn } from '@/lib/utils'

interface ContactCardProps {
    icon?: ReactNode;
    title?: string;
    content?: string;
    contact?: string;
    href?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
    icon,
    title = "",
    content = "",
    contact = "",
    href = ""
}) => {
    const variants = {
        initial: { scale: 0 },
        animate: {
            scale: 1,
            transition: {
                duration: 1.2,
                type: "spring"
            } as const
        }
    } as const

    return (
        <motion.a
            href={href}
            className="w-full sm:w-1/2 p-3"
            variants={variants}
        >
            <div className={cn(
                "border rounded-lg p-8",
                "transition-transform duration-200",
                "hover:scale-105",
                "h-full",
                "flex flex-col items-start"
            )}>
                <div className="mb-4 text-primary">
                    {icon}
                </div>
                <p className="text-base mb-2 text-primary font-bold">{title}</p>
                <p className="text-sm mb-3 text-muted-foreground">{content}</p>
                <p className="text-sm font-medium text-primary">{contact}</p>
            </div>
        </motion.a>
    )
}

export default ContactCard
