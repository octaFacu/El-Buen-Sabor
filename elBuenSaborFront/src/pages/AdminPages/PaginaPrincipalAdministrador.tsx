import '../../css/estilosEstadistias.css'
import { useNavigate } from 'react-router-dom';

export default function PaginaPrincipalAdministrador() {
  const navigate = useNavigate();


  const handleClick = (opcion: number) => {
    switch (opcion) {
      case 5:
        navigate("/admin/estadisticas/rankingCliente");
    }
  }

  return (
    <div className="container mx-auto">
      <div className="card card-generica ancho-card">
        <div className="contenedor-tituloEstadistica text-white">
          <h3 className="card-title text-center">Pagina principal administrador</h3>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex flex-column mb-3 btn-separador">
            <button className='btn btn-administrar text-white mb-2 '>Administrar Clientes</button>
            <button className='btn btn-administrar text-white mb-2'>Administrar Empleados</button>
            <button className='btn btn-administrar text-white mb-2'>Gestionar Rubros - Insumos - Productos</button>
          </div>
          <div className="d-flex justify-content-between btn-separador btn-AñadirPadding">
            <button className='btn btn-administrar text-white btn-margenDerecho'>Ver ranking comidas</button>
            <button className='btn btn-administrar text-white btn-margenDerecho' onClick={() => handleClick(5)}>Ver ranking clientes</button>
            <button className='btn btn-administrar text-white'>Generar informe ganancias</button>
          </div>
        </div>
      </div>
    </div>
  );
}