import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginBtn from './components/LoginBtn'
import ImgLogo from './components/Landing/ImgLogo'
import CategoriaIngrABM from './pages/ABMPages/CategoriaIngredienteABM'
import { ContextProvider } from './context/ContextProvider'
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from './routes/AppRoutes'
import FloatingBtn from './components/navigation/FloatingBtn'


const App: React.FC = () => {

  return (
  <ContextProvider>
    <BrowserRouter>

          <Navbar />

          <AppRoutes/>
          <FloatingBtn></FloatingBtn>
          {/* <CategoriaIngrABM /> */}
        {/* </main>
      </div> */}
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
