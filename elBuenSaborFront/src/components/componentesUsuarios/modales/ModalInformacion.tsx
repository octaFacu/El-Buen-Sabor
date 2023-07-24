import React, { useState, useEffect } from "react";
import "./modal.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ServiceBasicos } from "../../../services/ServiceBasicos";
import ModalConfirmacion from "./ModalConfirmacion";
import { Usuario } from "../../../context/interfaces/interfaces";

interface ModalProps {
  cerrarModal: () => void;
}

const ModalInformacion: React.FC<ModalProps> = ({ cerrarModal }) => {
  const { user, isLoading } = useAuth0();
  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    activo: true,
  });
  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState<boolean>(false);

  const traeUsuario = async () => {
    const servicioUsuarios = new ServiceBasicos("usuario");
    try {
      const usuarioGuardado = await servicioUsuarios.getOne(traerId());
      setUsuario(usuarioGuardado);
    } catch (error) {
      console.error(error);
    }
  };

  const traerId = (): string => {
    if (user) {
      return user.userId;
    } else {
      return ""; // nunca llega
    }
  };

  useEffect(() => {
    traeUsuario();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUsuario((prevUsuario) => ({ ...prevUsuario, [id]: value }));
  };

  const handleGuardarClick = () => {
    setMostrarConfirmacion(true);
  };

  const handleCancelarGuardar = () => {
    setMostrarConfirmacion(false);
  };
  const handleConfirmarGuardar = async () => {
    const servicioUsuarios = new ServiceBasicos("usuario");
    try {
      await servicioUsuarios.updateEntity(usuario);
      cerrarModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog d-flex align-items-center justify-content-center modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h3 className="modal-title text-center text-white bold ">Información Personal</h3>
            <button type="button" className="close" onClick={cerrarModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <p className="text-white parrafo bold">Nombre:</p>
              <input
                type="text"
                id="nombre"
                className="form-control text-center text-white"
                placeholder="Nombre"
                value={usuario.nombre}
                onChange={handleChange}
              />
              <p className="text-white parrafo bold">Apellido:</p>
              <input
                type="text"
                id="apellido"
                className="form-control text-center text-white"
                placeholder="Apellido"
                value={usuario.apellido}
                onChange={handleChange}
              />
              <p className="text-white parrafo bold">Número de Teléfono:</p>
              <input
                type="text"
                id="telefono"
                className="form-control text-center text-white"
                placeholder="Número de Teléfono"
                value={usuario.telefono}
                onChange={handleChange}
              />
              <div className="modal-footer justify-content-center text-center">
                <button
                  type="button"
                  className="btn modal-usuario text-white altura mx-5"
                  onClick={cerrarModal}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn modal-usuario text-white altura mx-5"
                  onClick={handleGuardarClick}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalConfirmacion
        mostrarModal={mostrarConfirmacion}
        cerrarModal={handleCancelarGuardar}
        confirmar={handleConfirmarGuardar}
      />
    </div>
  );
};

export default ModalInformacion;
