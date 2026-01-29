import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TextGradientProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
}

const TextGradient: React.FC<TextGradientProps> = ({ children, className, ...props }) => {
    return (
        <span
            className={cn(
                "bg-gradient-to-br from-gray-600 to-black",
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
