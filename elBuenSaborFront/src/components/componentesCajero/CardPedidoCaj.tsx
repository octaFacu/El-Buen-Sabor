import { useState } from "react"
import Pedido, { EstadoPedido } from "../../context/models/Pedido"
import './CardPedidoCaj.css'
interface ProdFormProps {

    pedido: Pedido,
    estado: boolean,
    cambiarEstado: any,
    changeEstadoPedido: any

}

const CardPedidoCaja: React.FC<ProdFormProps> = ({ estado, cambiarEstado, pedido, changeEstadoPedido}) => {


    return(
        <div className="container mx-5 me-3 my-3 card-pedidos px-2">
            <div className="">
                <h4 className="text-pedido mt-2">Pedido n{pedido.numeroPedidoDia}</h4>
            </div>
            <hr className="separator-white"></hr>
            <div>
            {/* {rubros.map(rub => (


                    ))} */}
                    <p className="text-pedido">Ingrediente 1</p>
                    <p className="text-pedido">Ingrediente 2</p>
            </div>
            <hr className="separator-white"></hr>
            <select className="dropdown-estado form-select mb-3 me-2 " id="categoria" name="categoria" onChange={e => {changeEstadoPedido(e.target.value, pedido) }}>
                                     <option selected value={JSON.stringify(pedido.estado)}>{pedido.estado}</option>
                                    {Object.values(EstadoPedido)
                                    .filter(state => typeof state === "string")
                                    .map((state, index) => (
                                        pedido.estado !== state && (
                                            <option key={index} value={state}>
                                                {state}
                                            </option>
                                        )
                                    ))}



                                    </select>
                                
        </div>
    )
}
export default CardPedidoCaja;