import { useState,useEffect } from "react";
import "../pagesStyles/usuarios.css";
import MiCuentaComponent from '../../components/componentesUsuarios/MiCuentaComponent'
import MisDireccionesComponents from '../../components/componentesUsuarios/MisDireccionesComponents'
import MisFavoritosComponent from '../../components/componentesUsuarios/MisFavoritosComponent'
import MisPedidosComponent from '../../components/componentesUsuarios/MisPedidosComponent'
import {useAuth0} from '@auth0/auth0-react'
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { Usuario } from "../../context/interfaces/interfaces";

export default function InformacionUsuario() {
  const [mostrarCarta, setMostrarCarta] = useState(false);
  const [boton, setBoton] = useState<number | null>(null);
  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    activo: true,
  });

  const handleBoton = (numeroBoton: number) => {
    setBoton(numeroBoton);
    setMostrarCarta(true);
  };

  const { user, isLoading } = useAuth0();

  const traeUsuario = async () => {
    const servicioUsuarios = new ServiceBasicos("usuario");
    try {
      const id = await traerId();
      const usuarioGuardado = await servicioUsuarios.getOne(id);
      setUsuario(usuarioGuardado);
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
        return <MisDireccionesComponents usuario={usuario}/>;
      case 3:
        return <MisPedidosComponent />;
      case 4:
        return <MisFavoritosComponent  usuario={usuario}/>;
      default:
        return null;
    }
  };
  if (isLoading) {
    return <div>Cargando...</div>;     // Se podria cambiar poner algun snippet o algo para indicar la carga de una mejor manera
  }

  return (
    <div className="row mx-auto my-4">
      <div className="col-md-4">
        <div className="card d-flex flex-column align-items-center h-100 principal w-75">
          <img style={{ width: "200px", height: "200px" }}
           src={user?.picture} alt="Descripción de la imagen" className="card-img-top  rounded-circle card-img-custom mt-5" />

          <div className="card-body text-center  d-flex flex-column align-items-center w-100">
            <h5 className="card-title">{usuario.nombre}</h5>
            <p className="card-text">{user?.email}</p>

            <button
              className="btn text-white mr-2 mb-2 d-block w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleBoton(1)}> <i className="material-icons text-black ubicacion mr-2 text-white" > face </i> Mi Cuenta </button>

            <button
              className="btn text-white mr-2 mb-2 d-block w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleBoton(2)} > <i className="material-icons text-black ubicacion mr-2 text-white"> location_on </i> Mis Direcciones </button>

            <button
              className="btn text-white mr-2 mb-2 d-block w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleBoton(3)}> <i className="material-icons text-black ubicacion mr-2 text-white"> local_dining </i> Mis Pedidos </button>
            <button
              className="btn text-white mr-2 mb-2 d-block w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleBoton(4)}> <i className="material-icons text-black ubicacion mr-2 text-white"> favorite_border </i> Mis Favoritos </button>
          </div>
        </div>
      </div>
      <div className="col-md-7">{mostrarCarta && renderCard()}</div>
    </div>
  );
}