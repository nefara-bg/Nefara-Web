import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("container mx-auto max-w-7xl px-4", className)} {...props}>
            {children}
        </div>
    )
}

export default SectionContainer
