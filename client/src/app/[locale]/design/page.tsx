export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-background text-foreground px-8 py-16 max-w-5xl mx-auto space-y-20">

            {/* Header */}
            <div>
                <p className="eyebrow mb-4">Nefara Software Solutions</p>
                <h1 className="text-5xl font-bold text-foreground mb-3">Design System</h1>
                <p className="text-muted-foreground text-lg">Tokens, typography, components, and patterns.</p>
            </div>

            {/* ── Colors ── */}
            <section className="space-y-6">
                <SectionLabel>Colors</SectionLabel>

                <div>
                    <GroupLabel>Brand</GroupLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <Swatch bg="bg-primary" label="Primary" value="#00CDBC" textDark />
                        <Swatch bg="bg-[hsl(175,100%,33%)]" label="Primary Strong" value="#00A89A" textDark />
                        <Swatch bg="bg-primary-soft" label="Primary Soft" value="hsl(174 80% 95%)" />
                        <Swatch bg="bg-secondary" label="Secondary" value="#0B1F2A" />
                    </div>
                </div>

                <div>
                    <GroupLabel>Surface</GroupLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <Swatch bg="bg-background" label="Background" value="#F6F9FB" border />
                        <Swatch bg="bg-card" label="Card" value="#FFFFFF" border />
                        <Swatch bg="bg-muted" label="Muted" value="hsl(210 33% 96%)" border />
                        <Swatch bg="bg-accent" label="Accent" value="hsl(174 80% 95%)" border />
                    </div>
                </div>

                <div>
                    <GroupLabel>Text</GroupLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <Swatch bg="bg-foreground" label="Foreground" value="#0F172A" />
                        <Swatch bg="bg-muted-foreground" label="Muted Foreground" value="#64748B" />
                        <Swatch bg="bg-primary-foreground" label="Primary Foreground" value="#FFFFFF" border />
                        <Swatch bg="bg-secondary-foreground" label="Secondary Foreground" value="#FFFFFF" border />
                    </div>
                </div>

                <div>
                    <GroupLabel>Utility</GroupLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <Swatch bg="bg-border" label="Border" value="#E2E8F0" border />
                        <Swatch bg="bg-ring" label="Ring / Focus" value="hsl(174 100% 40%)" textDark />
                        <Swatch bg="bg-destructive" label="Destructive" value="hsl(0 84% 60%)" />
                    </div>
                </div>
            </section>

            {/* ── Typography ── */}
            <section className="space-y-6">
                <SectionLabel>Typography</SectionLabel>

                <div className="space-y-8">
                    <div className="p-6 border border-border rounded-lg">
                        <GroupLabel>Manrope - Display / Headings</GroupLabel>
                        <div className="space-y-3 mt-4" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
                            <p className="text-5xl font-extrabold tracking-tight leading-[1.1]">H1 · Extra Bold 800</p>
                            <p className="text-4xl font-bold tracking-tight leading-[1.1]">H2 · Bold 700</p>
                            <p className="text-3xl font-semibold tracking-tight leading-[1.1]">H3 · Semi Bold 600</p>
                            <p className="text-2xl font-medium leading-[1.1]">H4 · Medium 500</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            Variable: <code className="bg-muted px-1 rounded">--font-manrope</code> ·
                            Weights: 500, 600, 700, 800 · Tracking: −0.025em
                        </p>
                    </div>

                    <div className="p-6 border border-border rounded-lg">
                        <GroupLabel>Nunito Sans - Body / UI</GroupLabel>
                        <div className="space-y-3 mt-4" style={{ fontFamily: "var(--font-nunito-sans), sans-serif" }}>
                            <p className="text-lg font-semibold">Body Large · Semi Bold 600</p>
                            <p className="text-base font-medium">Body · Medium 500 - default body weight</p>
                            <p className="text-sm font-normal">Small · Regular 400 - captions, labels, metadata</p>
                            <p className="text-xs font-normal text-muted-foreground">Extra Small · Regular 400 · Muted</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            Variable: <code className="bg-muted px-1 rounded">--font-nunito-sans</code> ·
                            Weights: 400, 500, 600, 700
                        </p>
                    </div>

                    <div className="p-6 border border-border rounded-lg">
                        <GroupLabel>Poppins - Available (loaded, spare)</GroupLabel>
                        <div className="space-y-3 mt-4" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                            <p className="text-lg font-semibold">Semi Bold 600</p>
                            <p className="text-base font-medium">Medium 500</p>
                            <p className="text-sm font-normal">Regular 400</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            Variable: <code className="bg-muted px-1 rounded">--font-poppins</code> ·
                            Weights: 400, 500, 600, 700
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Radius ── */}
            <section className="space-y-6">
                <SectionLabel>Border Radius</SectionLabel>
                <div className="flex flex-wrap gap-8 items-end">
                    <RadiusSwatch label="sm" value="4px" className="rounded-sm" />
                    <RadiusSwatch label="md" value="6px" className="rounded-md" />
                    <RadiusSwatch label="lg (base)" value="8px" className="rounded-lg" />
                    <RadiusSwatch label="xl" value="12px" className="rounded-xl" />
                    <RadiusSwatch label="2xl" value="16px" className="rounded-2xl" />
                    <RadiusSwatch label="full" value="9999px" className="rounded-full" />
                </div>
                <p className="text-sm text-muted-foreground">
                    Base <code className="bg-muted px-1 rounded">--radius: 0.5rem</code> (8 px).
                    sm = base − 4 px · md = base − 2 px · lg = base.
                </p>
            </section>

            {/* ── Spacing ── */}
            <section className="space-y-6">
                <SectionLabel>Spacing Scale</SectionLabel>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24].map(n => (
                        <div key={n} className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground w-6 text-right font-mono">{n}</span>
                            <div
                                className="h-5 bg-primary rounded-sm opacity-70"
                                style={{ width: `${n * 4}px` }}
                            />
                            <span className="text-xs text-muted-foreground">{n * 4}px</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Components ── */}
            <section className="space-y-10">
                <SectionLabel>Component Patterns</SectionLabel>

                <div className="space-y-4">
                    <GroupLabel>Eyebrow label</GroupLabel>
                    <p className="eyebrow">Section Label</p>
                    <code className="block text-xs bg-muted px-3 py-2 rounded-md text-muted-foreground">
                        {`<p className="eyebrow">Section Label</p>`}
                    </code>
                </div>

                <div className="space-y-4">
                    <GroupLabel>Accent chip (icon container)</GroupLabel>
                    <div className="flex gap-3 flex-wrap">
                        {(["p-2", "p-3", "p-4"] as const).map(s => (
                            <div key={s} className={`accent-chip ${s}`}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                        ))}
                    </div>
                    <code className="block text-xs bg-muted px-3 py-2 rounded-md text-muted-foreground">
                        {`<div className="accent-chip p-2">...</div>`}
                    </code>
                </div>

                <div className="space-y-4">
                    <GroupLabel>Grid pattern overlay</GroupLabel>
                    <div className="grid-pattern h-40 rounded-xl border border-border" />
                    <code className="block text-xs bg-muted px-3 py-2 rounded-md text-muted-foreground">
                        {`<div className="grid-pattern" />`}
                    </code>
                </div>

                <div className="space-y-4">
                    <GroupLabel>Dark section (navy bg)</GroupLabel>
                    <div className="dark-section rounded-xl p-8 space-y-2">
                        <p className="eyebrow" style={{ color: "hsl(174,100%,40%)" }}>Eyebrow in dark</p>
                        <h3 className="text-2xl">Heading on Navy</h3>
                        <p className="text-sm opacity-70">Body copy inside a dark-section container.</p>
                    </div>
                    <code className="block text-xs bg-muted px-3 py-2 rounded-md text-muted-foreground">
                        {`<section className="dark-section">...</section>`}
                    </code>
                </div>

                <div className="space-y-4">
                    <GroupLabel>Buttons</GroupLabel>
                    <div className="flex flex-wrap gap-3">
                        <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[hsl(175,100%,33%)] transition-colors">
                            Primary CTA
                        </button>
                        <button className="border border-primary text-primary px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-soft transition-colors">
                            Outlined
                        </button>
                        <button className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm">
                            Secondary
                        </button>
                        <button className="bg-muted text-foreground px-5 py-2.5 rounded-lg font-semibold text-sm">
                            Ghost / Muted
                        </button>
                        <button className="bg-destructive text-destructive-foreground px-5 py-2.5 rounded-lg font-semibold text-sm">
                            Destructive
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <GroupLabel>Card surface</GroupLabel>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-2">
                            <div className="accent-chip p-2 w-fit mb-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-base">Card Title</h4>
                            <p className="text-sm text-muted-foreground">Supporting description text that explains the card content.</p>
                        </div>
                        <div className="bg-muted border border-border rounded-xl p-6 space-y-2">
                            <h4 className="font-semibold text-base">Muted Card</h4>
                            <p className="text-sm text-muted-foreground">Same pattern on a muted background surface.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Token Reference ── */}
            <section className="space-y-4">
                <SectionLabel>Token Quick Reference</SectionLabel>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border text-left">
                                <th className="pb-2 pr-6 font-semibold text-foreground">Token</th>
                                <th className="pb-2 pr-6 font-semibold text-foreground">CSS Variable</th>
                                <th className="pb-2 pr-6 font-semibold text-foreground">Tailwind class</th>
                                <th className="pb-2 font-semibold text-foreground">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-muted-foreground">
                            {[
                                ["Background", "--background", "bg-background", "#F6F9FB"],
                                ["Foreground", "--foreground", "text-foreground", "#0F172A"],
                                ["Card", "--card", "bg-card", "#FFFFFF"],
                                ["Primary", "--primary", "bg-primary / text-primary", "#00CDBC"],
                                ["Primary Strong", "--primary-strong", "text-accent-foreground", "#00A89A"],
                                ["Primary Soft", "--primary-soft", "bg-primary-soft", "hsl(174 80% 95%)"],
                                ["Secondary", "--secondary", "bg-secondary", "#0B1F2A"],
                                ["Muted", "--muted", "bg-muted", "hsl(210 33% 96%)"],
                                ["Muted FG", "--muted-foreground", "text-muted-foreground", "#64748B"],
                                ["Border", "--border", "border-border", "#E2E8F0"],
                                ["Destructive", "--destructive", "bg-destructive", "hsl(0 84% 60%)"],
                                ["Radius", "--radius", "rounded-lg", "0.5rem / 8px"],
                                ["Font Display", "--font-manrope", "font-display", "Manrope"],
                                ["Font Body", "--font-nunito-sans", "font-sans", "Nunito Sans"],
                            ].map(([token, css, tw, val]) => (
                                <tr key={token} className="py-2">
                                    <td className="py-2 pr-6 text-foreground font-medium">{token}</td>
                                    <td className="py-2 pr-6 font-mono text-xs">{css}</td>
                                    <td className="py-2 pr-6 font-mono text-xs">{tw}</td>
                                    <td className="py-2 font-mono text-xs">{val}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <footer className="border-t border-border pt-8 text-xs text-muted-foreground">
                Nefara Design System · dev-only route <code>/design</code>
            </footer>
        </div>
    )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{children}</h2>
            <div className="flex-1 h-px bg-border" />
        </div>
    )
}

function GroupLabel({ children }: { children: React.ReactNode }) {
    return <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{children}</p>
}

function Swatch({
    bg, label, value, border, textDark
}: {
    bg: string; label: string; value: string; border?: boolean; textDark?: boolean
}) {
    return (
        <div className="space-y-2">
            <div className={`${bg} h-16 rounded-lg ${border ? "border border-border" : ""}`} />
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground font-mono">{value}</p>
        </div>
    )
}

function RadiusSwatch({ label, value, className }: { label: string; value: string; className: string }) {
    return (
        <div className="space-y-2 text-center">
            <div className={`w-16 h-16 bg-primary/20 border-2 border-primary ${className}`} />
            <p className="text-xs font-semibold text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{value}</p>
        </div>
    )
}
