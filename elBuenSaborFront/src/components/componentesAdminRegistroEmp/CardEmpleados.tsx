import { useState } from 'react'
import { Usuario } from '../../context/interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import EmpleadoModal from './EmpleadoModal';
import '../../css/EmpleadoRegistro.css'
import { ServiceBasicos } from '../../services/ServiceBasicos';
import { useUnidadContext } from '../../context/GlobalContext';
import { ClienteService } from '../../services/ClienteService';
import ModalConfirmacion from "../componentesUsuarios/modales/ModalConfirmacion";

interface Props {
  empleado: Usuario;
  actualizarEmpleado: (us: Usuario) => void
}

export default function CardEmpleados({ empleado, actualizarEmpleado }: Props) {


  const servicio = new ServiceBasicos("usuario");
  const servicioCliente = new ClienteService();


  const [modalConfirmacion, setModalConfirmacion] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const mostrarModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);

  }
  const { rol } = useUnidadContext();


  const confirmarEliminar = async () => {
    setModalConfirmacion(false);
    servicioCliente.deleteClienteByUsuarioId(empleado.id);
    servicio.deleteEntity(empleado.id,rol);
  };

  const abrirModalConfirmacion = () => {
    setModalConfirmacion(true);
  };

  return (
    <div className="card card-cliente">
      <div className="card-body d-inline-flex justify-content-between">
        <p className="card-text  fw-bold">Nombre: {empleado.nombre}</p>
        <p className="card-text fw-bold">Email: {empleado.email}</p>
        <p className="card-text fw-bold">
          Roles: {empleado.nombreRol ? empleado.nombreRol : "Sin rol asignado"}
        </p>
        <div>
          <button className="btn-ModEmpleado text-center" onClick={() => mostrarModal()}>
            Ver
          </button>
          <button
            className={` text-center ms-2 ${empleado.activo ? 'btn-DesactivarEmpleado' : 'btn-habilitado'}`}
            onClick={() => abrirModalConfirmacion()}
          >
           Eliminar
          </button>
        

        </div>
      </div>
      {showModal && (
        <EmpleadoModal show={showModal} onHide={closeModal} empleado={empleado}   actualizarEmpleado={actualizarEmpleado}/>
      )}
       {modalConfirmacion && (
        <ModalConfirmacion
          mostrarModal={modalConfirmacion}
          cerrarModal={() => setModalConfirmacion(false)}
          confirmar={() => confirmarEliminar()}
          recarga={true}
        />
      )}
    </div>
  )
}
