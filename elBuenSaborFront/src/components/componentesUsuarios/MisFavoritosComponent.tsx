import { useEffect, useState } from "react";
import {
  Usuario,
  proyeccionProductoFavorito,
} from "../../context/interfaces/interfaces";
import { FavoritoService } from "../../services/FavoritoService";
import { ClienteService } from "../../services/ClienteService";
import "../../css/favoritos.css";
import { PageProyeccionHistorialPedido } from "../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente";
import Paginacion from "../genericos/Paginacion";

interface Props {
  usuario: Usuario;
}

export default function MisFavoritosComponent({ usuario }: Props) {
  const [productos, setProductos] =
    useState<PageProyeccionHistorialPedido<proyeccionProductoFavorito>>();
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [hoverCartIcon, setHoverCartIcon] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);

  const servicioFavorito = new FavoritoService();
  const servicioCliente = new ClienteService();

  const traerFavorito = async (pageNumber: number) => {
    await servicioCliente.getClienteByUsuarioId(usuario.id);

    const prod = await servicioFavorito.getFavoritosDeUsuario(
      await servicioCliente.getIdCliente(usuario.id),
      5,
      pageNumber
    );
    setProductos(prod);
  };

  const actualizarPagina = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    traerFavorito(page);
  }, [productos]);

  return (
    <div className="container text-center" style={{ marginTop: "3.2rem" }}>
      <h2 className="bold">Mis favoritos</h2>
      <div className="card card-principal-favoritos card-altura scrollable-container-favoritos">
        <div className="card-body">
          {productos?.content?.length === 0 ? (
            <h2 className="text-white">
              Todavía no has ingresado ningún favorito.
            </h2>
          ) : (
            <>
              {productos?.content?.map((producto) => (
                <div key={producto.id} className="mb-4">
                  <div className="card card-favoritos">
                    <div className="card-body SeparacionItems">
                      <div className="imagen contenedor">
                        <img
                          src={producto.imagen}
                          alt={producto.denominacion}
                          className="contenedorIMG"
                        />
                      </div>
                      <div className="denominacion">
                        <p>{producto.denominacion}</p>
                      </div>
                      <div className="iconos">
                        <button
                          onMouseEnter={() => setHoveredProductId(producto.id)}
                          onMouseLeave={() => setHoveredProductId(null)}
                          onClick={() =>
                            servicioFavorito.deleteEntity(producto.id)
                          }
                        >
                          <i className="material-icons iconos">
                            {hoveredProductId === producto.id
                              ? "favorite_border"
                              : "favorite"}
                          </i>
                        </button>
                        <button
                          className="SeparacionEntreIconos"
                          onMouseEnter={() => setHoverCartIcon(producto.id)}
                          onMouseLeave={() => setHoverCartIcon(null)}
                          onClick={() => console.log(producto)}
                        >
                          <i
                            className={`material-icons iconos ${
                              hoverCartIcon === producto.id ? "brillo" : ""
                            }`}
                          >
                            add_shopping_cart
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Paginacion
                page={productos?.pageable.pageNumber}
                setPage={actualizarPagina}
                totalPages={productos?.totalPages}
                size={productos?.size}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
