import { Route, Routes } from 'react-router-dom'
import InformacionUsuario from '../pages/UsuariosPages/InformacionUsuario'


export default function UserRouters() {
  return (
    <Routes>
        <Route path="/" element={<InformacionUsuario/>}/>
    </Routes>
  )
}
