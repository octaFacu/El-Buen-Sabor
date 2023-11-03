import { useState, useEffect } from 'react';
import ModalInformacion from './modales/ModalInformacion'
import ModalContraseña from './modales/ModalContraseña'
import "../../pages/pagesStyles/usuarios.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Usuario } from "../../context/interfaces/interfaces";
import { ServiceBasicos } from "../../services/ServiceBasicos";

export default function MiCuentaComponent() {
  const [modalInformacion, setModalInformacion] = useState<Boolean>(false);
  const [modalContraseña, setModalContraseña] = useState<Boolean>(false);
  const { user, isLoading } = useAuth0();
  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    activo: true,
    email: ""
  });

  const traerId = (): string => {
    if (user) {
      return user.userId;
    } else {
      return ""; 
    }
  };

  const traeUsuario = async () => {
    const servicioUsuarios = new ServiceBasicos("usuario");
    try {
      const usuarioGuardado = await servicioUsuarios.getOne(traerId());
      setUsuario(usuarioGuardado);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    traeUsuario();
  },[])

  const abrirModalInformacion = () => {
    setModalInformacion(true);
  };

  const abrirModalContraseña = () => {
    setModalContraseña(true);
  };

  const cerrarModal = () => {
    setModalInformacion(false);
    setModalContraseña(false);
  };

  return (
    <div className="text-center">
      <h2 className="bold mb-3 pt-5">Información de la cuenta</h2>
      <div className="row mb-3">
        <div className="col-md-11">

          <button
            className="card-InfoUsu mt-extra-md pb-3 w-100 text-black text-decoration-none"
            onClick={abrirModalInformacion}
          >
            <div className='card-body d-flex align-items-center pt-3 ps-3'>
              <i className="material-icons text-black icono text-white">
                face
              </i>
              <h5 className="card-title mb-0 text-white">
                Editar Información Personal
              </h5>
            </div>
          </button>

        </div>
        <div className="col-md-11">

          <button
            className="card-InfoUsu mt-extra-md pb-3 w-100 text-black text-decoration-none"
            onClick={abrirModalContraseña}
          >
            <div className='card-body d-flex align-items-center pt-3 ps-3'>
              <i className="material-icons text-black icono text-white">
                face
              </i>
              <h5 className="card-title mb-0 text-white">
                Editar Información Personal
              </h5>
            </div>
          </button>

        </div>
      </div>
      {modalInformacion && <ModalInformacion cerrarModal={cerrarModal} usuario={usuario}/>}
      {modalContraseña && <ModalContraseña cerrarModal={cerrarModal} />}
    </div>
  );
};