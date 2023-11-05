import '../../css/estilosEstadistias.css'
import { useNavigate } from 'react-router-dom';

export default function PaginaPrincipalAdministrador() {
  const navigate = useNavigate();


  const handleClick = (opcion: number) => {
    switch (opcion) {
      case 2: 
      navigate('/Admin/Administrar/Empleados')
      break;
      case 3: 
        navigate('/admin/estadisticas/InformeGanancias')
        break;
      case 4:
        navigate('/admin/estadisticas/RankingProducto')
        break;
      case 5:
        navigate("/admin/estadisticas/rankingCliente");
        break;
    }
  }

  return (
    <div className="container mx-auto">
      <div className="card card-generica ancho-card">
        <div className="contenedor-tituloEstadistica text-white">
          <h3 className="card-title text-center">Pagina principal administrador</h3>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex flex-column mb-4 btn-separador">
          
            <button className='btn btn-administrar text-white mb-2' onClick={()=> handleClick(2)}>Administrar Empleados</button>
            <button className='btn btn-administrar text-white  mb-2' onClick={()=> handleClick(3)}>ver informe ganancias</button>
            <button className='btn btn-administrar text-white mb-2'>Gestionar Rubros - Insumos - Productos</button>
          </div>
          <div className="d-flex justify-content-between btn-separador btn-AñadirPadding">
            <button className='btn btn-administrar btn-administrar-tam text-white btn-margenDerecho' onClick={()=> handleClick(4)}>Ver ranking comidas</button>
            <button className='btn btn-administrar btn-administrar-tam text-white btn-margenDerecho' onClick={() => handleClick(5)}>Ver ranking clientes</button>
          </div>
        </div>
      </div>
    </div>
  );
}