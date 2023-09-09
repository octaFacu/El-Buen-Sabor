import { rankingProductos } from '../../../context/interfaces/Proyecciones/ProyeccionProductoRanking'
import "../../../css/estilosRankingProductos.css"

interface Props {
  productos: rankingProductos
}

export default function RankingProductoComponent({ productos }: Props) {
  return (
    <div className="card-Ranking-Producto">
      <div className="d-flex align-items-center card-body-productos justify-content-between">
        <img src={`/img/${productos.imagen}`} className="mr-3 imagenes-ranking-productos" />
        <p className="card-text prueba">{productos.denominacion}</p>
        <p className="card-text ml-auto separador-producto"> Cantidad Vendida: {productos.cantidad}</p>
      </div>
    </div>
  );
}

