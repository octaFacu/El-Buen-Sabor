import React, { useEffect, useState } from 'react'
import ImgLogo from '../../components/Landing/imgLogo/ImgLogo'
import { useUnidadContext } from "../../context/GlobalContext"
import CarruselCategorias from '../../components/Landing/carruselCategorias/CarruselCategorias'
import "../pagesStyles/landing.css"
import { CategoriaProducto } from '../../context/interfaces/interfaces'
import { CategoriaProductoService } from "../../services/CategoriaProductoService";
import { ProductoService } from "../../services/ProductoService";
import ListCard from '../../components/Landing/listCard/ListCard'
import Producto from '../../context/interfaces/Producto';
import PageLoader from '../../components/pageLoader/PageLoader';
import Footer from '../../components/Landing/footer/Footer'
import DetalleProducto from '../../components/Landing/detalleProducto/DetalleProducto'
import ListLoader from '../../components/Landing/listLoader/ListLoader'

export const Landing = () => {

  const categoriaProductoService = new CategoriaProductoService()
  const productoService = new ProductoService()

  //PARA BUSQUEDA POR FILTRO
  const { busquedaXNombre, setBusquedaXNombre } = useUnidadContext();
  const [productosPorFiltro, setProductosPorFiltro] = useState<Producto[] | null>([])
  const [totalElements, setTotalElements] = useState<number>(0)

  //Trae los productos paginados por filtro
  const fetchProductosXFiltroPaginado = async () => {
    const data = await productoService.getProductoXFiltroPaginado(busquedaXNombre)
    if(data.totalElements){
      setTotalElements(data.totalElements)
    }

    //Si existe la propiedad "error" (solo va a exisitir error si no se encontraron resultados para la busqueda o haya otro error inesperado)
    if (data.error) {
      await setProductosPorFiltro(null);
      console.log(data);
      console.log("ES NULLLLLLLLL");
    } else {
      await setProductosPorFiltro(data.content);
      console.log(data);
      console.log("NO ES NULLLLLLLLL");
    }
  }

  //Trae todos los productos por filtro
  const fetchProductosXFiltro = async () => {
    const data = await productoService.getProductoXFiltro(busquedaXNombre)
    await setProductosPorFiltro(data);
    setTotalElements(0);                                //Para que el boton de "ver mas" desaparezca
  }

  //AGREGAR PAGINACION
  useEffect(() => {

    if (busquedaXNombre != "") {

      if (categoriaSeleccionada) {
        setCategoriaSeleccionada(null)
      }

      setIsLoading(true);
      fetchProductosXFiltroPaginado();
      setPageNumber(5)                            //Cambio el valor para que cuando vuelva al inicio se reendericen los productos 
      setIsLoading(false);
    }

  }, [busquedaXNombre])
  //------------------------------

  //PARA CARRUSEL DE CATEGORIAS
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaProducto | null>(null)
  const [productosPorCategoria, setProductosPorCategoria] = useState<Producto[]>([])
  const [decremento, setDecremento] = useState<number>(1)

  //Trae los productos filtrados por categoria
  const fetchProductosXCategoria = async () => {
    const data = await productoService.getProductoXCategoria(categoriaSeleccionada?.id!)
    await setProductosPorCategoria(data);
  }

  //Trae las categorias activas 
  const fetchDataCategorias = async () => {
    const data = await categoriaProductoService.getAllActive();
    await setCategorias(data);
  };

  useEffect(() => {

    if (categoriaSeleccionada != null) {

      if (busquedaXNombre) {
        setBusquedaXNombre("")
      }

      fetchProductosXCategoria()
    }


  }, [categoriaSeleccionada])

  useEffect(() => {
    fetchDataCategorias()
  }, [])

  //--------------------

  //Ventana modal para detalle producto
  const [modalDetalleProducto, setModalDetalleProducto] = useState<boolean>(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>()

  useEffect(() => {
    console.log("cambio estado de modal");

  }, [modalDetalleProducto])

  //--------------------

  //SCROLL INFINITO
  const [productos, setProductos] = useState<Producto[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Obtención de productos desde la API 
  const fetchProducts = async (filter: number | string): Promise<Producto[]> => {

    const response = await fetch(`http://localhost:8080/producto/filtroCategoria?filter=${filter}`);
    const data = await response.json();
    return data;
  };

  // Cargar los productos iniciales cuando el componente se monte
  useEffect(() => {

    //Esta validacion sirve para cuando muestre la busqueda por categoria, que no se haga la peticion del el scroll infinito
    if (categoriaSeleccionada === null && busquedaXNombre === "") {

      if (pageNumber <= categorias.length + decremento) {
        setDecremento(0);

        setIsLoading(true);
        fetchProducts(pageNumber).then((data) => {
          setProductos((arreglosActuales) => [...arreglosActuales, data]);
          setIsLoading(false);

        });
      }
    }

  }, [pageNumber, categoriaSeleccionada]);

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

  const recetLanding = () => {
    setBusquedaXNombre("")
    setCategoriaSeleccionada(null)
    setProductos([])
    setPageNumber(1)
    setDecremento(1)
  }

  //Loader
  if (categorias.length === 0) {
    return <PageLoader />
  }

  if (categoriaSeleccionada || busquedaXNombre) {
    return (
      <>
        <div className="container containerMain">

          <div className='d-flex justify-content-center'>
            <button className='btn-landing' onClick={() => {
              recetLanding()
            }}>Volver al inicio</button>
          </div>


          <CarruselCategorias
            categorias={categorias}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
          />

          {/* Si busco por categoria */}
          {categoriaSeleccionada &&
            <div>
              <ListCard
                categoria={categoriaSeleccionada.denominacion}
                productos={productosPorCategoria}
                setModalDetalleProducto={setModalDetalleProducto}
                setProductoSeleccionado={setProductoSeleccionado}
                isLoading={isLoading}
              />
            </div>
          }

          {/* Si busco por filtro */}
          {busquedaXNombre &&
            <div>
              <ListCard
                categoria={"Resultados para: " + busquedaXNombre}
                productos={productosPorFiltro}
                setModalDetalleProducto={setModalDetalleProducto}
                setProductoSeleccionado={setProductoSeleccionado}
                isLoading={isLoading}
              />
            </div>
          }

          {totalElements > 6 &&
            <div className='d-flex justify-content-center'>
              <button className='btn-landing' onClick={fetchProductosXFiltro}>Ver mas</button>
            </div>

          }

        </div>

        <Footer />

        {/* Modal */}
        <DetalleProducto
          modalDetalleProducto={modalDetalleProducto}
          setModalDetalleProducto={setModalDetalleProducto}
          producto={productoSeleccionado}
        />
      </>
    )
  }

  return (

    <>
      <ImgLogo/>

      <div className="container containerMain">

        <CarruselCategorias
          categorias={categorias}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />

        {productos.map((productList, index) => (
          <div key={index}>
            <ListCard
              categoria={categorias[index].denominacion}
              productos={productList}
              setModalDetalleProducto={setModalDetalleProducto}
              setProductoSeleccionado={setProductoSeleccionado}
              isLoading={isLoading}
            />
          </div>
        ))}

        {isLoading && <ListLoader />}

      </div>

      <Footer />

      {/* Modal */}
      <DetalleProducto
        modalDetalleProducto={modalDetalleProducto}
        setModalDetalleProducto={setModalDetalleProducto}
        producto={productoSeleccionado}
      />

    </>
  )
}
