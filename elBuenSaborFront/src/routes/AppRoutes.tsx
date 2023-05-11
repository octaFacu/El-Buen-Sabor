import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingRoutes } from "./LandingRoutes"
import { NotFound } from "../components/NotFound"
import { AbmEjemploRoutes } from "../routes/AbmEjemploRoutes"
import UserRouters from '../routes/UserRouters'

export const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<LandingRoutes />} />
            <Route path="/abm/*" element={<AbmEjemploRoutes />} />
            <Route path="/usuarios" element={<UserRouters />}/>
            <Route path="*" element={<NotFound />} />
        </Routes>

    )
}
