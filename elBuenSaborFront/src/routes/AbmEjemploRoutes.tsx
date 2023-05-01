import { Route, Routes } from 'react-router-dom'
import { Landing } from '../components/Landing/Landing'
import CategoriaIngrABM from '../components/compIngrediente/CategoriaIngrABM'
import { GlobalContext } from '../context/GlobalContext'

import { ContextProvider } from '../context/ContextProvider'

export const AbmEjemploRoutes = () => {
  return (

      <Routes>
          <Route path="/rubroIngrediente" element={<CategoriaIngrABM/>}/>
      </Routes>

  )
}