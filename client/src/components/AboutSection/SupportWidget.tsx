export default function SupportWidget() {
    return (
        <div className="flex flex-col gap-3 select-none" style={{ width: 160 }}>
            <div className="flex items-center gap-2">
                <div className="relative w-2 h-2 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full" style={{ background: "#22c55e" }} />
                    <div className="absolute inset-0 rounded-full"
                        style={{ background: "#22c55e", animation: "pulseRing 1.8s ease-out infinite" }} />
                </div>
                <span style={{ fontSize: 8.5, color: "hsl(var(--foreground)/0.6)" }}>
                    All systems operational
                </span>
            </div>
            <svg width="150" height="36" viewBox="0 0 150 36" style={{ overflow: "visible" }}>
                <line x1="0" y1="18" x2="150" y2="18"
                    stroke="hsl(var(--primary)/0.15)" strokeWidth={1} />
                <path
                    d="M0,18 L26,18 L34,4 L42,32 L50,18 L76,18 L84,4 L92,32 L100,18 L150,18"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="280"
                    style={{ animation: "ecgScan 2.2s linear infinite" }}
                />
            </svg>
            <div className="flex gap-5">
                <div>
                    <div className="font-display font-bold" style={{ color: "hsl(var(--primary))", fontSize: 15 }}>
                        99.9%
                    </div>
                    <div style={{ fontSize: 8, color: "hsl(var(--foreground)/0.4)" }}>Uptime</div>
                </div>
                <div>
                    <div className="font-display font-bold" style={{ color: "hsl(var(--primary))", fontSize: 15 }}>
                        24/7
                    </div>
                    <div style={{ fontSize: 8, color: "hsl(var(--foreground)/0.4)" }}>Monitoring</div>
                </div>
            </div>
        </div>
    )
}
