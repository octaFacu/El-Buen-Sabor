import { FC, useState } from "react";
import "./genericContainer.css"


interface GenericContainerProps {

}

const GenericContainer: FC<GenericContainerProps> = () => {

    const [valorTotal, setValorTotal] = useState<number>(0);

    const handlerConfirmOrder = () => {
        console.log("Confirmar pedido");

    }

    return (
        <div className="container my-2 pb-1 mb-3 " style={{ background: "#f99132", borderRadius: "25px" }}>
            <div className="titleAndAddButton">
                <div className="text-center py-4 px-3 d-flex">

                    <h1 className="title-cart">Mi carrito</h1>
                </div>
            </div>

            <div>
                {/* contendio del pedido */}
            </div>

            <div className="my-4 d-flex justify-content-evenly align-items-center">
                <div className="mx-5"></div>

                <button className="px-4 btn btn-add-order d-flex" onClick={handlerConfirmOrder}>
                    Confirmar pedido
                </button>

                <div className="container-valor-total">
                    <span className="txt-Total">Total: </span>
                    <span className="txt-valorTotal">${valorTotal}</span>
                </div>

            </div>


        </div >
    );
}

export default GenericContainer;