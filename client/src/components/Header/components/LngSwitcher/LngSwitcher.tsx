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
            variant="slide"
            icon={Globe}
            slid={locale === "bg"}
            className="w-auto"
        >
            {displayLng}
        </Button>
    )
}

export default LngSwitcher
