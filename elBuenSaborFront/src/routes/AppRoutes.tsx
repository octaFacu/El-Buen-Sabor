import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingRoutes } from "./LandingRoutes"
import { NotFound } from "../components/compIngrediente/NotFound"
import { AbmEjemploRoutes } from "../routes/AbmEjemploRoutes"


export const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<LandingRoutes />} />
            <Route path="/abm/*" element={<AbmEjemploRoutes />} />

            <Route path="*" element={<NotFound />} />
        </Routes>

    )
}
