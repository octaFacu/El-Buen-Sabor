import { SelectHTMLAttributes, useContext, useEffect, useRef, useState } from "react"
import "../../css/ventanaModal.css"
import { Rubro } from "../compIngrediente/Rubro";
import Producto from "../../context/interfaces/Producto";
import { useUnidadContext } from "../../context/GlobalContext";
import { ProductoService } from "../../services/ProductoService";
import { IngredientesService } from "../../services/IngredientesService";
import GrupoBotones from "../genericos/GrupoBotones";
import ModalAgregarIngrediente from "./ModalAgregarIngrediente";
import { CloudinaryService } from "../../services/CloudinaryService";
import IngredienteDeProducto from "../../context/interfaces/IngredienteDeProducto";
import TablaIngredientesMostrar from "./TablaIngredientesMostrar";
import PageLoader from "../pageLoader/PageLoader";


//Interfaz que 
interface State {
    productoSelect: Producto;
    botonManufacturado: boolean;
    ingredientesProducto: IngredienteDeProducto[];
    modalIngr: boolean;
    ingredientesGuardados: boolean;
    idCategoria: number;
    llamarGuardado: boolean;
    loaderVisible: boolean;
}

interface ProdFormProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: (estado: boolean) => void,
    datos?: Producto,
    categorias: Rubro[],
    cambio: boolean,
    setCambios: (cambio: boolean) => void
}

