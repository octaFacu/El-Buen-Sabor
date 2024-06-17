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
import { useUnidadContext } from "../../context/GlobalContext";
import { ProductoParaPedido } from "../../context/interfaces/interfaces";

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
  const { rol } = useUnidadContext();

  const traerFavorito = async (pageNumber: number) => {
    await servicioCliente.getClienteByUsuarioId(usuario.id, rol);

    const prod = await servicioFavorito.getFavoritosDeUsuario(
      await servicioCliente.getIdCliente(usuario.id, rol),
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

  const handleOnClick = async (productoId: number) => {
    try {
      const producto = await servicioFavorito.traerProductoFavorito(productoId);

      const storedCartItems = localStorage.getItem("carritoArreglo");
      let LocalStorageValues: ProductoParaPedido[] = [];

      if (storedCartItems) {
        LocalStorageValues = JSON.parse(storedCartItems);
      }

      if (producto != undefined && producto != null) {
        let seteado = false;

        // Verificar si el producto ya está en el carrito
        LocalStorageValues = LocalStorageValues.map((item) => {
          if (item.producto.id === producto.id) {
            seteado = true;
            if (item.cantidad < 10) {
              return { ...item, cantidad: item.cantidad + 1 };
            }
          }
          return item;
        });
        if (!seteado) {
          LocalStorageValues.push({ producto, cantidad: 1 });
        }
        console.log(producto);
      }
    } catch (err) {
      console.error("Error: " + err);
    }
  };

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
                            servicioFavorito.deleteEntity(producto.id, rol)
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
                          onClick={() => {
                            handleOnClick(producto.idProducto);
                          }}
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
