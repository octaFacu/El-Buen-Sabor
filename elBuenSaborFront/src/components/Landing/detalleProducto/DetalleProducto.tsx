import { FC, useEffect, useState } from "react";
import Producto from '../../../context/interfaces/Producto';
import "./DetalleProducto.css";
import leftArrow from "../../../assets/left-arrow.png";
import heart from "../../../assets/heart.png";
import filledHeart from "../../../assets/filledHeart.png";
import { Favorito, ProductoParaPedido } from "../../../context/interfaces/interfaces";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface DetalleProductoProps {
    modalDetalleProducto: boolean
    setModalDetalleProducto: (modal: boolean) => void;

    producto: Producto | undefined;

    handleAddToCart: (value: ProductoParaPedido) => void;

    agregarFavorito: (usuarioId: string, producto: Producto) => void;
    quitarFavorito: (usuarioId: string, productoId: number) => void;
    favoritos: Favorito[]
}

const DetalleProducto: FC<DetalleProductoProps> = ({ producto, modalDetalleProducto, setModalDetalleProducto, handleAddToCart, agregarFavorito, quitarFavorito, favoritos }) => {

    const { user, isAuthenticated, loginWithRedirect } = useAuth0()
    const [cant, setCant] = useState<number>(1)
    const [existeFav, setExisteFav] = useState<boolean>(false)

    useEffect(() => {

        if(existeFav){
            setExisteFav(false);
        }

        if (producto) {
            favoritos.map(fav => {
                if (producto.id === fav.producto.id) {
                    setExisteFav(true);
                    console.log("Es favorito");
                }
            })
        }

    }, [producto, favoritos])


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
                                <button className="btn rounded-circle btn-go-back" onClick={() => {
                                    setCant(1)
                                    setModalDetalleProducto(!modalDetalleProducto)
                                }}>
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
                            {
                                isAuthenticated && user
                                    ?
                                    existeFav
                                        ?
                                        <button className="position-absolute top-0 end-0 btn-fav" onClick={() => quitarFavorito(user.userId, producto.id!)}>
                                            <img className="btn-fav-icon" src={filledHeart} alt="." />
                                        </button>
                                        :
                                        <button className="position-absolute top-0 end-0 btn-fav" onClick={() => agregarFavorito(user.userId, producto)}>
                                            <img className="btn-fav-icon" src={heart} alt="." />
                                        </button>
                                    :
                                    <NavLink
                                        className="position-absolute top-0 end-0 btn-fav"
                                        onClick={() => loginWithRedirect({
                                            authorizationParams: {
                                                screen_hint: 'signup',
                                                redirect_uri: 'http://localhost:5173/informacionAdicional',
                                            },
                                        })}
                                        to={"#"}
                                    >
                                        <img className="btn-fav-icon" src={heart} alt="." />
                                    </NavLink>

                            }
                        </div>

                        <p>{producto.descripcion}</p>

                        <div className="d-flex justify-content-between">
                            {/* Lado Izquierdo: Ingredientes */}
                            <div></div>
                            {/* Lado Derecho: Precio */}
                            <div>
                                <p className="productPrice">Precio: ${producto.precioTotal}</p>
                            </div>

                        </div>

                        {/* <div className="d-flex justify-content-center"> */}
                        <div className="d-flex justify-content-evenly ">
                            <div className="bg-cant d-flex align-items-center">
                                <button className="cant-btn-resta bg-cant-btn " disabled={cant === 1} onClick={() => setCant(cant - 1)}>-</button>
                                <span className="px-3">{cant}</span>
                                <button className="bg-cant-btn" onClick={() => setCant(cant + 1)}>+</button>
                            </div>
                            <button className="btn btn-add-cart d-flex align-items-center" onClick={() => {
                                handleAddToCart({ producto: producto, cantidad: cant })
                                setCant(1)
                                setModalDetalleProducto(!modalDetalleProducto)
                            }}>
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