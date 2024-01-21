import { useState, useEffect } from "react";
import "../pagesStyles/usuarios.css";
import MiCuentaComponent from '../../components/componentesUsuarios/MiCuentaComponent'
import MisDireccionesComponents from '../../components/componentesUsuarios/MisDireccionesComponents'
import MisFavoritosComponent from '../../components/componentesUsuarios/MisFavoritosComponent'
import MisPedidosComponent from '../../components/componentesUsuarios/MisPedidosComponent'
import { useAuth0 } from '@auth0/auth0-react'
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { Usuario } from "../../context/interfaces/interfaces";
import PageLoader from "../../components/pageLoader/PageLoader";
import { useUnidadContext } from "../../context/GlobalContext";

import { BrowserRouter, Route, NavLink } from 'react-router-dom';

interface props {
  opcion: number
}

export default function InformacionUsuario({ opcion }: props) {
  const [boton, setBoton] = useState<number | null>(null);
   const { rol } = useUnidadContext();
  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    activo: true,
    email: ""
  });

  const handleBoton = (numeroBoton: number) => {
    setBoton(numeroBoton);
  };

  const { user, isLoading } = useAuth0();

  const traeUsuario = async () => {
    const servicioUsuarios = new ServiceBasicos("usuario");
    try {
      const id = await traerId();
      const usuarioGuardado = await servicioUsuarios.getOne(id, rol);
      setUsuario(usuarioGuardado);

      switch (window.location.pathname) {
        case "/usuarios/MiCuenta":
          return setBoton(1);
        case "/usuarios/MisDirecciones":
          return setBoton(2);
        case "/usuarios/MisPedidos":
          return setBoton(3);
        case "/usuarios/MisFavoritos":
          return setBoton(4);
        default:
          return setBoton(1);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const traerId = async (): Promise<string> => {
    if (user) {
      const userId = await user.userId;
      return userId;
    } else {
      return ""; //  nunca llega 
    }
  };

  useEffect(() => {
    if (!isLoading) {
      traeUsuario();
    }
  }, [isLoading, usuario]); // si cambia el usuario o si no esta cargando se vuelve a llamar a traerUsuario

  const renderCard = () => {
    switch (boton) {
      case 1:
        return <MiCuentaComponent />;
      case 2:
        return <MisDireccionesComponents usuario={usuario} />;
      case 3:
        return <MisPedidosComponent usuario={usuario} />;
      case 4:
        return <MisFavoritosComponent usuario={usuario} />;
      default:
        return null;
    }
  };
  if (isLoading) {
    return <PageLoader />;     // Se podria cambiar poner algun snippet o algo para indicar la carga de una mejor manera
  }

  return (
    <div className="container">
      <div className="row mx-auto my-4">
        <div className="col-md-4 col-sm-12 mt-md-5">
          <div className="card-InfoUsu mt-md-5  pb-5 d-flex flex-column align-items-center">
            <img
              style={{ maxWidth: "200px", maxHeight: "200px" }}
              src={user?.picture}
              alt="Descripción de la imagen"
              className="card-img-top rounded-circle card-img-custom mt-5"
            />
            <div className="card-body text-center  d-flex flex-column align-items-center w-100">
              <h5 className="card-title">{usuario.nombre}</h5>
              <p className="card-text">{user?.email}</p>
              <NavLink to="/usuarios/MiCuenta" className="sinDecoracion text-white mr-2 mb-md-3 d-block w-100 ">
                <button
                  className={`btn-tam text-white w-100 d-flex align-items-center justify-content-center ${boton === 1 ? 'btn-activo' : ''}`}
                  onClick={() => handleBoton(1)}
                >
                  <i className="material-icons text-black tam-icono mr-2 text-white">face</i> Mi Cuenta
                </button>
              </NavLink>

              <NavLink to="/usuarios/MisDirecciones" className="sinDecoracion text-white mr-2 mb-md-3 d-block w-100 ">
                <button
                  className={`btn-tam text-white w-100 d-flex align-items-center justify-content-center ${boton === 2 ? 'btn-activo' : ''}`}
                  onClick={() => handleBoton(2)}
                >
                  <i className="material-icons text-black tam-icono mr-2 text-white">location_on</i> Mis Direcciones
                </button>
              </NavLink>

              <NavLink to="/usuarios/MisPedidos" className="sinDecoracion text-white mr-2 mb-md-3 d-block w-100 ">
                <button
                  className={`btn-tam text-white w-100 d-flex align-items-center justify-content-center ${boton === 3 ? 'btn-activo' : ''}`}
                  onClick={() => handleBoton(3)}
                >
                  <i className="material-icons text-black tam-icono mr-2 text-white">local_dining</i> Mis Pedidos</button>
              </NavLink>

              <NavLink to="/usuarios/MisFavoritos" className="sinDecoracion text-white mr-2 mb-md-3 d-block w-100 ">
                <button
                  className={`btn-tam text-white w-100 d-flex align-items-center justify-content-center ${boton === 4 ? 'btn-activo' : ''}`}
                  onClick={() => handleBoton(4)}
                >
                  <i className="material-icons text-black tam-icono mr-2 text-white">favorite_border</i> Mis Favoritos
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          {renderCard()}
        </div>
      </div>
    </div>
  );
}