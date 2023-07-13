import React, { useState } from 'react';
import ModalInformacion from './modales/ModalInformacion'
import ModalContraseña from './modales/ModalContraseña'

export default function MiCuentaComponent() {
  const [modalInformacion, setModalInformacion] = useState<Boolean>(false);
  const [modalContraseña, setModalContraseña] = useState<Boolean>(false);

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
            className="card w-100 text-black text-decoration-none"
            onClick={abrirModalInformacion}
          >
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="material-icons text-black mr-3 icono text-white">
                  face
                </i>
                <h5 className="card-title mb-0 text-white">
                  Editar Informacion Personal
                </h5>
              </div>
            </div>
          </button>
        </div>
        <div className="col-md-11">
          <button
            className="card w-100 text-decoration-none"
            onClick={abrirModalContraseña}
          >
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="material-icons mr-3 icono text-white">
                  vpn_key
                </i>
                <h5 className="card-title mb-0 text-white">
                  Cambiar Contraseña
                </h5>
              </div>
            </div>
          </button>
        </div>
      </div>
      {modalInformacion && <ModalInformacion cerrarModal={cerrarModal} />}
      {modalContraseña && <ModalContraseña cerrarModal={cerrarModal} />}
    </div>
  );
};