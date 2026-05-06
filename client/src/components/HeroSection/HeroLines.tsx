const T = "hsl(var(--primary) / 0.65)"

export default function HeroLines() {
    return (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

            {/* Left vertical: 13.9%x, 8.1% → 44.3%y */}
            <div className="absolute w-px"
                style={{ background: T, left: "13.9%", top: "8.1%", height: "36.2%" }} />

            {/* Upper horizontal: 32.5%y, 13.9%x → right edge */}
            <div className="absolute h-px"
                style={{ background: T, top: "32.5%", left: "13.9%", right: 0 }} />

            {/* Right vertical: 14.6% from right, 32.5%y → bottom */}
            <div className="absolute w-px"
                style={{ background: T, right: "14.6%", top: "32.5%", bottom: 0 }} />

            {/* Lower horizontal: 44.3%y, left edge → 14.6% from right */}
            <div className="absolute h-px"
                style={{ background: T, top: "44.3%", left: 0, right: "14.6%" }} />

            {/* Button zone – upper horizontal */}
            <div className="absolute h-px"
                style={{ background: T, top: "62.9%", left: "21.2%", right: "18.9%" }} />

            {/* Button zone – lower horizontal */}
            <div className="absolute h-px"
                style={{ background: T, top: "68.5%", left: "21.2%", right: "18.9%" }} />

            {/* Tall left bracket tick */}
            <div className="absolute w-px"
                style={{ background: T, left: "22.4%", top: "61.1%", height: "9.3%" }} />

            {/* Tall right bracket tick */}
            <div className="absolute w-px"
                style={{ background: T, right: "20.5%", top: "61.1%", height: "9.3%" }} />

            {/* Inner tick – left edge of "Get Started" */}
            <div className="absolute w-px"
                style={{ background: T, left: "33.7%", top: "62.9%", height: "5.6%" }} />

            {/* Inner tick – between the two buttons */}
            <div className="absolute w-px"
                style={{ background: T, left: "47.1%", top: "62.9%", height: "5.6%" }} />

            {/* Inner tick – right edge of "View Our Services" */}
            <div className="absolute w-px"
                style={{ background: T, left: "68.6%", top: "62.9%", height: "5.6%" }} />
        </div>
    )
}
