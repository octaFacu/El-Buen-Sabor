import { useState, useEffect } from "react";
import "./modal.css";
import { pedidoService } from "../../../services/PedidoService";
import PdfFactura from "../../PDF/PdfFactura";
import PedidoHasProductos from "../../../context/interfaces/PedidoHasProductos";
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";
import { useNavigate } from "react-router-dom";

interface Props {
  mostrarModal: boolean;
  cerrarModal: () => void;
  idPedido: number;
}

const ModalPedido: React.FC<Props> = ({
  mostrarModal,
  cerrarModal,
  idPedido,
}) => {
  const [pedidoUsuario, setPedidoUsuario] = useState<PedidoHasProductos[]>([]);

  if (!mostrarModal) {
    return null;
  }

  const servicioPedio = new pedidoService();
  const navigate = useNavigate();

  const traerPedidos = async () => {
    const productosPedido = await servicioPedio.getProductosByPedido(idPedido);
    setPedidoUsuario(productosPedido)
  };

  useEffect(() => {
    traerPedidos();
  }, []);

  const handleAddToCart = () => {

    const carrito: ProductoParaPedido[] = [];

    localStorage.setItem("carritoArreglo", "");

    //Cargo la variable "carrito" con los prodcutos y sus cantidades para poder subirla al carrito del lolcalStorage
    pedidoUsuario.forEach((elemento: PedidoHasProductos, index: number) => {

      const pedidoParaCarrito: ProductoParaPedido = {
        cantidad: elemento.cantidad,
        producto: elemento.producto
      };

      carrito.push(pedidoParaCarrito)

    });

    localStorage.setItem("carritoArreglo", JSON.stringify(carrito));
    cerrarModal();
    navigate('/carrito');

  }

  return (
    <div className="modal modal-custom modal-overlay" style={{ display: "block" }}>
      <div className="modal-dialog d-flex align-items-center justify-content-center modal-dialog-centered ">
        <div className="modal-content card-modalPedido">
          <div className="modal-body text-center">
            <h2 className="texto-blanco">Tu Pedido</h2>
            <button type="button" className="close centrado" onClick={cerrarModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {pedidoUsuario?.map((pedidoHasProd, index) => {
              return (
                <div
                  key={index}
                  className="pedido-item"
                >
                  <div className="col-3">
                    <div>
                      <img src={pedidoHasProd.producto.imagen} alt={pedidoHasProd.producto.denominacion} className="imagenes-pedidos-usuario" />
                    </div>
                  </div>
                  <div className="col-6 centrado-denominacion">
                    <span className="texto-blanco">{pedidoHasProd.producto.denominacion}</span>
                  </div>
                  <div className="col-3 contenedor-derecho">
                    <div className="texto-blanco">
                      <span className="separador">x{pedidoHasProd.cantidad}</span>
                    </div>
                    <div className="pedido-item-derecho texto-blanco">
                      <span className="precio">${pedidoHasProd.producto.precioTotal * pedidoHasProd.cantidad}</span>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="d-flex justify-content-center texto-blanco mt-2">
              <p>Total actualizado ${ }</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn modal-pedido" onClick={cerrarModal}>
              Cerrar
            </button>
            <PdfFactura pedido_Id={idPedido} />
            <button className="btn modal-pedido" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPedido;