import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Landing } from '../components/Landing/Landing'
import InformacionAdicionalPostRegistro from '../pages/UsuariosPages/InformacionAdicionalPostRegistro'

export const LandingRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}/>
    </Routes>
  )
}
