import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Landing } from '../components/Landing/Landing'

export const LandingRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}/>
    </Routes>
  )
}
