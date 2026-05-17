export default function WidgetCell({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className="relative flex items-stretch justify-center w-full h-full py-6">
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    )
}
