import { useNavigate } from 'react-router-dom';
import '../../css/InformacionUsuario.css'
import { useAuth0 } from '@auth0/auth0-react';


export default function InformacionAdicionalPostRegistro() {

  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();
  
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  if (user && user.login_count === 1) {
  return (
    <div className="container mt-4" style={{ paddingTop: '100px'}}>
      <div className="card cardFormularioConitnuacion" >
        <div className="card-body">
          <h3 className="card-title">Informacion Adicional</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control inputsControlador" id="nombre" placeholder="Ingrese su nombre" />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input type="text" className="form-control inputsControlador" id="apellido" placeholder="Ingrese su apellido" />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono</label>
              <input type="tel" className="form-control inputsControlador" id="telefono" placeholder="Ingrese su teléfono" />
            </div>
            <button type="submit" className="btn  btnFormContinuacion">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}else{
  navigate("/")
}
};