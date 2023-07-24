import { useEffect, useState } from "react";
import ModalEdicionDireccion from "./modales/ModalEdicionDireccion";
import ModalConfirmacion from "./modales/ModalConfirmacion";
import { DireccionService } from "../../services/DireccionService";
import "../../css/direccionesUsuario.css";
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { Usuario, Direccion } from "../../context/interfaces/interfaces";

interface Props {
  usuario: Usuario;
}

export default function MisDireccionesComponents({ usuario }: Props) {
  const [modalEdicion, setModalEdicion] = useState<boolean>(false);
  const [modo, setModo] = useState("");
  const [modalConfirmacion, setModalConfirmacion] = useState<boolean>(false);
  const [direcciones, setDirecciones] = useState<Direccion[]>();
  const [direccion, setDireccion] = useState<Direccion>({
    idDireccion: 0,
    calle: "",
    nroCasa: 0,
    pisoDpto: "",
    usuario: usuario,
  });
  const servicioDireccion = new ServiceBasicos("direccion");

  const abrirModalAgregar = () => {
    setModalEdicion(true);
    setDireccion({
      idDireccion: 0,
      calle: "",
      nroCasa: 0,
      pisoDpto: "",
      usuario: usuario,
    });
    setModo("agregar");
  };

  const traerDirecciones = async () => {
    const servicioDireccion = new DireccionService();
    try {
      const direcciones = await servicioDireccion.getDireccionesByusuarioId(
        usuario.id
      );
      setDirecciones(direcciones);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    traerDirecciones();
  }, [direcciones]);

  const abrirModalEdicion = (id: number) => {
    setModalEdicion(true);
    traerDireccionParaEditar(id);
    setModo("editar");
  };

  const traerDireccionParaEditar = async (id: number) => {
    try {
      setDireccion(await servicioDireccion.getOne(id));
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarModal = () => {
    setModalEdicion(false);
  };

  const abrirModalConfirmacion = (id: number) => {
    setModalConfirmacion(true);
    setDireccion({ ...direccion, idDireccion: id });
  };

  const confirmarEliminar = async (id: number) => {
    setModalConfirmacion(false);
    try {
      await servicioDireccion.deleteEntity(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title text-center">Direcciones</h1>
        {direcciones?.map((dir, index) => (
          <div
            className={`direccion-container d-flex align-items-center justify-content-between ${
              index !== direcciones.length - 1 ? "border-bottom pb-2 mb-2" : ""
            }`}
            key={dir.idDireccion}
          >
            <div className="d-flex align-items-center">
              <i className="material-icons text-white ubicacion mr-2">
                location_on
              </i>
            </div>
            <div className="direccion-texto">
              {dir.pisoDpto === "" ? (
                <p>{dir.calle + " " + dir.nroCasa}</p>
              ) : dir.nroCasa === null ? (
                <p>{dir.calle + " " + dir.pisoDpto}</p>
              ) : (
                <p>
                  {dir.calle + " " + dir.nroCasa + " piso: " + dir.pisoDpto}
                </p>
              )}
            </div>
            <div>
              <button
                className="btn btn-color ml-2 btn-margen"
                onClick={() => abrirModalEdicion(dir.idDireccion)}
              >
                <i className="material-icons text-white">edit</i>
              </button>
              <button
                className="btn btn-color"
                onClick={() => abrirModalConfirmacion(dir.idDireccion)}
              >
                <i className="material-icons text-white">delete</i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="card-footer text-center">
        <button
          className="btn btn-color text-white"
          onClick={abrirModalAgregar}
        >
          Agregar dirección
        </button>
      </div>
      {modalEdicion && (
        <ModalEdicionDireccion
          cerrarModal={cerrarModal}
          modo={modo}
          direccion={direccion}
        />
      )}
      {modalConfirmacion && (
        <ModalConfirmacion
          mostrarModal={modalConfirmacion}
          cerrarModal={() => setModalConfirmacion(false)}
          confirmar={() => confirmarEliminar(direccion.idDireccion)}
        />
      )}
    </div>
  );
}
