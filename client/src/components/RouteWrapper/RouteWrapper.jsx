import { Outlet, useNavigate, useParams } from "react-router-dom"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { useEffect } from "react"

const RouteWrapper = () => {
    const { lng } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(lng !== "bg" && lng !== "en") navigate(`/en`)
    }, [lng, navigate])



    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default RouteWrapper