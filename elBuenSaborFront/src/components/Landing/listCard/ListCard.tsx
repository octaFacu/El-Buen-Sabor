import { FC } from "react";
import "./ListCard.css"
import ProductCard from "../card/ProductCard";
import Producto from "../../../context/interfaces/Producto";
import ListLoader from "../listLoader/ListLoader";
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";

interface ListCardProps {

    categoria: string
    productos: Producto[] | null

    setProductoSeleccionado: (producto: Producto) => void;
    setModalDetalleProducto: (modal: boolean) => void;

    isLoading: boolean

    handleAddToCart: (value: ProductoParaPedido) => void;
}

const ListCard: FC<ListCardProps> = ({ categoria, productos, setModalDetalleProducto, setProductoSeleccionado, isLoading, handleAddToCart }) => {

    if (productos === null || productos.length === 0) {
        
        return (
            <div className="container-cat" style={{ marginTop: "3%" }}>
                <div className="centerTitle">

                    <hr style={{ marginRight: "2%", marginLeft: "2%" }}></hr>
                    <div className="mt-3" style={{ textAlign: "center" }}><h3 style={{ color: "#864e1b" }}>{categoria}</h3></div>
                    <hr style={{ marginRight: "2%", marginLeft: "2%" }}></hr>
                </div>

                <div className="d-flex justify-content-center p-5 m-5">
                    <h1>No hay resultados para {categoria.toLowerCase()}</h1>

                </div>
            </div>
        );
    }

    return (

        <div className="container-cat" style={{ marginTop: "3%" }}>

            <div className="centerTitle">
                <hr className="hr-title mx-3"></hr>
                <div className="mt-3 title-section">
                    <h3 className="title-section" style={{ color: "#864e1b" }}>{categoria}</h3>
                </div>
                <hr className="hr-title mx-3"></hr>
            </div>

            <div className="row rowEdit">
                {productos.map((producto, index) => (
                    <ProductCard
                        key={index}
                        producto={producto}
                        setProductoSeleccionado={setProductoSeleccionado}
                        setModalDetalleProducto={setModalDetalleProducto}
                        handleAddToCart={handleAddToCart}
                    />
                ))}

            </div>

        </div>

    );
}

export default ListCard;