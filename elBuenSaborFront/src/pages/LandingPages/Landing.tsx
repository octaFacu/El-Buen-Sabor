import { useEffect, useState } from 'react'
import ImgLogo from '../../components/Landing/imgLogo/ImgLogo'
import { useUnidadContext } from "../../context/GlobalContext"
import CarruselCategorias from '../../components/Landing/carruselCategorias/CarruselCategorias'
import "../pagesStyles/landing.css"
import { CategoriaProducto, Favorito, ProductoParaPedido } from '../../context/interfaces/interfaces'
import { CategoriaProductoService } from "../../services/CategoriaProductoService";
import { ProductoService } from "../../services/ProductoService";
import ListCard from '../../components/Landing/listCard/ListCard'
import Producto from '../../context/interfaces/Producto';
import PageLoader from '../../components/pageLoader/PageLoader';
import Footer from '../../components/Landing/footer/Footer'
import DetalleProducto from '../../components/Landing/detalleProducto/DetalleProducto'
import ListLoader from '../../components/Landing/listLoader/ListLoader'
import CartNotification from "../../components/Landing/cartNotification/CartNotification"
import { FavoritoService } from '../../services/FavoritoService'
import { useAuth0 } from '@auth0/auth0-react'
import { log } from 'console'
import MasVendidos from '../../components/Landing/masVendidos/MasVendidos'

