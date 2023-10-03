import {useState} from 'react'
import { Usuario } from '../../context/interfaces/interfaces';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import EmpleadoModal from './EmpleadoModal';

interface Props {
    empleado: Usuario;
   
  }

export default function CardEmpleados({empleado}: Props) {

  const navigate = useNavigate();
  const { user} = useAuth0();


  const [showModal, setShowModal] = useState(false);

  const prueba = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }


  return (
    <div className="card card-cliente">
    <div className="card-body d-inline-flex justify-content-between">
      <p className="card-text">Nombre: {empleado.nombre}</p>
      <p className="card-text">Email: {empleado.email}</p>
      <p className="card-text">Roles: {user?.rol.length == 1 ? user?.rol[0] : `${user?.rol[0]} +`}</p>
      <div>
      <button className="btn-historial text-center" onClick={()=>prueba()}>
        Modificar Rol
      </button>
      <button  className="btn btn-danger text-center ms-2">X</button>
      </div>
    </div>
    {showModal && (
      <EmpleadoModal show={showModal} onHide={closeModal} />
      )}
  </div>
  )
}
