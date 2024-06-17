import { useState } from 'react'
import { Usuario } from '../../context/interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import EmpleadoModal from './EmpleadoModal';
import '../../css/EmpleadoRegistro.css'
import { ServiceBasicos } from '../../services/ServiceBasicos';
import { useUnidadContext } from '../../context/GlobalContext';

interface Props {
  empleado: Usuario;
  actualizarEmpleado: (us: Usuario) => void
}

export default function CardEmpleados({ empleado, actualizarEmpleado }: Props) {


  const servicio = new ServiceBasicos("usuario");

  const [showModal, setShowModal] = useState(false);

  const mostrarModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);

  }
  const { rol } = useUnidadContext();

  const habilitar_Deshabilitar = () => {
    // Realiza la modificación, por ejemplo, deshabilita o habilita al empleado
    servicio.softDelete(empleado.id,rol);
  
    // Notifica al componente padre sobre la modificación
    actualizarEmpleado({ ...empleado, activo: !empleado.activo });
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

        </div>
      </div>
      {showModal && (
        <EmpleadoModal show={showModal} onHide={closeModal} empleado={empleado}   actualizarEmpleado={actualizarEmpleado}/>
      )}
    </div>
  )
}
