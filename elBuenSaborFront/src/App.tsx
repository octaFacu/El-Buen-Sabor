import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginBtn from './components/LoginBtn'
import ImgLogo from './components/ImgLogo'
import MenuCat from './components/MenuCat'
import CategoriaIngrABM from './pages/CategoriaIngredienteABM'
import { ContextProvider } from './context/ContextProvider'
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from './routes/AppRoutes'







const App: React.FC = () => {



  return (
  <ContextProvider>
    <BrowserRouter>
      {/* <div className="App" >
        <main> */}
          <Navbar />
          {/* <ImgLogo />
          <MenuCat /> */}
          <AppRoutes/>
          {/* <CategoriaIngrABM /> */}
        {/* </main>
      </div> */}
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
