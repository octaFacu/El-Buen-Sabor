import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/InformacionUsuario.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { Usuario } from "../../context/interfaces/interfaces";
import PageLoader from "../../components/pageLoader/PageLoader";
import { useUnidadContext } from "../../context/GlobalContext";

export default function InformacionAdicionalPostRegistro() {
  const { rol } = useUnidadContext();
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    activo: true,
    email: "",
    nombreRol: "CLIENTE"
  });

  useEffect(() => {
    if (user && user.login_count === 1) {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        id: user.userId,
        email: user.email || '',
      }));
    }
    console.log(user)
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
  
    const soloLetras = /^[a-zA-Z]+$/;
  
    const soloNumeros = /^[0-9]*$/;
  
    if ((id === 'nombre' || id === 'apellido') && (soloLetras.test(value) || value === '')) {
      setUsuario((prevUsuario) => ({ ...prevUsuario, [id]: value }));
    } 
    else if (id === 'telefono' && (soloNumeros.test(value) || value === '')) {
      setUsuario((prevUsuario) => ({ ...prevUsuario, [id]: value }));
    }     
  };
    

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const servicioUsuarios = new ServiceBasicos("usuario");
    const servicioCliente = new ServiceBasicos("cliente");

    try {
      const usuarioGuardado = await servicioUsuarios.createEntity(usuario, rol);  
      const cliente = {
        ...usuario,
        usuario: usuarioGuardado,
        
      };
  
      await servicioCliente.createEntity(cliente, rol);
       navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <PageLoader/>;
  }

  if (user && user.login_count == 1) {
    console.log("NO TENGO LOG")
    return (
      <div className="container mx-auto justify-content-center align-items-center" >
      <div className="card cardFormularioConitnuacion">
          <div className="card-body">
            <h3 className="card-title">Informacion Adicional</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3" style={{ display: "none" }}>
                <input
                  type="text"
                  id="id"
                  value={user.userId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control inputsControlador"
                  id="nombre"
                  placeholder="Ingrese su nombre"
                  value={usuario.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control inputsControlador"
                  id="apellido"
                  placeholder="Ingrese su apellido"
                  value={usuario.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="form-control inputsControlador"
                  id="telefono"
                  placeholder="Ingrese su teléfono"
                  value={usuario.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btnFormContinuacion">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {

    //Los roles aún no están convertidos en 
    if(rol == "" || rol == import.meta.env.VITE_CLIENTE){
     window.location.href = 'http://localhost:5173';
      //console.log("cliente")
    }else if(rol == import.meta.env.VITE_ADMIN){
      window.location.href = 'http://localhost:5173/admin/';
      //console.log("admin")
    }else if(rol == import.meta.env.VITE_COCINERO){
      window.location.href = 'http://localhost:5173/dashboard-cocina/';
      //console.log("cocinero")
    }else if(rol == import.meta.env.VITE_DELIVERY){
      window.location.href = 'http://localhost:5173/dashboard-delivery/';
      //console.log("delivery")
    }else if(rol == import.meta.env.VITE_CAJERO){
      window.location.href = 'http://localhost:5173/dashboard-pedidos/';
      //console.log("cajero")
    }else{
      window.location.href = 'hhttp://localhost:5173';
      //console.log("ROL "+rol)
    }

  }
}
