import React, { useEffect, useState } from 'react'
import GenericContainer from '../../components/cart/genericContainer/GenericContainer'
import ReturnButton from '../../components/cart/returnButton/ReturnButton'
import { ProductoParaPedido, RequestPedido } from '../../context/interfaces/interfaces';
import CartListCard from '../../components/cart/cartListCard/CartListCard';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUnidadContext } from '../../context/GlobalContext';
import { ProductoService } from '../../services/ProductoService';

export const Cart = () => {

    const { rol } = useUnidadContext();
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [localStorageValues, setLocalStorageValues] = useState<ProductoParaPedido[]>([]);
    const [cantidadModificada, setCantidadModificada] = useState<boolean | null>(null);
    const [mostrarModalFalloValidacion, setMostrarModalFalloValidacion] = useState(false);
    const [chequeandoStockDisponible, setChequeandoStockDisponible] = useState<boolean | null>(null)
    const navigate = useNavigate();
    const prodSrv = new ProductoService();

    //Para saber si el usuario esta logueado
    const { isAuthenticated, loginWithRedirect } = useAuth0()

    //Actualiza las cantidades de un producto en las cartas
    const actualizarCantidad = (indice: number, nuevaCantidad: number) => {
        console.log("Actualizo la cantidad")
        if(nuevaCantidad > 0){
            setLocalStorageValues((prevProductos) => {
                const nuevosProductos = [...prevProductos];
                nuevosProductos[indice].cantidad = nuevaCantidad;
                return nuevosProductos;
            });
        }else{
            eliminarProducto(indice);
        }

    };


    const handleNavClick = async(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault(); 
        await ChequearCantidadesProductos();
      };
    

      useEffect(() => {
if(!chequeandoStockDisponible) {
        if(cantidadModificada != null){
            if(cantidadModificada == true){
                //alert("Se cambiaron las cantidades")
                setCantidadModificada(null);
            }else{
                if(isAuthenticated){
                    var state = { valorTotal, localStorageValues }
                    navigate("/checkout", {state});
                    
                }else{
                    
                    // Si no se modificaron los productos
                    loginWithRedirect({
                        authorizationParams: {
                        screen_hint: 'signup',
                        redirect_uri: 'http://localhost/informacionAdicional',
                        },
                    });
                }
                setChequeandoStockDisponible(null);
            }
            setCantidadModificada(null); 

        }
    }
    
      }, [cantidadModificada])

    const ChequearCantidadesProductos = async() => {
        setChequeandoStockDisponible(true); 
        const validationPromises =localStorageValues.map(async (producto, index) => (
            await ValidarCantidad(producto, index)
            
        ));
        await Promise.all(validationPromises);
        console.log("Termine las promesas "+ cantidadModificada)
        setChequeandoStockDisponible(false); 

    };

    useEffect(() => {
        if(chequeandoStockDisponible != null){
            if(!chequeandoStockDisponible){
                if(cantidadModificada == null){
                    setCantidadModificada(false);
                }

                setChequeandoStockDisponible(false);
            }
        }
    }, [chequeandoStockDisponible])

    //01062024 - PF
    const ValidarCantidad = async(producto: ProductoParaPedido, index: number) => {
        console.log("Pasando por el chequeo de producto")
        const cantidadProducto = await prodSrv.TraerStockProducto(producto.producto, rol)

        if(cantidadProducto < producto.cantidad){
            console.log("Paso por la modificacion de la cantidad")
            //Mostrar mensaje de "lo sentimos"
            setCantidadModificada(true);
            setMostrarModalFalloValidacion(true);

            //Modificar la cantidad para que se ajuste a la cantidad que tenemos
            actualizarCantidad(index, cantidadProducto);

            
            console.log("Cantidad TIENE QUE SER VERDADERO "+ cantidadModificada)
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

                            <a
                            className="px-5 py-2 btn btn-add-order d-flex"
                            onClick={(e) => handleNavClick(e)}
                            >
                            Continuar
                            </a>

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
