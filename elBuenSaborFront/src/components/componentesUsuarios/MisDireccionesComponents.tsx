import { useEffect, useState } from "react";
import ModalEdicionDireccion from "./modales/ModalEdicionDireccion";
import ModalConfirmacion from "./modales/ModalConfirmacion";
import { DireccionService } from "../../services/DireccionService";
import "../../css/direccionesUsuario.css";
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { Usuario, Direccion } from "../../context/interfaces/interfaces";
import { useUnidadContext } from "../../context/GlobalContext";

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
    activo: true
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
      activo: true
    });
    setModo("agregar");
  };
  
  const { rol } = useUnidadContext();

  const traerDirecciones = async () => {
    const servicioDireccion = new DireccionService();
    try {
      const direcciones = await servicioDireccion.getDireccionesByusuarioId(
        usuario.id, rol
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
      setDireccion(await servicioDireccion.getOne(id, rol));
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
      await servicioDireccion.softDelete(id, rol);
    } catch (error) {
      console.log(error);
    }
  };

  const direccionesActivas = direcciones?.filter((dir) => dir.activo);
  
  return (
    <div className="card card-direcciones mt-6">
      <div className="card-body scrollable-container">
      <div className="card-header">
        <h1 className="card-title text-center">Direcciones</h1>
      </div>        {direccionesActivas?.length === 0 ? (
          <h1 className="text-center">No ha ingresado ninguna dirección</h1>
        ) : (
          direccionesActivas?.map((dir, index) => (
            <div
              className={`direccion-container d-flex align-items-center justify-content-between ${
                index !== direccionesActivas.length - 1 ? "border-bottom pb-2 mb-2" : ""
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
              <div className="contenedor-cel">
                <button
                  className="btn btn-color-direccion ml-2 btn-margen"
                  onClick={() => abrirModalEdicion(dir.idDireccion)}
                >
                  <i className="material-icons text-white">edit</i>
                </button>
                <button
                  className="btn btn-color-direccion  btn-margen"
                  onClick={() => abrirModalConfirmacion(dir.idDireccion)}
                >
                  <i className="material-icons text-white">delete</i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="card-footer text-center">
        <button
          className="btn btn-color-direccion text-white"
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
          recarga={false}
        />
      )}
    </div>
  );
      }  