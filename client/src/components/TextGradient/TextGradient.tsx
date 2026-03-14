import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TextGradientProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
}

const TextGradient: React.FC<TextGradientProps> = ({ children, className, ...props }) => {
    return (
        <span
            className={cn(
                "bg-gradient-to-br from-slate-900 to-slate-950",
                "bg-clip-text text-transparent",
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}

export default TextGradient
