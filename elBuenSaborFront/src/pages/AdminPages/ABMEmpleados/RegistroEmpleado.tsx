import { useState, useEffect } from "react";
import CardEmpleados from "../../../components/componentesAdminRegistroEmp/CardEmpleados";
import { Usuario } from "../../../context/interfaces/interfaces";
import { AdminService } from "../../../services/AdminService";
import { PageProyeccionHistorialPedido } from "../../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente";
import Paginacion from "../../../components/genericos/Paginacion";
import "../../../css/EmpleadoRegistro.css";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../components/pageLoader/PageLoader";
import { useUnidadContext } from '../../../context/GlobalContext';


export default function RegistroEmpleado() {
  const navigate = useNavigate();
  const [empleados, setEmpleados] =
    useState<PageProyeccionHistorialPedido<Usuario>>();
  const [page, setPage] = useState<number>(0);
  const { rol } = useUnidadContext();

  const traerEmpleados = async (pageNumber: number) => {
    const servicioUsuario = new AdminService();
    setEmpleados(await servicioUsuario.traerEmpleado(pageNumber, 10, rol))
  }


  useEffect(() => {
    traerEmpleados(page);
  }, [page]);

  const actualizarPagina = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const actualizarListaEmpleados = (empleadoModificado: Usuario) => {
    // Actualiza la lista de empleados en el estado
    setEmpleados((prevEmpleados: any) => {
      // Encuentra el empleado modificado y actualiza su estado
      const empleadosActualizados = prevEmpleados.content.map(
        (empleado: any) => {
          if (empleado.id === empleadoModificado.id) {
            return empleadoModificado;
          }
          return empleado;
        }
      );

      // Devuelve una nueva copia del estado con la lista actualizada
      return { ...prevEmpleados, content: empleadosActualizados };
    });
  };

  if (empleados === undefined) {
    return <PageLoader />;
  }
  const volverAtras = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto">
      <div className="card card-EmpleadoReg ancho-card">
        <div className="contenedor-tituloRegEmpleado text-white">
          <h3 className="card-title text-center">Registro Empleado</h3>
        </div>
        <div className="contenido-empleados">
          <div className="d-flex flex-column mb-3">
            {empleados.content.length > 0 ? (
              empleados.content.map((empleado) => (
                <CardEmpleados
                  empleado={empleado}
                  key={empleado.id}
                  actualizarEmpleado={actualizarListaEmpleados}
                />
              ))
            ) : (
              <div className="mt-5">
                <h1 className="text-center">
                  No existe ningún empleado registrado.
                </h1>
              </div>
            )}
          </div>
          <div className="boton-atras-container">
            <button className="btnAtras ms-3" onClick={volverAtras}>
              Atras
            </button>
          </div>
        </div>
        <Paginacion
          page={empleados.pageable.pageNumber}
          setPage={actualizarPagina}
          totalPages={empleados.totalPages}
          size={empleados.size}
        />
      </div>
    </div>
  );
}  