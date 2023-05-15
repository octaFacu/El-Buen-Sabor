import { Route, Routes } from 'react-router-dom'
import { Landing } from '../components/Landing/Landing'
import CategoriaIngrABM from '../pages/ABMPages/CategoriaIngredienteABM'
import { GlobalContext } from '../context/GlobalContext'

import { ContextProvider } from '../context/ContextProvider'
import { IngredientesABM } from '../pages/ABMPages/IngredientesABM'
import { CategoriaProductosABM } from '../pages/ABMPages/CategoriaProductosABM'

export const AbmEjemploRoutes = () => {
  return (

      <Routes>
          <Route path="/categoriaIngredientes" element={<CategoriaIngrABM/>}/>
          <Route path="/ingredientes" element={<IngredientesABM/>}/>
          <Route path="/categoriaProductos" element={<CategoriaProductosABM/>}/>

          
      </Routes>

  )
}