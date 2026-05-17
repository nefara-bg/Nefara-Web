export default function WidgetCell({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card">
            {children}
        </div>
    )
}
