export function AboutUsIcon({ size = 40 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer ring */}
            <circle cx="20" cy="20" r="14" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeDasharray="4 2.5" />
            {/* Inner circle / core */}
            <circle cx="20" cy="20" r="7" stroke="hsl(var(--primary))" strokeWidth="1.4" />
            {/* Centre dot */}
            <circle cx="20" cy="20" r="2" fill="hsl(var(--primary))" />
            {/* Four cardinal tick marks */}
            <line x1="20" y1="4" x2="20" y2="8" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="20" y1="32" x2="20" y2="36" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="4" y1="20" x2="8" y2="20" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="32" y1="20" x2="36" y2="20" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    )
}

export function OurTeamIcon({ size = 40 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left person */}
            <circle cx="13" cy="14" r="4" stroke="hsl(var(--primary))" strokeWidth="1.4" />
            <path d="M5 30c0-4.418 3.582-8 8-8s8 3.582 8 8"
                stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="round" />
            {/* Right person (offset, slightly larger to convey depth) */}
            <circle cx="27" cy="13" r="4.5" stroke="hsl(var(--primary))" strokeWidth="1.4" />
            <path d="M18.5 30c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5"
                stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="round" />
            {/* Small connector dot between them */}
            <circle cx="20" cy="21" r="1.2" fill="hsl(var(--primary))" opacity="0.5" />
        </svg>
    )
}
