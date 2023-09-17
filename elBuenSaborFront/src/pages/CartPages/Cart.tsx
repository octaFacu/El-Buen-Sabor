import React, { useEffect, useState } from 'react'
import GenericContainer from '../../components/cart/genericContainer/GenericContainer'
import ReturnButton from '../../components/cart/returnButton/ReturnButton'
import { ProductoParaPedido } from '../../context/interfaces/interfaces';
import CartListCard from '../../components/cart/cartListCard/CartListCard';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export const Cart = () => {

    const [valorTotal, setValorTotal] = useState<number>(0);
    const [localStorageValues, setLocalStorageValues] = useState<ProductoParaPedido[]>([]);

    //Para saber si el usuario esta logueado
    const { isAuthenticated, loginWithRedirect } = useAuth0()

    //Actualiza las cantidades de un producto en las cartas
    const actualizarCantidad = (indice: number, nuevaCantidad: number) => {
        setLocalStorageValues((prevProductos) => {
            const nuevosProductos = [...prevProductos];
            nuevosProductos[indice].cantidad = nuevaCantidad;
            return nuevosProductos;
        });
    };

    //Elimina un produco del carrito
    const eliminarProducto = (indice: number) => {
        setLocalStorageValues((prevProductos) => {
            const productos = [...prevProductos];
            const nuevosProductos = productos.filter((el, index) => index !== indice);
            return nuevosProductos;
        });
    };

    //Calcular el valor total del pedido
    const handleValorTotalChange = (nuevoValor: number, esSuma: boolean) => {
        if (esSuma) {
            setValorTotal(prevContador => prevContador + nuevoValor);
        } else {
            setValorTotal(prevContador => prevContador - nuevoValor);
        }

    };

    useEffect(() => {
        const storedCartItems = localStorage.getItem('carritoArreglo');
        if (storedCartItems) {
            setLocalStorageValues(JSON.parse(storedCartItems));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('carritoArreglo', JSON.stringify(localStorageValues));
        // console.log(localStorageValues);
    }, [localStorageValues])


    return (
        <>

            <ReturnButton />

            <GenericContainer
                title='Mi carrito'
            >

                <CartListCard
                    localStorageValues={localStorageValues}
                    actualizarCantidad={actualizarCantidad}
                    eliminarProducto={eliminarProducto}
                    handleValorTotalChange={handleValorTotalChange}
                />

                {localStorageValues.length > 0
                    &&
                    <div className="my-4 d-flex justify-content-evenly align-items-center">
                        <div className="mx-5"></div>

                        {/* Valida si el usuario esta logueado para ver a que vista mandarlo */}
                        {isAuthenticated
                            ? <NavLink
                                className="px-5 py-2 btn btn-add-order d-flex"
                                to={"/checkout"}
                                state={{
                                    valorTotal: valorTotal,
                                    localStorageValues: localStorageValues
                                }}
                            >Continuar</NavLink>
                            : <NavLink
                                className="px-5 py-2 btn btn-add-order d-flex"
                                onClick={() => loginWithRedirect({
                                    authorizationParams: {
                                        screen_hint: 'signup',
                                        redirect_uri: 'http://localhost:5173/informacionAdicional',
                                    },
                                })}
                                to={"#"}
                            >Continuar</NavLink>
                        }

                        <div className="container-valor-total">
                            <span className="txt-Total">Total: </span>
                            <span className="txt-valorTotal">${valorTotal}</span>
                        </div>

                    </div>
                }


            </GenericContainer>

        </>
    )

}
