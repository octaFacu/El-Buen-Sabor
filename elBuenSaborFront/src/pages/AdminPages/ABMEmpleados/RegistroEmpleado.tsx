import {useState, useEffect} from 'react'

import CardEmpleados from '../../../components/componentesAdminRegistroEmp/CardEmpleados'
import { Usuario } from '../../../context/interfaces/interfaces';
import { AdminService } from '../../../services/AdminService';

export default function RegistroEmpleado() {


  const [empleados, setEmpleados] = useState<Usuario[]>();

  const traerEmpleados =  async ()=>{
    const servicioUsuario = new AdminService();
    setEmpleados(await servicioUsuario.traerEmpleado())
  }

  useEffect(()=>{
    traerEmpleados();
  },[])

  if (empleados === undefined) {
    return <div>Cargando...</div>;
}


  return (
    <div className="container mx-auto">
    <div className="card card-generica ancho-card">
      <div className="contenedor-tituloEstadistica text-white">
        <h3 className="card-title text-center">Registro Empleado</h3>
      </div>
      <div className="d-flex flex-column mb-3">
      {empleados.map((empleado)=>(
          <CardEmpleados empleado={empleado} />
      ))} 
      </div>
    </div>
  </div>
  )
}
