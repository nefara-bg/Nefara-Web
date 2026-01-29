import React from 'react'
import { Twemoji } from 'react-emoji-render'
import { cn } from '@/lib/utils'

interface SectionTagProps extends React.HTMLAttributes<HTMLDivElement> {
    content?: string;
}

const SectionTag: React.FC<SectionTagProps> = ({ content = "", className, ...props }) => {
    return (
        <div className={cn("flex flex-col items-start", className)} {...props}>
            <div
                className={cn(
                    "bg-secondary rounded-xl py-2 px-4 transition-all duration-200",
                    "hover:shadow-sm"
                )}
            >
                <span className="text-sm font-medium text-secondary-foreground flex items-center">
                    <Twemoji svg text={content} />
                </span>
            </div>
        </div>
    )
}

export default SectionTag
