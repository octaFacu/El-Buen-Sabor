import { Route, Routes } from 'react-router-dom'
import { Landing } from '../components/Landing/Landing'
import CategoriaIngrABM from '../components/compIngrediente/CategoriaIngrABM'

export const AbmEjemploRoutes = () => {
  return (
    <Routes>
        <Route path="/rubroIngrediente" element={<CategoriaIngrABM/>}/>
    </Routes>
  )
}