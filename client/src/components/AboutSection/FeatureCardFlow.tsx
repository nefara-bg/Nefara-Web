export default function FeatureCardFlow({
    num, title, desc,
}: {
    num: string
    title: string
    desc: string
}) {
    return (
        <div className="relative w-full h-full overflow-hidden group cursor-default flex">
            <div className="flex flex-col justify-center px-10 py-6 items-center text-center md:items-start md:text-left">
                <div className="flex items-center gap-2 mb-3">
                    <span className="font-manrope font-bold tracking-[0.18em] transition-[letter-spacing] duration-300 group-hover:tracking-[0.28em] text-primary text-md">
                        {num}
                    </span>
                    <div
                        className="h-px transition-all duration-300 opacity-30 group-hover:opacity-80"
                        style={{ background: "hsl(var(--primary))", width: 18 }}
                    />
                </div>

                <h3 className="text-3xl font-manrope font-bold text-foreground transition-colors duration-200 group-hover:text-[hsl(var(--primary-strong))] mb-3">
                    {title}
                </h3>

                <p className="text-muted-foreground transition-colors duration-200 group-hover:text-foreground/65 text-lg">
                    {desc}
                </p>
            </div>
        </div>
    )
}
