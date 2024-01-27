import { FC, useEffect, useState } from "react";
import { ProductoService } from "../../../services/ProductoService";
import Producto from "../../../context/interfaces/Producto";
import ProductCard from "../card/ProductCard";
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";
import "./MasVendidos.css"

interface MasVendidosProps {
    rol: string

    setProductoSeleccionado: (producto: Producto) => void;
    setModalDetalleProducto: (modal: boolean) => void;
    handleAddToCart: (value: ProductoParaPedido) => void;
}

const MasVendidos: FC<MasVendidosProps> = ({ rol, setModalDetalleProducto, setProductoSeleccionado, handleAddToCart }) => {

    const productoService = new ProductoService()

    const [productosMasVendidos, setProductosMasVendidos] = useState<Producto[]>([])

    const fetchProductosMasVendidos = async () => {
        console.log("Pido mas vendidos");
        const data = await productoService.getMasVendidos(rol)
        await setProductosMasVendidos(data);
    }

    useEffect(() => {
        fetchProductosMasVendidos()
    }, [])

    return (

        <>
            <div className="mt-4 centerTitle">
                <hr className="hr-title mx-3"></hr>
                <div className="title-section">
                    <h3 style={{ color: "#864e1b" }}>¡MAS VENDIDOS!</h3>
                </div>
                <hr className="hr-title mx-3" ></hr>
            </div>

            <div className="container-mas-vendidos mb-4" style={{ marginTop: "3%" }}>
                <div className="d-flex justify-content-center p-3">
                    <div className="row rowEdit">
                        {productosMasVendidos.map((prod, index) => (
                            <ProductCard
                                key={index}
                                producto={prod}
                                setProductoSeleccionado={setProductoSeleccionado}
                                setModalDetalleProducto={setModalDetalleProducto}
                                handleAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* <hr className="hr-title mx-3"></hr> */}

        </>
    );
}

export default MasVendidos;
