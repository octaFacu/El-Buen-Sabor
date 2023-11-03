import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./modal.css";
interface ModalProps {
  cerrarModal: () => void;
}

const ModalContraseña: React.FC<ModalProps> = ({ cerrarModal }) => {
  const { user } = useAuth0();
  const [envio, setEnvio] = useState<boolean>(false);

  const cambioContraseña = () => {
    const url =
      "https://dev-elbuensabor.us.auth0.com/dbconnections/change_password";
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID! as string;

    const data = {
      client_id: clientId,
      email: user?.email,
      connection: "Username-Password-Authentication",
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.text();
        setEnvio(true);
        setTimeout(() => {
          cerrarModal();
        }, 2500);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal modal-overlay" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-confirmarCambios">
          <div className="modal-header">
            <h5 className="modal-title text-white">Cambiar contraseña</h5>
          </div>
          <div className="contedorBotonesContraseña">
            {!envio ? (
              <button
                className="btn text-white enviar"
                onClick={cambioContraseña}
              >
                Enviar mail para cambio de contraseña
              </button>
            ) : (
              <div className="text-white">
                Revise su mail para cambiar la contraseña
              </div>
            )}
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
export default ModalContraseña;
