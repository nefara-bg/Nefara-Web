export default function SEOWidget() {
    const bars = [
        { h: 22, d: 0 }, { h: 38, d: 0.18 }, { h: 52, d: 0.36 },
        { h: 68, d: 0.54 }, { h: 82, d: 0.72 }, { h: 100, d: 0.90 },
    ]
    return (
        <div className="flex flex-col scale-150 gap-3 select-none" style={{ width: 200 }}>
            <div className="flex items-center gap-2">
                <span className="font-bold px-2 py-0.5 rounded"
                    style={{ background: "hsl(var(--primary)/0.14)", color: "hsl(var(--primary))", fontSize: 12 }}>
                    #1
                </span>
                <span style={{ fontSize: 12, color: "hsl(var(--foreground)/0.45)" }}>nefara.org</span>
            </div>
            <div className="flex items-end gap-1" style={{ height: 64 }}>
                {bars.map((b, i) => (
                    <div key={i} className="flex-1 rounded-sm"
                        style={{
                            height: `${b.h}%`,
                            background: `hsl(var(--primary) / ${0.22 + b.h / 100 * 0.7})`,
                            transformOrigin: "bottom",
                            animation: `barPulse 2.8s ease-in-out ${b.d}s infinite`,
                        }} />
                ))}
            </div>
            <div className="flex items-center gap-1"
                style={{ fontSize: 12, color: "hsl(var(--primary))", fontWeight: 600 }}>
                <span>↑</span><span>Organic traffic rising</span>
            </div>
        </div>
    )
}
