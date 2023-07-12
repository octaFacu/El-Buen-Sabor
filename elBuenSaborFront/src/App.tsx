import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginBtn from './components/LoginBtn'
import ImgLogo from './components/Landing/ImgLogo'
import MenuCat from './components/Landing/MenuCat'
import CategoriaIngrABM from './pages/ABMPages/CategoriaIngredienteABM'
import { ContextProvider } from './context/ContextProvider'
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from './routes/AppRoutes'


const App: React.FC = () => {

  return (
  <ContextProvider>
    <BrowserRouter>

          <Navbar />

          <AppRoutes/>

      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
