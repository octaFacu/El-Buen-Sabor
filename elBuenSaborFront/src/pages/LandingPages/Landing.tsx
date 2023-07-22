import React, { useEffect, useState } from 'react'
import ImgLogo from '../../components/Landing/ImgLogo'
import { useUnidadContext } from "../../context/GlobalContext"
import CarruselCategorias from '../../components/Landing/carruselCategorias/CarruselCategorias'

import { CategoriaProducto } from '../../context/interfaces/interfaces'
import { CategoriaProductoService } from "../../services/CategoriaProductoService";
import ListCard from '../../components/Landing/listCard/ListCard'
import Producto from '../../context/interfaces/Producto';
import PageLoader from '../../components/pageLoader/PageLoader';

export const Landing = () => {

  //Para carrusel de categorias
  // const { categorias } = useUnidadContext();
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaProducto>()
  const [decremento, setDecremento] = useState<number>(1)

  const categoriaProductoService = new CategoriaProductoService()

  const fetchDataCategorias = async () => {
    const data = await categoriaProductoService.getAllBasic();
    await setCategorias(data);
  };

  useEffect(() => {
    fetchDataCategorias()
  })

  //--------------------

  //scroll infinito
  const [productos, setProductos] = useState<Producto[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Obtención de productos desde una API 
  const fetchProducts = async (filter: number | string): Promise<Producto[]> => {
    // Hacer una llamada a la API para obtener los productos de la página solicitada
    const response = await fetch(`http://localhost:8080/producto/filtroCategoria?filter=${filter}`);
    const data = await response.json();
    return data;
  };

  // Cargar los productos iniciales cuando el componente se monte
  useEffect(() => {

    if (pageNumber <= categorias.length + decremento) {
      setDecremento(0);

      setIsLoading(true);
      fetchProducts(pageNumber).then((data) => {
        setProductos((arreglosActuales) => [...arreglosActuales, data]);
        // setProducts([data]);
        setIsLoading(false);

      });
    }

  }, [pageNumber]);

  // Función para cargar más productos cuando el usuario scrollee hacia abajo
  const handleScroll = () => {
    // document.documentElement.scrollHeight = Altura total del documento (incluyendo el contenido no visible)
    // window.innerHeight = Altura del área visible del navegador
    // window.scrollY = Posición actual del scroll vertical
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {

      if (!isLoading) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }
  };

  // Agregar el evento de scroll al montar el componente
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //-------------------


  if (categorias.length === 0) {
    return <PageLoader />
  }

  return (

    <>
      {/* <ImgLogo></ImgLogo> */}

      <div className="container containerMain">

        <CarruselCategorias
          categorias={categorias}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />

        {productos.map((productList, index) => (
          <div key={index}>
            {/* <h1>{pageNumber}</h1> */}
            {/* <h1>{index}</h1> */}
            <ListCard
              categoria={categorias[index].denominacion}
              productos={productList}
            />
          </div>
        ))}

        {isLoading && <h1>Cargando más productos...</h1>}

      </div>

    </>
  )
}