const ModalCreacionProd: React.FC<ProdFormProps> = ({ estado, cambiarEstado, categorias, datos, cambio, setCambios }) => {
    const { rol } = useUnidadContext();
    const categoriaRef = useRef<HTMLSelectElement>(null);

    //Servicios
    const productoService = new ProductoService();
    const ingredienteService = new IngredientesService();

    //ESTADOS PARA EL COMPONENTE
    const [state, setState] = useState<State>({
        productoSelect: new Producto(), //Producto a modificar y guardar
        botonManufacturado: datos?.receta == "" ? false : true, //Estado de manufacturacion del producto
        ingredientesProducto: [], //Ingredientes pertenecientes al producto
        modalIngr: false, //Estado de vista de modal incluir ingrediente
        ingredientesGuardados: true, //Bandera para guardado de ingredientes
        idCategoria: 0, //Id de la categoria de producto
        llamarGuardado: false,
        loaderVisible: false
    });


    //CASTEAR INGREDIENTES A SOLO ATRIBUTOS ID
    const castIngredientesIds = (ingredientes: any[]): IngredienteDeProducto[] => {
        const castIngredientes: IngredienteDeProducto[] = [];

        for (let i = 0; i < ingredientes.length; i++) {

            console.log(JSON.stringify(ingredientes[i]));


            let nuevoIng: IngredienteDeProducto = new IngredienteDeProducto();

            nuevoIng.cantidad = ingredientes[i].cantidad;
            nuevoIng.id = ingredientes[i].id;
            nuevoIng.idIngrediente = ingredientes[i].ingrediente.id;
            nuevoIng.idProducto = ingredientes[i].producto.id;
            nuevoIng.idMedida = ingredientes[i].unidadmedida.id;


            castIngredientes.push(nuevoIng);
        }

        return (castIngredientes);
    }


    /*
          SETTERS
    */
    const setBotonManufacturado = async (value: boolean) => {
        await setState((prevState) => ({
            ...prevState,
            botonManufacturado: value,
        }));
    };

    const setLoaderVisible = async (value: boolean) => {
        await setState((prevState) => ({
            ...prevState,
            loaderVisible: value,
        }));
    };

    const setIngredientesProducto = async (value: IngredienteDeProducto[]) => {
        await setState((prevState) => ({
            ...prevState,
            ingredientesProducto: value
        }));
    }

    const handleChangeProducto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            productoSelect: {
                ...prevState.productoSelect,
                [name]: value,
            },
        }));
    };

    const handleChangeProductoArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            productoSelect: {
                ...prevState.productoSelect,
                [name]: value,
            },
        }));
    };


    const cambiarModalIngr = (value: boolean) => {

        setState((prevState) => ({
            ...prevState,
            modalIngr: value
        }));

        if(!value && categoriaRef.current != null && state.idCategoria != null) { 
            console.log("Se esta volviendo a setear la categopria: "+state.idCategoria);
            categoriaRef.current.value = state.idCategoria.toString();
        }
    };

    useEffect(() => {
        if(state.idCategoria != null){

        if (categoriaRef.current) {
          categoriaRef.current.value = state.idCategoria.toString();
        }
    }
      }, [state.idCategoria]);

      useEffect(() => {
        if(!state.modalIngr){
            if(categoriaRef.current != null && state.idCategoria != null) { 
                console.log("Se esta volviendo a setear la categopria: "+state.idCategoria);
                categoriaRef.current.value = state.idCategoria.toString();
            }
        }
      }, [state.modalIngr])
    //----------------------------------------------------------------

    const handleFormSubmit = async () => {
        if (categoriaRef.current) {
            var value = categoriaRef.current.value;
            //setModalIngr(true);
            await setState((prevState) => ({
                ...prevState,
                idCategoria: parseInt(value),
                modalIngr: true
            }));
            return false; 
        };
    }

        //GUARDAR LOS PRODUCTOS

        const crearProducto = async () => {

            state.ingredientesProducto.forEach((ing) => {
                console.log(JSON.stringify(ing)); // This will log each number in the array
            });

            await productoService.crearEntity(state.productoSelect, state.ingredientesProducto, rol);
            setIngredientesProducto([]);
            await setState((prevState) => ({
                ...prevState,
                ingredientesGuardados: false
            }));


        }

        const updateProducto = async () => {

            await productoService.actualizarEntity(state.productoSelect, state.ingredientesProducto, rol);
            setIngredientesProducto([]);
            await setState((prevState) => ({
                ...prevState,
                ingredientesGuardados: false
            }));

        }

        //------------------------------------------------------------------


        //Cargar los datos que pueden venir para edicion
        const cargarDatos = async () => {
            if (datos !== undefined) {

                await setState((prevState) => ({
                    ...prevState,
                    productoSelect: { ...datos! },
                    botonManufacturado: datos!.receta == "" ? false : true,
                    idCategoria: datos!.categoriaProducto.id!,
                    ingredientesGuardados: false
                }));

                if (!state.ingredientesGuardados) {
                    setIngredientesProducto([]);

                }
            }
        }

        const getIngredientes = async () => {
            // await setIngredientesProducto([]);
            await productoService.getIngredientes(state.productoSelect.id!, rol).then((data) => {
                console.log(JSON.stringify(data));
                setIngredientesProducto(castIngredientesIds(data));
            })
            await setState((prevState) => ({
                ...prevState,
                ingredientesGuardados: true
            }));

        }


        const handleSaving = async () => {
            setLoaderVisible(true);
            console.log("Entre al guardado...");
            if (state.productoSelect.denominacion.trim() !== '' && state.productoSelect.descripcion.trim() !== '' && state.productoSelect.precioTotal > 0 && (file != undefined || (state.productoSelect.id != undefined || state.productoSelect.id != 0))) {

                if ((state.productoSelect.receta !== undefined && state.productoSelect.receta.trim() !== '') || state.botonManufacturado == false) {
                    if (file != undefined) {
                        await handleFileUpload();
                    }

                    var costo: number = 0;
                    if(state.botonManufacturado == true){
                        costo = await calcularCosto();
                    }else{
                        costo = state.productoSelect.costoTotal;
                    }

                    var categoria = await categoriaCambio(state.idCategoria);

                    if (categoria != undefined) {

                        // Use Promise.all to wait for both costo and categoria to resolve
                        await Promise.all([
                            setState((prevState) => ({
                                ...prevState,
                                productoSelect: {
                                    ...prevState.productoSelect,
                                    costoTotal: costo,
                                    categoriaProducto: categoria!,
                                    esManufacturado: state.botonManufacturado
                                },
                                llamarGuardado: true
                            })),
                        ]);
                    }else{
                        setLoaderVisible(false);
                    }
                }else{
                    setLoaderVisible(false);
                }


            }else{
                setLoaderVisible(false);
            }
            

        };

        const callSave = async () => {

            if (state.productoSelect.id !== 0 && state.productoSelect.id !== null) {

                updateProducto();
                setIngredientesProducto([]);

                setState((prevState) => ({
                    ...prevState,
                    llamarGuardado: false
                }))
                setLoaderVisible(false);
                cambiarEstado(!estado);
                setCambios(true);

                if(state.botonManufacturado === false) { 
                    window.location.reload();
                }

            } else {
                crearProducto();
                setIngredientesProducto([]);

                setState((prevState) => ({
                    ...prevState,
                    llamarGuardado: false
                }))
                setLoaderVisible(false);
                cambiarEstado(!estado);
                setCambios(true);
                
                if(state.botonManufacturado === false) { 
                    window.location.reload();
                }

            }


        };


        const handleFileUpload = async () => {

            if (file) {
                try {
                    const urlImagen = await cloudinaryService.uploadImage(file);
                    console.log(urlImagen);
                    if (urlImagen) {
                        setState((prevState) => ({
                            ...prevState,
                            productoSelect: {
                                ...prevState.productoSelect,
                                imagen: urlImagen,
                            },
                        }));
                    }
                } catch (error) {
                    console.error("Error uploading image:", error);
                    // Handle the error as needed
                } finally {
                    setFile(null); // Reset the file after upload, regardless of success or failure
                }
            }
        };

        //Parte de cloudinary
        const cloudinaryService = new CloudinaryService();

        const [file, setFile] = useState<File | null>(null);

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files && e.target.files[0];
            if (selectedFile) {
                setFile(selectedFile);
            }
        };

        //Seteo de costos
        const calcularCosto = async () => {
            var costo = 0;

            // Use Promise.all to wait for all asynchronous calls to complete
            await Promise.all(
                state.ingredientesProducto.map(async (ing) => {

                    const costoIngrediente = await ingredienteService.getCosto(ing, rol);
                    costo += costoIngrediente;

                })
            );
            console.log("COSTO: " + JSON.stringify(costo));
            return costo;
        };

        const handleCancelling = () => {

            setIngredientesProducto([]);
            cambiarEstado(!estado);
            setState((prevState) => ({
                ...prevState,
                ingredientesGuardados: false
            }));
            datos = new Producto();
        }


        //------------------ CAMBIO DE CATEGORIA -----------------
        const categoriaCambio = (id: number) => {

            const selectedCategory = categorias.find((cat) => cat.id === id);
            console.log(JSON.stringify(selectedCategory));
            return selectedCategory;

        }

        const handleCategoriaCambio = async (e: React.ChangeEvent<HTMLSelectElement>) => {

            setState((prevState) => ({
                ...prevState,
                idCategoria: parseInt(e.target.value)
            }));

        }


        useEffect(() => {
            if (estado) {
                cargarDatos();
            }

        }, [datos, estado]);

        useEffect(() => {
            if (!state.ingredientesGuardados) {

                getIngredientes();
            }
        }, [state.productoSelect]);

        useEffect(() => {
            if (state.llamarGuardado) {
                callSave();
            }
        }, [state.llamarGuardado]);



        //si las categorias aun no han cargado...
        if (categorias === undefined || categorias.length === 0) {
            return (
                <>
                    {estado &&
                        <div>
                            <div className="overlay">
                                <div className="container my-5 contenedorModal containermain">
                                    <div className="center-align">

                                        <h1>¡DEBE CREAR CATEGORIAS PRIMERO!</h1>

                                    </div>
                                </div>
                            </div>
                        </div>}
                </>
            )
        }

        return (
            <div>
                <ModalAgregarIngrediente estado={state.modalIngr}
                    cambiarEstado={cambiarModalIngr} ingredientesList={state.ingredientesProducto}
                    setIngredientesList={setIngredientesProducto} cambiarEstadoFormProd={cambiarEstado} />
                    {state.loaderVisible && <PageLoader></PageLoader>}
                {estado && !state.modalIngr &&


                    <div className="overlay">
                        <div className="container my-5 contenedorModal modaloverflow modal-dialog-scrollable" style={{ borderRadius: "25px", backgroundColor: "#f99132", color: "white", maxWidth: "50%" }}>
                            <div className="childmodaloverflow center-align pe-4 ps-4" style={{ alignContent: "center", overflowY: 'auto', maxHeight: '650px' }}>
                                <form className="text-center d-flex flex-column align-items-center" onSubmit={(e) => {
                                    e.preventDefault()

                                }}>
                                    {state.productoSelect.id != undefined && state.productoSelect.id != 0 ? <h3 className="mb-3 ps-1 pe-1 pt-2 pb-2 rounded" style={{ textAlign: "center", backgroundColor: "#864e1b", minWidth: "100%" }}> Editar Producto</h3>
                                        : <h3 className="mb-3 ps-1 pe-1 pt-2 pb-2 rounded" style={{ textAlign: "center", backgroundColor: "#864e1b", minWidth: "100%" }}> Nuevo Producto</h3>}

                                    <div className="container d-flex justify-content-around">

                                        <div className="mb-3" style={{ maxWidth: "50%" }}>
                                            <label htmlFor="nombre" className="form-label">Nombre</label>
                                            <input className="form-input form-control" type="text" id="nombre" name="denominacion" max-length="255" required value={state.productoSelect.denominacion} onChange={handleChangeProducto} />
                                        </div>
                                    </div>
                                    <div className="container d-flex justify-content-around">
                                        <div className="d-flex">
                                            <div className="mb-3">
                                                <label htmlFor="costoTotal" className="form-label">Costo Total</label>
                                                <input type="number" min="0" className="form-control me-2 form-input" id="costoTotal" name="costoTotal" required value={state.productoSelect.costoTotal.toString()} onChange={handleChangeProducto} />
                                            </div>
                                            { !state.botonManufacturado &&

                                                <div className="mb-3">
                                                <label htmlFor="stock" className="form-label">Stock</label>
                                                <input type="number" min="0" className="form-control me-2 form-input" id="stock" name="stock" required value={state.productoSelect.stock ?? 0} onChange={handleChangeProducto} />
                                                </div>                  
                                            }
                                            <div className="mb-3">
                                                <label htmlFor="precioTotal" className="form-label">Precio Total</label>
                                                <input type="number" min="1" className="form-control ms-2 form-input" id="precioTotal" name="precioTotal" required value={state.productoSelect.precioTotal} onChange={handleChangeProducto} />
                                            </div>
                                            
                                        </div>
                                    </div>


                                    <div className="container d-flex justify-content-around">
                                        <div className="text-center d-flex">
                                            <div className="mb-3">
                                                <label htmlFor="stockMinimo" className="form-label">Descripcion</label>
                                                <textarea className="form-control me-2 form-input" id="descripcion" name="descripcion" max-length="255" required value={state.productoSelect.descripcion.toString()} onChange={handleChangeProductoArea} />
                                            </div>

                                            {state.botonManufacturado && (state.productoSelect.esManufacturado) &&
                                                <div className="mb-3">
                                                    <label htmlFor="stockMaximo" className="form-label">Receta</label>
                                                    <textarea className="form-control ms-2 form-input" id="receta" name="receta" max-length="1000" required value={state.productoSelect.receta?.toString()} onChange={handleChangeProductoArea} />

                                                </div>
                                            }

                                        </div>
                                    </div>


                                    <div className="container d-flex justify-content-around">
                                        <div className="text-center d-flex">

                                            {state.botonManufacturado && (state.productoSelect.esManufacturado) &&
                                                <div className="mb-3">

                                                    <label htmlFor="tiempo-preparacion" className="form-label">Tiempo de Preparacion</label>
                                                    <input id="settime" type="time" step="1" className="form-control form-input" name="tiempoCocina" value={state.productoSelect.tiempoCocina} onChange={handleChangeProducto} />
                                                </div>
                                            }
                                            <div className="mb-3">
                                                <label htmlFor="stockMaximo" className="form-label">¿Es manufacturado?</label>
                                                <GrupoBotones estado={state.botonManufacturado}
                                                    cambiarEstado={setBotonManufacturado}></GrupoBotones>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="stockActual" className="form-label">Inserte su Imagen</label>
                                                <input
                                                    type="file"
                                                    id="imagen"
                                                    name="imagen"
                                                    className="form-control"
                                                    onChange={handleFileChange}
                                                    multiple={false}
                                                />
                                                {/* Si la imagen del producto seleccionado existe, muestro la imagen */}
                                                {datos?.imagen &&
                                                    <img className="mt-1" style={{ maxWidth: "150px" }} src={datos.imagen} alt="img" />
                                                }

                                            </div>

                                        </div>
                                    </div>





                                    <div className="container d-flex justify-content-around">
                                        <div className="mb-4 d-flex justify-content-center" style={{ maxWidth: "70%", maxHeight: "40%", alignItems: "center" }}>
                                            <label htmlFor="rubro" className="form-label">Categoria</label>
                                            <select ref={categoriaRef} className="form-select select-style" name="categoriaProducto" onChange={handleCategoriaCambio}>

                                                <option selected value={state.productoSelect.categoriaProducto.id}>{state.productoSelect.categoriaProducto.denominacion}</option>
     
                                                {categorias.map(cat => (
                                                    cat.denominacion !== state.productoSelect.categoriaProducto.denominacion &&
                                                    <option value={cat.id}>{cat.denominacion}</option>
                                                ))}

                                            </select>

                                        </div>
                                    </div>






                                    <div>
                                        <button className="btn btn-danger mx-3" onClick={() => {
                                            handleCancelling();
                                        }}><i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}>highlight_off</i></button>

                                        <button type="submit" className="btn" style={{ backgroundColor: "#864e1b", color: "white" }} onClick={async (event) => {

                                            event.preventDefault();
        
                                            handleSaving();

                                        }
                                        }
                                        > <i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}>check</i></button>
                                    </div>
                                </form>
                                {state.botonManufacturado &&
                                    <div>
                                        {datos == undefined &&
                                            <TablaIngredientesMostrar ingredientesProd={state.ingredientesProducto} setIngredientesProd={setIngredientesProducto} edicion={true} />
                                        }
                                        {
                                            datos != undefined &&
                                            <TablaIngredientesMostrar productoId={state.productoSelect.id!} ingredientesProd={state.ingredientesProducto} setIngredientesProd={setIngredientesProducto} edicion={true} />
                                        }

                                        <div className="container d-flex justify-content-around">
                                            <div className="mt-4 d-flex justify-content-center" style={{ maxWidth: "70%", maxHeight: "40%", alignItems: "center" }}>

                                                <button className="btn btn-success" onClick={() => handleFormSubmit()}>Agregar Ingrediente</button>
                                            </div>

                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }


    export default ModalCreacionProd;