export const Landing = () => {

  const { rol } = useUnidadContext();
  const categoriaProductoService = new CategoriaProductoService()
  const productoService = new ProductoService()
  const favoritoService = new FavoritoService()

  //PARA MOSTRAR NOTIFICACION DE AÑADIDO AL CARRITO
  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationAddToCart = () => {
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

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
          if (value.producto.id === elemento.producto.id) {
            miArreglo[index].cantidad = elemento.cantidad + value.cantidad
            repetido = true;
          }
        });

        if (!repetido) {
          //Agrego al arreglo el producto con su cantidad
          miArreglo.push(value)
          localStorage.setItem("carritoArreglo", JSON.stringify(miArreglo));
          console.log("Producto agregado al carrito");
        } else {
          //Sobreescrivo la cantidad de un producto repeetido 
          localStorage.setItem("carritoArreglo", JSON.stringify(miArreglo));
          console.log("Producto repetido, se sumo al carrito");
        }

        handleNotificationAddToCart()

      } catch (error) {
        console.error("Error al analizar el arreglo en el Local Storage: ", error);
      }

    } else {
      console.log("El arreglo en el Local Storage está vacío o no existe. Lo voy a crear y ejecutar de nuevo esta funcion");
      localStorage.setItem("carritoArreglo", JSON.stringify([]));
      handleAddToCart(value)
    }
  }
  //----------------------------------

  //PARA BUSQUEDA POR FILTRO
  const { busquedaXNombre, setBusquedaXNombre } = useUnidadContext();
  const [productosPorFiltro, setProductosPorFiltro] = useState<Producto[] | null>([])
  const [totalElements, setTotalElements] = useState<number>(0)

  //Trae los productos paginados por filtro
  const fetchProductosXFiltroPaginado = async () => {
    const data = await productoService.getProductoXFiltroPaginado(busquedaXNombre, undefined, undefined, rol)
    if (data.totalElements) {
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
    const data = await productoService.getProductoXFiltro(busquedaXNombre, rol)
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
  const [catLoader, setCatLoader] = useState<boolean>(true)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaProducto | null>(null)
  const [productosPorCategoria, setProductosPorCategoria] = useState<Producto[]>([])

  //Trae los productos filtrados por categoria
  const fetchProductosXCategoria = async () => {
    const data = await productoService.getProductoXCategoria(categoriaSeleccionada?.id!, rol)
    await setProductosPorCategoria(data);
  }

  //Trae las categorias activas 
  const fetchDataCategorias = async () => {
    const data = await categoriaProductoService.getAllActive(rol);
    await setCategorias(data);
    setCatLoader(false)
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

  //VENTANA MODAL PARA DETALLE PRODUCTO
  const [modalDetalleProducto, setModalDetalleProducto] = useState<boolean>(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>()
  const [favoritos, setFavoritos] = useState<Favorito[]>([])
  const { user } = useAuth0();

  //Traigo los favoritos del cliente si es que esta logueado
  const fetchDataFavoritos = async (usuarioId: string) => {
    const data = await favoritoService.getAllByUsuarioId(usuarioId);
    console.log("Favoritos:");
    console.log(data);
    await setFavoritos(data);
  };

  const agregarFavorito = async (usuarioId: string, producto: Producto) => {
    await favoritoService.saveFavorito(usuarioId, producto);
    await fetchDataFavoritos(usuarioId)
  };

  const quitarFavorito = async (usuarioId: string, productoId: number) => {
    await favoritoService.deleteFavorito(usuarioId, productoId);
    await fetchDataFavoritos(usuarioId)
  };

  useEffect(() => {

    if (user) {
      fetchDataFavoritos(user.userId)
      console.log("Favoritos:");
      console.log(favoritos);
    }

  }, [user])

  //--------------------

  //SCROLL INFINITO
  const [productos, setProductos] = useState<Producto[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Obtención de productos desde la API 
  const fetchProducts = async (filter: number | string): Promise<Producto[]> => {

    try {
      const response = await fetch(`http://localhost:8080/producto/filtroCategoria?filter=${filter}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error, no hay productos para esta categoria")
      return []
    }

  };

  // Cargar los productos iniciales cuando el componente se monte
  useEffect(() => {

    //Esta validacion sirve para cuando muestre la busqueda por categoria, que no se haga la peticion de el scroll infinito
    if (categoriaSeleccionada === null && busquedaXNombre === "") {

      if (pageNumber <= categorias.length) {
        console.log("pageNumber: " + pageNumber);

        setIsLoading(true);
        // fetchProducts(pageNumber).then((data) => {
        fetchProducts(categorias[pageNumber - 1].id!).then((data) => {
          setProductos((arreglosActuales) => [...arreglosActuales, data]);
          setIsLoading(false);

        });
      }
    }

  }, [categorias, pageNumber, categoriaSeleccionada]);

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
  }

  //Loader
  if (catLoader) {
    return <PageLoader />
  }

  if (categorias.length === 0) {
    return (
      <>
        <ImgLogo />

        <div className="container containerMain">

          <div className="container-post-mp py-5 mb-5" style={{ background: "#f99132", borderRadius: "25px" }}>
            <div className="text-center py-4 px-3">
              <h1 className="title-cart">No hay categorias cargadas!</h1>
            </div>
          </div >

        </div>

        <Footer />

      </>
    )
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

          {/* Si busco por categoria */}
          {categoriaSeleccionada &&
            <div>
              <ListCard
                categoria={categoriaSeleccionada.denominacion}
                productos={productosPorCategoria}
                setModalDetalleProducto={setModalDetalleProducto}
                setProductoSeleccionado={setProductoSeleccionado}
                isLoading={isLoading}
                handleAddToCart={handleAddToCart}
              />
            </div>
          }

          {/* Si busco por filtro */}
          {busquedaXNombre &&
            <div>
              <ListCard
                categoria={'"' + busquedaXNombre + '"'}
                productos={productosPorFiltro}
                setModalDetalleProducto={setModalDetalleProducto}
                setProductoSeleccionado={setProductoSeleccionado}
                isLoading={isLoading}
                handleAddToCart={handleAddToCart}
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
          handleAddToCart={handleAddToCart}

          agregarFavorito={agregarFavorito}
          quitarFavorito={quitarFavorito}
          favoritos={favoritos}
        />

        {/* Notificacion de añadido al carrito */}
        <CartNotification
          mensaje={"Producto añadido al carrito!"}
          show={showNotification}
          btnCart={true}
        />

      </>
    )
  }

  return (

    <>
      <ImgLogo />

      <div className="container containerMain">

        <MasVendidos
          rol={rol}
          setModalDetalleProducto={setModalDetalleProducto}
          setProductoSeleccionado={setProductoSeleccionado}
          handleAddToCart={handleAddToCart}
        />

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
              handleAddToCart={handleAddToCart}
            />
          </div>
        ))}

        {/* {isLoading && <ListLoader />} */}

      </div>

      <Footer />

      {/* Modal */}
      <DetalleProducto
        modalDetalleProducto={modalDetalleProducto}
        setModalDetalleProducto={setModalDetalleProducto}
        producto={productoSeleccionado}
        handleAddToCart={handleAddToCart}

        agregarFavorito={agregarFavorito}
        quitarFavorito={quitarFavorito}
        favoritos={favoritos}
      />

      {/* Notificacion de añadido al carrito */}
      <CartNotification
        mensaje={"Producto añadido al carrito!"}
        show={showNotification}
        btnCart={true}
      />

    </>
  )
}
