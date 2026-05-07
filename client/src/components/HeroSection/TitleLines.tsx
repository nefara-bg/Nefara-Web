export function TitleLines() {
    return (
        <>
            {/* Upper horizontal */}
            <div className="absolute bg-primary w-full h-px top-0 left-0" />
            {/* Bottom horizontal */}
            <div className="absolute bg-primary w-[100vw] h-px bottom-0 right-0" />
            {/* Right vertical */}
            <div className="absolute bg-primary h-[100vw] w-px top-0 right-0" />
            {/* Left vertical */}
            <div className="absolute bg-primary h-[100vw] w-px bottom-0 left-0" />
        </>
    )
}