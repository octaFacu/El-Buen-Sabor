import { useState, useEffect } from "react";
import "./modal.css";
import { ProyeccionProductosPedido } from "../../../context/interfaces/Proyecciones/ProyeccionPedidoUsuario";
import { pedidoService } from "../../../services/PedidoService";
import PdfFactura from "../../PDF/PdfFactura";



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
  const [pedidoUsuario, setPedidoUsuario] =
    useState<ProyeccionProductosPedido[]>();

  if (!mostrarModal) {
    return null;
  }

  const servicioPedio = new pedidoService();

  const traerPedidos = async () => {
    setPedidoUsuario(await servicioPedio.getProductosPedido(idPedido));
  };
  const total = pedidoUsuario?.reduce(
    (precio, actual) => precio + actual.precio_total,
    0
  );

  useEffect(() => {
    
    traerPedidos();
  }, []);

  return (
    <div className="modal modal-custom modal-overlay"  style={{ display: "block" }}>
      <div className="modal-dialog d-flex align-items-center justify-content-center modal-dialog-centered ">
        <div className="modal-content card-modalPedido">
          <div className="modal-body text-center">
            <h2 className="texto-blanco">Tu Pedido</h2>
            <button type="button" className="close centrado" onClick={cerrarModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {pedidoUsuario?.map((pedido) => {
              return(
              <div
                key={pedido.pedido_id + pedido.producto_id}
                className="pedido-item"
              >
                <div className="col-3">
                  <div>
                    <img src={`/img/${pedido.imagen}`}  alt={pedido.denominacion} className="imagenes-pedidos-usuario"/>
                  </div>
                </div>
                <div className="col-6 centrado-denominacion">
                  <span className="texto-blanco">{pedido.denominacion}</span>
                </div>
                <div className="col-3 contenedor-derecho">
                  <div className="texto-blanco">
                    <span className="separador">x{pedido.cantidad}</span>
                  </div>
                  <div className="pedido-item-derecho texto-blanco">
                    <span className="precio">${pedido.precio_total}</span>
                  </div>
                </div>
              </div>
              )
        })}
            <div className="d-flex justify-content-center texto-blanco mt-2">
              <p>Total ${total}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn modal-pedido" onClick={cerrarModal}>
              Cerrar
            </button>
            <PdfFactura pedido_Id={idPedido}/>
            <button className="btn modal-pedido" onClick={cerrarModal}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPedido;
