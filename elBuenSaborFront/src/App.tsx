import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginBtn from './components/LoginBtn'
import ImgLogo from './components/Landing/ImgLogo'
import MenuCat from './components/Landing/MenuCat'
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
<<<<<<< HEAD

=======
          <FloatingBtn></FloatingBtn>
          {/* <CategoriaIngrABM /> */}
        {/* </main>
      </div> */}
>>>>>>> 8f56efb679a37fd390b13ee8b2cfa3fd738d400d
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
