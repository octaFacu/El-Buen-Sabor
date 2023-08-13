import { FC, useState } from "react";
import Producto from '../../../context/interfaces/Producto';
import "./DetalleProducto.css";
import leftArrow from "../../../assets/left-arrow.png";
import heart from "../../../assets/heart.png";
import filledHeart from "../../../assets/filledHeart.png";
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";

interface DetalleProductoProps {
    modalDetalleProducto: boolean
    setModalDetalleProducto: (modal: boolean) => void;

    producto: Producto | undefined;
}

const DetalleProducto: FC<DetalleProductoProps> = ({ producto, modalDetalleProducto, setModalDetalleProducto }) => {

    const [cant, setCant] = useState<number>(1)

    //METODO PROVISORIO PARA BORRAR EL LOCAL STORAGE
    const borrarLocalStorage = () => {
        localStorage.clear()
    }

    //AGREGAR FUNCION PARA AÑADIR AL CARRITO EN EL LOCALSTORAGE
    const handleAddToCart = (value: ProductoParaPedido) => {

        const miArregloString = localStorage.getItem("carritoArreglo");

        if (miArregloString) {

            try {

                let repetido: boolean = false
                // Intentar convertir el arreglo de cadena JSON a un arreglo JavaScript
                const miArreglo = JSON.parse(miArregloString);

                // Recorrer el arreglo y para ver si el producto ya existe en el carrito
                miArreglo.forEach((elemento: ProductoParaPedido, index: number) => {
                    // Validacion para ver si ya existe el producto que se esta por agregar al carrito, para sobreescribirlo y que no se repita en el mismo
                    if (value.id === elemento.id) {
                        miArreglo[index].cantidad = elemento.cantidad + value.cantidad
                        repetido = true;
                    }
                });

                if(!repetido){
                    //Agrego al arreglo el producto con su cantidad
                    miArreglo.push(value)                       
                    localStorage.setItem("carritoArreglo", JSON.stringify(miArreglo));
                    console.log("Producto agregado al carrito");
                }else{
                    //Sobreescrivo la cantidad de un producto repeetido 
                    localStorage.setItem("carritoArreglo", JSON.stringify(miArreglo));
                    console.log("Producto repetido, se sumo al carrito");
                }

            } catch (error) {
                console.error("Error al analizar el arreglo en el Local Storage: ", error);
            }

        }else{
            console.log("El arreglo en el Local Storage está vacío o no existe. Lo voy a crear y ejecutar de nuevo esta funcion");
            localStorage.setItem("carritoArreglo", JSON.stringify([]));
            handleAddToCart(value)
        }
    }

    //AGREGAR FUNCION PARA AGREGAR A FAVORITOS
    const handleAddToFavorites = () => {
        console.log("Agrego a favoritos");


    }


    if (producto === undefined) {
        return (
            <>
                {/* Ventana modal */}
                {modalDetalleProducto && (
                    <div className="overlayModalProduct">
                        <div className="contenedorModalProduct">
                            <div>
                                <h1>CARGANDO...</h1>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            {/* Ventana modal */}
            {modalDetalleProducto && (
                <div className="overlayModalProduct">
                    <div className="contenedorModalProduct">

                        <div className="d-flex mb-2 ">

                            <div className="btn-container">
                                <button className="btn rounded-circle btn-go-back" onClick={() => setModalDetalleProducto(!modalDetalleProducto)}>
                                    <img src={leftArrow} alt="Flecha" width="20" height="30" />
                                </button>
                            </div>

                            <div className="product-name">
                                <h2>{producto.denominacion}</h2>
                            </div>

                            <div className="btn-container"></div>

                        </div>

                        <div className="d-flex align-items-center justify-content-center position-relative">
                            <img src={producto.imagen} alt={producto.denominacion} className="img-fluid mb-3 imgModalProduct" />
                            <button className="position-absolute top-0 end-0 btn-fav" onClick={handleAddToFavorites}>
                                {/* AGREGA LOGICA PARA SABER SI EL PRODUCTO ESTA EN FAVORITOS O NO Y AGREGAR IMAGENDE CORAZON */}
                                <img className="btn-fav-icon" src={filledHeart} alt="." />
                            </button>
                        </div>

                        <p>{producto.descripcion}</p>

                        <div className="d-flex justify-content-between">
                            {/* Lado Izquierdo: Ingredientes */}
                            <div>
                                {/* <p>Ingredientes: {producto.ingredientes.join(", ")}</p> */}
                                <p>Ingredientes:</p>
                                <ul>
                                    <li>Queso</li>
                                    <li>Harina</li>
                                    <li>Salsa de tomate</li>
                                    <li>No seeeeeeeeeeeeeeeeee</li>
                                </ul>
                            </div>
                            {/* Lado Derecho: Precio */}
                            <div>
                                <p className="productPrice">Precio: ${producto.precioTotal}</p>
                            </div>

                        </div>

                        {/* <div className="d-flex justify-content-center"> */}
                        <div className="d-flex justify-content-evenly ">
                            <div className="bg-cant">
                                <button className="btn bg-cant-btn " disabled={cant === 1} onClick={() => setCant(cant - 1)}>-</button>
                                <span className="px-3">{cant}</span>
                                <button className="btn bg-cant-btn" onClick={() => setCant(cant + 1)}>+</button>
                            </div>
                            {/* <button className="btn btn-add-cart d-flex" onClick={borrarLocalStorage}> */}
                            <button className="btn btn-add-cart d-flex" onClick={() => handleAddToCart({ id: producto.id!, cantidad: cant })}>
                                Agregar al<i className="material-icons cart-icon" style={{ fontSize: "23px", cursor: "pointer" }}> shopping_cart</i>
                            </button>
                        </div>
                    </div>
                </div >
            )}
        </>
    );
}

export default DetalleProducto;