import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NotFound } from "../components/NotFound"
import { routesConfig } from "./routesConfig"

export const AppRoutes = () => {
    return (

        <Routes>
            {routesConfig.map((route, i) => (
                <Route key={i} path={route.path} element={<route.component />} />
            ))}
        </Routes>

    )
}
