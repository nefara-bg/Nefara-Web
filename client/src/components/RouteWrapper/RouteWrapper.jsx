import { Outlet } from "react-router-dom"
import Header from "../Header/Header"

const RouteWrapper = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default RouteWrapper