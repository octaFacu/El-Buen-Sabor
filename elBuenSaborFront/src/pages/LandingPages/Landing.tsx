import React, { useEffect, useState } from 'react'
import ImgLogo from '../../components/Landing/ImgLogo'
import CarruselCategorias from '../../components/Landing/carruselCategorias/CarruselCategorias'

import { CategoriaProducto } from '../../context/interfaces/interfaces'
import { CategoriaProductoService } from "../../services/CategoriaProductoService";
import ListCard from '../../components/Landing/listCard/ListCard'
import Producto from '../../context/interfaces/Producto';

export const Landing = () => {

  const categoriaProductoService = new CategoriaProductoService();

  //Para carrusel de categorias
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaProducto>()

  useEffect(() => {

    //Traigo las categorias
    categoriaProductoService.getAllBasic()
      .then(data => {
        setCategorias(data)
        console.log(categorias);
      })

  }, []);

  //--------------------

  //scroll infinito
  const [productos, setProductos] = useState<Producto[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMoreCategories, setHasMoreCategories] = useState<boolean>(true);

  // Obtención de productos desde una API 
  const fetchProducts = async (filter: number | string): Promise<Producto[]> => {
    // Hacer una llamada a la API para obtener los productos de la página solicitada
    const response = await fetch(`http://localhost:8080/producto/filtroCategoria?filter=${filter}`);
    const data = await response.json();
    return data;
  };

  // Cargar los productos iniciales cuando el componente se monte
  useEffect(() => {

    // if (pageNumber <= categorias.length+1) {

    setIsLoading(true);
    fetchProducts(pageNumber).then((data) => {
      setProductos((arreglosActuales) => [...arreglosActuales, data]);
      // setProducts([data]);
      
      setIsLoading(false);
      if (data.length === 0) {
        setHasMoreCategories(false);
      }
    });

    // }

  }, [pageNumber]);

  // Función para cargar más productos cuando el usuario scrollee hacia abajo
  const handleScroll = () => {

    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {

      if (!isLoading && hasMoreCategories) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        // if (pageNumber <= categorias.length) {

        //   setIsLoading(true);
        //   fetchProducts(pageNumber + 1).then((data) => {
        //     // setProductos((prevProducts) => [...prevProducts, data]);
        //     setPageNumber((prevPageNumber) => prevPageNumber + 1);
        //     setIsLoading(false);
        //   });
        // }

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
    return <div style={{ textAlign: "center" }}>
      Loading...
    </div>
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
            <h1>{pageNumber}</h1>
            <h1>{index}</h1>
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
