import { useEffect, useState } from "react"
import Pedido, { EstadoPedido } from "../../context/interfaces/Pedido"
import '../componentesCajero/CardPedidoCaj.css'
import PedidoHasProductos from "../../context/interfaces/PedidoHasProductos"
import { pedidoService } from "../../services/PedidoService"
import ProductoCocinaCard from "./ProductoCocinaCard"
import { useUnidadContext } from "../../context/GlobalContext"
interface ProdFormProps {

    pedido: Pedido,
    estado: boolean,
    changeEstado: any,
    setProducto: any

}

const CardPedidoCocina: React.FC<ProdFormProps> = ({ pedido, estado, changeEstado, setProducto }) => {

    const { rol } = useUnidadContext();
    const servicePedido = new pedidoService();
    const [productos, setProductos] = useState<PedidoHasProductos[]>([]);
    const [editTime, setEditTime] = useState<Boolean>(false);
    const [timeChanging, setTimeChanging] = useState<string>('');

    const handleChangeEstado = () => {
        pedido.estado = "Listo";
        servicePedido.updateEntity(pedido, rol);
        window.location.reload();
    };

    const handleTimeChange = (asc: boolean) => {
        //Añadir o restar 5 minutos
        setTimeChanging(asc ? manipulateTime(5) : manipulateTime(-5));
    };


    const manipulateTime = (minutesChange: number) => {
        const [hours, minutes, seconds] = timeChanging.split(':').map(Number);

        let totalMinutes = hours * 60 + minutes + minutesChange;
        totalMinutes = Math.max(totalMinutes, 0); // Ensure it doesn't go below 0

        const newHours = Math.floor(totalMinutes / 60) % 24;
        const newMinutes = totalMinutes % 60;

        return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const getProductos = async () => {
        //servicePedido.getByEstado(EstadoPedido[estadoDePedidos])
        await setProductos([]);
        await servicePedido.getProductosByPedido(pedido.id!, rol)

            .then(data => {
                setProductos(data)
            })
    }
    const saveTime = async () => {
        pedido.horaEstimada = timeChanging;

        setEditTime(!editTime);

        //enviar un update del pedido con la nueva hora estimada
        servicePedido.updateEntity(pedido, rol);
        setTimeChanging('');

    };

    useEffect(() => {

        getProductos();
    }, [pedido]);

    useEffect(() => { }, [editTime, timeChanging]);

    return ( //mx-5 me-3
        <div className="container my-3 card-pedidos px-2 pt-2 pb-2" style={{ maxWidth: "93%" }}>
            <div className="">
                <h4 className="text-pedido mt-2">Pedido n{pedido.numeroPedidoDia}</h4>
            </div>
            <hr className="separator-white"></hr>
            <div>
                {productos.map(prod => (
                    <div>

                        <ProductoCocinaCard setProducto={setProducto} estado={estado} changeEstado={changeEstado} prod={prod}></ProductoCocinaCard>
                    </div>
                ))}


            </div>
            <hr className="separator-white"></hr>


            {!editTime ?
            <div>
             <div className="d-flex">
                <div className="container text-pedido">{pedido.horaEstimada}hs</div>
                <button className="btn mx-2 btn-sm" style={{ backgroundColor: "#864e1b" }}
                    onClick={
                        () => {
                            setEditTime(!editTime);
                            setTimeChanging(pedido.horaEstimada);
                        }}
                ><i className="material-icons" style={{ fontSize: "20px", cursor: "pointer", color: "white" }}>create</i></button>
            </div>
            <hr className="separator-white"></hr>
            
            <div className="mx-2 mb-3">
                <div className="btn btn-success" onClick={() => handleChangeEstado()}><i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}>check</i></div>
            </div></div>
                :
                <div className="d-flex">
                    <div className="btn" onClick={() => handleTimeChange(false)}>
                        <i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}>arrow_drop_down</i>
                    </div>
                    <div className="container text-pedido">{timeChanging}hs</div>
                    <div className="btn" onClick={() => handleTimeChange(true)}>
                        <i className="material-icons white" style={{ fontSize: "30px", cursor: "pointer" }}>arrow_drop_up</i>
                    </div>

                    <div className="mx-2 mb-3">
                        <div className="btn btn-success" onClick={() => saveTime()}><i className="material-icons" style={{ fontSize: "20px", cursor: "pointer" }}>check</i></div>
                    </div>
                </div>
            }
        </div>
    )
}
export default CardPedidoCocina;

function forceUpdate() {
    throw new Error("Function not implemented.")
}
