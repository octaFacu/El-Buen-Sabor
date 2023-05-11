import { useState } from "react";
import ModalEdicionDireccion from "./modales/ModalEdicionDireccion";
import ModalConfirmacion from "./modales/ModalConfirmacionEliminacion";

export default function MisDireccionesComponents() {
  const [modalEdicion, setModalEdicion] = useState<Boolean>(false);
  const [modo, setModo] = useState("");
  const [modalConfirmacion, setModalConfirmacion] = useState<Boolean>(false);

  const abrirModalAgregar = () => {
    setModalEdicion(true);
    setModo("agregar");
  };

  const abrirModalEdicion = () => {
    setModalEdicion(true);
    setModo("editar");
  };

  const cerrarModal = () => {
    setModalEdicion(false);
  };

  const abrirModalConfirmacion = () => {
    setModalConfirmacion(true);
  };

  const confirmarEliminar = () => {
    setModalConfirmacion(false);
    // Aquí iría la función que elimina la dirección
  };

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title text-center">Direcciones</h1>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <i className="material-icons text-white ubicacion">location_on</i>
            Dirección 1
          </div>
          <div className="d-flex align-items-center mr">
            <button
              className="btn ml-2 btn-color"
              style={{ margin: "10px" }}
              onClick={abrirModalEdicion}
            >
              <i className="material-icons text-white">edit</i>
            </button>
            <button className="btn ml-2 btn-color" onClick={abrirModalConfirmacion}>
              <i className="material-icons text-white">delete</i>
            </button>
          </div>
        </div>
      </div>
      <div className="card-footer text-center">
        <button className="btn btn-color text-white" onClick={abrirModalAgregar}>
          Agregar dirección
        </button>
      </div>
      {modalEdicion && <ModalEdicionDireccion cerrarModal={cerrarModal} modo={modo}/>}
      {modalConfirmacion && <ModalConfirmacion cerrarModal={() => setModalConfirmacion(false)} confirmarEliminar={confirmarEliminar}/>}
    </div>
  );
};

