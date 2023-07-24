import { useEffect, useState } from "react";
import {
  Usuario,
  proyeccionProductoFavorito,
} from "../../context/interfaces/interfaces";
import { FavoritoService } from "../../services/FavoritoService";
import { ClienteService } from "../../services/ClienteService";
import "../../css/favoritos.css";

interface Props {
  usuario: Usuario;
}

export default function MisFavoritosComponent({ usuario }: Props) {
  const [productos, setProductos] = useState<proyeccionProductoFavorito[]>();
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [hoverCartIcon,setHoverCartIcon] = useState<number | null>(null);
  
  const servicioFavorito = new FavoritoService();
  const servicioCliente = new ClienteService();

  const traerFavorito = async () => {
     const prod = await servicioFavorito.getFavoritosDeUsuario(
        await servicioCliente.getIdCliente(usuario.id)
      );
      setProductos(prod);
    
  };

  useEffect(() => {
    traerFavorito();
  }, [productos]);

  return (
    <div className="text-center" style={{ marginTop: "6rem" }}>
      <h2 className="bold">Mis favoritos</h2>
      <div className="card-container">
        {productos?.map((producto) => (
          <div key={producto.id} className="card espacioEntreCards">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="img-flex">
                  <img
                    src={`img/${producto.imagen}`}
                    alt={producto.denominacion}
                  />
                </div>
                <div className="denominacion-flex">
                  <p>{producto.denominacion}</p>
                </div>
                <button
                  onMouseEnter={() => setHoveredProductId(producto.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  onClick={() => servicioFavorito.deleteEntity(producto.id)}
                >
                  <i className="material-icons mx-2 iconos">
                    {hoveredProductId === producto.id
                      ? "favorite_border"
                      : "favorite"}
                  </i>
                </button>
                <button
                  onMouseEnter={() => setHoverCartIcon(producto.id)}
                  onMouseLeave={() => setHoverCartIcon(null)}
                  onClick={() => console.log(productos)}
                >
                  <i
                    className={`material-icons mx-2 iconos ${
                      hoverCartIcon === producto.id ? "brillo" : ""
                    }`}
                  >
                    add_shopping_cart
                  </i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
