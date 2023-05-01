import { Route, Routes } from 'react-router-dom'
import { Landing } from '../components/Landing/Landing'
import CategoriaIngrABM from '../pages/CategoriaIngredienteABM'
import { GlobalContext } from '../context/GlobalContext'

import { ContextProvider } from '../context/ContextProvider'
import { IngredientesABM } from '../pages/IngredientesABM'

export const AbmEjemploRoutes = () => {
  return (

      <Routes>
          <Route path="/rubroIngrediente" element={<CategoriaIngrABM/>}/>
          <Route path="/ingredientes" element={<IngredientesABM/>}/>
      </Routes>

  )
}