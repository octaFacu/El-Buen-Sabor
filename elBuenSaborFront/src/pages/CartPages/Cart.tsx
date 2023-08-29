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
    const { isAuthenticated } = useAuth0()

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

                <div className="my-4 d-flex justify-content-evenly align-items-center">
                    <div className="mx-5"></div>

                    {/* Valida si el usuario esta logueado apra ver a que vista mandarlo */}
                    <NavLink
                        className="px-5 py-2 btn btn-add-order d-flex"
                        to={isAuthenticated
                            ? "/checkout" 
                            : "https://dev-elbuensabor.us.auth0.com/u/signup?state=hKFo2SBteUtJVWZocnJsOVllbEIyblNRNEVJcHplbXpmRS11cqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIFpQdGFRTmVkV1hHVEJKaTlkNDh1R1I2R2RsaGxSNm1Vo2NpZNkgR0ZCR3daUFB1RktNS1VzVHRyZmt3QXFHM0JKQ0llNWw"}
                        state={isAuthenticated
                            ? {
                                valorTotal: valorTotal,
                                localStorageValues: localStorageValues
                            }
                            : null
                        }
                    >Continuar</NavLink>

                    <div className="container-valor-total">
                        <span className="txt-Total">Total: </span>
                        <span className="txt-valorTotal">${valorTotal}</span>
                    </div>

                </div>

            </GenericContainer>

        </>
    )

}
