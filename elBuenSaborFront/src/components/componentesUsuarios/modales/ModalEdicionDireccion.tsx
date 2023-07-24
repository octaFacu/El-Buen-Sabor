import React, { useEffect, useState } from "react";
import { ServiceBasicos } from "../../../services/ServiceBasicos";
import { DireccionService } from "../../../services/DireccionService";
import { Direccion } from "../../../context/interfaces/interfaces";

interface ModalProps {
  cerrarModal: () => void;
  modo: string;
  direccion: Direccion;
}

const ModalEdicionDireccion: React.FC<ModalProps> = ({
  cerrarModal,
  modo,
  direccion,
}) => {
  const [direc, setDirec] = useState<Direccion>(direccion);

  const handleSubmit = async () => {
    const servicioDireccion = new DireccionService();
    try {
      if(modo === "editar"){
        await servicioDireccion.updateEntity(direc)
        cerrarModal()
      }else{
        await servicioDireccion.createEntity(direc)
        cerrarModal()
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDirec(direccion);
  },[direccion]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setDirec((prevDireccion) => ({ ...prevDireccion, [id]: value }));
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog d-flex align-items-center justify-content-center modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h3
              className="modal-title text-center text-white bold"
              style={{ textAlign: "center", margin: "0 auto" }}
            >
              {modo === "agregar" ? "Agregar dirección" : "Editar dirección"}
            </h3>
            <button type="button" className="close" onClick={cerrarModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="text-white parrafo bold text-center">Calle:</p>
            <input
              type="text"
              className="form-control text-center text-white"
              id="calle"
              value={direc.calle}
              placeholder="Calle"
              onChange={handleChange}
            />
            <p className="text-white parrafo bold text-center">
              numero de casa:
            </p>
            <input
              type="text"
              className="form-control text-center text-white"
              id="nroCasa"
              placeholder="numero de casa"
              value={direc.nroCasa}
              onChange={handleChange}
            />
            <p className="text-white parrafo bold text-center">piso/depto:</p>
            <input
              type="text"
              className="form-control text-center text-white"
              id="pisoDpto"
              placeholder="piso/depto"
              value={direc.pisoDpto}
              onChange={handleChange}
            />
          </div>
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
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEdicionDireccion;
