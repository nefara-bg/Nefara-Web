"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'

interface LngSwitcherProps {
    locale?: string;
}

const LngSwitcher: React.FC<LngSwitcherProps> = ({ locale = "en" }) => {
    const languages = {
        en: "EN",
        bg: "БГ",
    }

    const [displayLng] = useState(locale === "bg" ? languages.en : languages.bg)

    const location = usePathname()
    const currentPath = location.replace(/^\/(en|bg)/, "")

    const router = useRouter()

    const handleToggleLng = () => {
        const newLng = locale === "bg" ? "en" : "bg"
        router.push(currentPath, { locale: newLng })
    }

    return (
        <Button
            onClick={handleToggleLng}
            variant="outline"
            size="sm"
        >
            <div className="flex flex-row gap-2 items-center">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{displayLng}</span>
            </div>
        </Button>
    )
}

export default LngSwitcher
