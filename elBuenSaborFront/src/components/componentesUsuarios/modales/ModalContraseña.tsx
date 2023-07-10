import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
interface ModalProps {
  cerrarModal: () => void;
}

const ModalContraseña: React.FC<ModalProps> = ({ cerrarModal }) => {
  
    const { user } = useAuth0();

 /*  const changePassword = () => {
    const url =
      "https://dev-elbuensabor.us.auth0.com/dbconnections/change_password";
    const clientId = "GFBGwZPPuFKMKUsTtrfkwAqG3BJCIe5l";
  
    const data = {
      client_id: clientId,
      email: "test9009@gmail.com",
      connection: "Username-Password-Authentication",
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 */
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title">AUTH0</h5>
            <button type="button" className="close" onClick={cerrarModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <button >Cambiar Contraseña</button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
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
