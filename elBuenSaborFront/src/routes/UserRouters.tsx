import { Route, Routes } from 'react-router-dom'
import InformacionUsuario from '../pages/UsuariosPages/InformacionUsuario'
import InformacionAdicionalPostRegistro from '../pages/UsuariosPages/InformacionAdicionalPostRegistro'

export default function UserRouters() {
  return (
    <Routes>
        <Route path="/" element={<InformacionUsuario/>}/>
    </Routes>
  )
}
