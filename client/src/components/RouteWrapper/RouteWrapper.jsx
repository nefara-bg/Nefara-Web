import { Outlet, useNavigate, useParams } from "react-router-dom"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

const RouteWrapper = () => {
    const { lng } = useParams()
    const { i18n } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        if(lng !== "bg" && lng !== "en") navigate(`/en`)
        else i18n.changeLanguage(lng)
    }, [lng])



    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default RouteWrapper