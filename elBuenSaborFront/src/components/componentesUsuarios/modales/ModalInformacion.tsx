import React, { useState, useEffect } from "react";
import "./modal.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ServiceBasicos } from "../../../services/ServiceBasicos";
import ModalConfirmacion from "./ModalConfirmacion";
import { Usuario } from "../../../context/interfaces/interfaces";

interface ModalProps {
  cerrarModal: () => void;
  usuario: Usuario
}

export default function ModalInformacion({ cerrarModal, usuario }: ModalProps) {


  const { user, isLoading } = useAuth0();
  const [usuarioTemp, setUsuarioTemp] = useState<Usuario>({
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    telefono: usuario.telefono,
    activo: usuario.activo,
    email: usuario.email,
    nombreRol: usuario.nombreRol
  });

  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState<boolean>(false);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUsuarioTemp((prevUsuario) => ({ ...prevUsuario, [id]: value }));
    console.log("asdlj")
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
      await servicioUsuarios.updateEntity(usuarioTemp);
      cerrarModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="modal modal-overlay" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-scrollable d-flex align-items-center justify-content-center modal-lg ">
        <div className="modal-content modal-infoUsu">
          <div className="modal-header mt-3 text-center">
            <h3 className="modal-title text-center text-white bold">Información Personal</h3>
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
                value={usuarioTemp.nombre}
                onChange={handleChange}
              />
              <p className="text-white parrafo bold">Apellido:</p>
              <input
                type="text"
                id="apellido"
                className="form-control text-center text-white"
                placeholder="Apellido"
                value={usuarioTemp.apellido}
                onChange={handleChange}
              />
              <p className="text-white parrafo bold">Número de Teléfono:</p>
              <input
                type="number"
                id="telefono"
                className="form-control text-center text-white"
                placeholder="Número de Teléfono"
                value={usuarioTemp.telefono}
                onChange={handleChange}
              />
              <div className="modal-footer justify-content-center text-center">
                <button
                  type="button"
                  className="btn modal-usuario text-white altura mx-2 mx-md-5"
                  onClick={handleGuardarClick}
                >
                  Guardar
                </button>

                <button
                  type="button"
                  className="btn modal-usuario text-white altura mx-2 mx-md-5"
                  onClick={cerrarModal}
                >
                  Cerrar
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


