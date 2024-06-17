import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../components/componentesUsuarios/modales/modal.css";
interface ModalProps {
  cerrarModal: () => void;
}

const ModalFalloValidacionStock: React.FC<ModalProps> = ({ cerrarModal }) => {


  return (
    <div className="modal modal-overlay" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content modal-confirmarCambios">
                <div className="modal-header"></div>
                <div className="modal-body text-white text-center">
                    <img src="public\img\cara-triste-dibujada-a-mano.png" alt="" style={{ width: "100px", height: "100px" }} className="mx-auto" />
                    <h5>¡Lo sentimos! Debimos ajustar sus cantidades a nuestra disponibilidad actual. ¡Gracias!</h5>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn text-white eliminar"
                        onClick={cerrarModal}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
);
};
export default ModalFalloValidacionStock;
