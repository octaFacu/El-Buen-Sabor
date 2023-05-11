import React from "react";

interface ModalConfirmacionProps {
  cerrarModal: () => void;
  confirmarEliminar: () => void;
}

const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({ cerrarModal, confirmarEliminar }) => {
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered" style={{width:'30vh'}}>
        <div className="modal-content">
        <div className="modal-header" >
            <h5 className="modal-title">¿Está seguro de que desea eliminar esta dirección?</h5>
            <button className="close" onClick={cerrarModal}>
              <i className="material-icons text-white" >close</i>
            </button>
          </div>
          <div className="modal-footer  justify-content-center text-center">
            <button type="button" className="btn eliminar text-white " onClick={cerrarModal}>
              No
            </button>
            <button type="button" className="btn eliminar text-white " onClick={confirmarEliminar}>
              Sí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
