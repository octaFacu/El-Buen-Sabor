import React, { useEffect, useState } from 'react'
import GenericContainer from '../../components/cart/genericContainer/GenericContainer'
import ReturnButton from '../../components/cart/returnButton/ReturnButton'
import { ProductoParaPedido, RequestPedido } from '../../context/interfaces/interfaces';
import CartListCard from '../../components/cart/cartListCard/CartListCard';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUnidadContext } from '../../context/GlobalContext';
import { ProductoService } from '../../services/ProductoService';
import Producto from '../../context/interfaces/Producto';


export const Cart = () => {

    const { rol } = useUnidadContext();
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [localStorageValues, setLocalStorageValues] = useState<ProductoParaPedido[]>([]);
    const [cantidadModificada, setCantidadModificada] = useState(false);
    const [mostrarModalFalloValidacion, setMostrarModalFalloValidacion] = useState(false);
    const navigate = useNavigate();
    const prodSrv = new ProductoService();

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


    const handleNavClick = async(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string, state?: any) => {
        await ChequearCantidadesProductos();
        if (cantidadModificada) {
          e.preventDefault(); 
          //Mostrar popup de que se modifico
          
        } else {
            navigate(path, { state });// Si no se modificaron los productos
        }
      };
    
      const handleUnauthenticatedNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ChequearCantidadesProductos();
        if (cantidadModificada) {
          e.preventDefault(); 

          //Mostrar popup de que se modifico
        } else {
          // Si no se modificaron los productos
          loginWithRedirect({
            authorizationParams: {
              screen_hint: 'signup',
              redirect_uri: 'http://localhost/informacionAdicional',
            },
          });
        }
      };




    const ChequearCantidadesProductos = async() => {
        {localStorageValues.map((producto, index) => (
            ValidarCantidad(producto, index)
                     
        ))};
    
    };

    //01062024 - PF
    const ValidarCantidad = async(producto: ProductoParaPedido, index: number) => {
        const cantidadProducto: number = await prodSrv.TraerStockProducto(producto.producto, rol)

        if(cantidadProducto < producto.cantidad){

            //Mostrar mensaje de "lo sentimos"
            setMostrarModalFalloValidacion(true);

            //Modificar la cantidad para que se ajuste a la cantidad que tenemos
            actualizarCantidad(index, cantidadProducto);

            setCantidadModificada(true);
        }
    }

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

                {localStorageValues.length > 0
                    &&
                    <div className="my-4 d-flex justify-content-evenly align-items-center">
                        <div className="mx-5"></div>

                        {/* Valida si el usuario esta logueado para ver a que vista mandarlo */}
                        {isAuthenticated
                            ? 
                            <a
                            className="px-5 py-2 btn btn-add-order d-flex"
                            onClick={(e) => handleNavClick(e, "/checkout", { valorTotal, localStorageValues })}
                            >
                            Continuar
                            </a>
                            : <NavLink
                                className="px-5 py-2 btn btn-add-order d-flex"
                                onClick={(e) => {
                                    handleUnauthenticatedNavClick(e);}}
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
