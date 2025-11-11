"use client"

import { useRouter } from "next/navigation"

export const useNavigate = () => {
    const router = useRouter()
    return (route) => router.push(route)
}