"use client"

import { useStickyScrollProgress, ScrollValue } from "@/components/ui/sticky-scroll-reveal"
import { useState, useEffect, useRef } from "react"

const fallback = new ScrollValue()

const T_START = 0.01
const T_END   = 0.145

function inv(a: number, b: number, v: number) {
    return Math.max(0, Math.min(1, (v - a) / (b - a)))
}

const CSS = `
.pw-wrap{--pc:#dcdac4;--pc2:#c0beaa;position:relative;display:inline-block}
.pw-printer{width:220px;height:56px;border-radius:0 0 6px 6px;position:relative;background-color:var(--pc);border:2px solid var(--pc2);box-shadow:0 12px 24px #0002,0 -20px 12px #0001}
.pw-top{position:absolute;top:-20px;left:0;width:100%;height:48px;border-radius:8px 8px 0 0;border-bottom:2px solid #0003;background-color:var(--pc);filter:brightness(1.12);box-shadow:0 8px 12px -8px #fff5 inset,0 -4px 12px -4px #0003 inset;z-index:2;box-sizing:border-box}
.pw-slot{position:absolute;top:14px;left:20px;width:180px;height:28px;border-radius:0 0 3px 3px;border-bottom:1px solid #0003;background-image:linear-gradient(to top,var(--pc),60%,var(--pc2));box-shadow:0 3px 3px -1px #0004;z-index:1}
.pw-display{z-index:3;display:flex;align-items:center;padding:3px 6px;position:absolute;top:-7px;left:20px;width:110px;height:22px;background-color:#000;border:2px solid var(--pc2);border-radius:4px;box-sizing:border-box;box-shadow:-1px -1px 2px 0 #fff9 inset,1px 1px 4px 1px #000 inset;font-family:'Courier New',monospace;font-size:9px;color:#5aff5a;letter-spacing:.05em;overflow:hidden}
.pw-btn{z-index:3;position:absolute;top:-20px;right:0;margin:10px;width:32px;height:24px;border-radius:4px;border:1px solid #0001;background-color:var(--pc);box-shadow:1px 1px 2px 0 #fff8 inset,-1px -1px 2px 0 #0002 inset,0 2px 4px #0002;display:flex;align-items:center;justify-content:center;font-size:13px}
.pw-paper{position:absolute;top:0;left:30px;z-index:0}
.pw-receipt{position:relative;background:#f5f5f5;width:152px;padding:12px 14px 16px;font-family:'Courier New',monospace;box-shadow:0 6px 12px #0001,0 12px 24px #0001}
.pw-receipt::after{--a:225deg;content:"";display:block;position:absolute;bottom:-5px;left:0;width:100%;height:5px;background:linear-gradient(calc(var(--a)*-1),#f5f5f5 2.5px,transparent 0),linear-gradient(var(--a),#f5f5f5 2.5px,transparent 0);background-position:2.5px 0;background-repeat:repeat-x;background-size:5px 5px}
`

const DISPLAY = "PRINTING..."

export function PrinterWidget({ keywords }: { keywords: string[] }) {
    const scrollProgress = useStickyScrollProgress() ?? fallback
    const [t, setT] = useState(0)
    const svRef = useRef(scrollProgress)
    svRef.current = scrollProgress

    useEffect(() => {
        setT(inv(T_START, T_END, svRef.current.get()))
        return svRef.current.on((v) => setT(inv(T_START, T_END, v)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Display letters
    const letterOn = DISPLAY.split("").map((_, i) => t > i * 0.043)

    // Paper slides out: t 0 → 0.75
    const paperT    = inv(0, 0.75, t)
    const slideY    = ((1 - paperT) * -100).toFixed(1)
    const clipInset = ((1 - paperT) * 100).toFixed(1)
    const paperClip = `inset(${clipInset}% -4px -4px -4px)`

    // Keywords stagger in as paper extends
    const kwOpacity = keywords.map((_, i) => inv(0.45 + i * 0.1, 0.65 + i * 0.08, t))

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <div
                className="w-full h-full rounded-xl flex items-center justify-center relative"
                style={{ background: "hsl(var(--background))", overflow: "visible" }}
            >
                <div className="pw-wrap">
                    {/* Printer body */}
                    <div className="pw-printer" style={{ position: "relative", zIndex: 2 }}>
                        <div className="pw-top" />
                        <div className="pw-slot" />
                        <div className="pw-display">
                            {DISPLAY.split("").map((ch, i) => (
                                <span key={i} style={{ opacity: letterOn[i] ? 1 : 0, transition: "opacity 0.06s" }}>
                                    {ch}
                                </span>
                            ))}
                        </div>
                        <div className="pw-btn">🖨️</div>
                    </div>

                    {/* Receipt paper sliding out */}
                    <div
                        className="pw-paper"
                        style={{
                            transform: `translateY(${slideY}%)`,
                            clipPath: paperClip,
                        }}
                    >
                        <div className="pw-receipt">
                            {/* Logo */}
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                                <img src="/logo.svg" alt="Nefara" style={{ width: 68, height: "auto" }} />
                            </div>

                            <div style={{ borderTop: "1px dashed #bbb", marginBottom: 8 }} />

                            {/* Keywords */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                                {keywords.map((kw, i) => (
                                    <div
                                        key={kw}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 7,
                                            opacity: kwOpacity[i],
                                            transform: `translateX(${(1 - kwOpacity[i]) * -8}px)`,
                                        }}
                                    >
                                        <span style={{ color: "hsl(var(--primary))", fontWeight: 700, fontSize: 12, lineHeight: 1, flexShrink: 0 }}>›</span>
                                        <span style={{ fontSize: 10, color: "#333", fontWeight: 600, letterSpacing: "0.02em" }}>{kw}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: "1px dashed #bbb", marginTop: 8, paddingTop: 5, textAlign: "center", fontSize: 8, color: "#aaa", letterSpacing: "0.08em" }}>
                                NEFARA.DEV
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
