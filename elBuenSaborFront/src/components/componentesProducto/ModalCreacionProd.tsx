import { useContext, useEffect, useState } from "react"
import "../../css/ventanaModal.css"
import { Rubro } from "../compIngrediente/Rubro";
import { GlobalContext } from "../../context/GlobalContext";
import { ProductoService } from "../../services/ProductoService";
import Producto from "../../context/interfaces/Producto";
import GrupoBotones from "../genericos/GrupoBotones";
import IngredienteDeProducto from "../../context/interfaces/IngredienteDeProducto";
import ModalAgregarIngrediente from "./ModalAgregarIngrediente";
import TablaIngredientesMostrar from "./TablaIngredientesMostrar";


interface ProdFormProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: (estado: boolean) => void,

    datos?: Producto,
    //setDatos: any,
    ingredientesParam?: IngredienteDeProducto[],

    categorias: Rubro[];
}

const ModalCreacionProd: React.FC<ProdFormProps> = ({ estado, cambiarEstado, categorias, datos, ingredientesParam }) => {

    const productoService = new ProductoService();
    // const serviceBasicos = new ServiceBasicos("unidadmedida");
  

    let Productonuevo: Producto = new Producto();
    const [modalIngr, setModalIngr] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [categoriaElegida, setCategoriaElegida] = useState<String>();
    const [ingredientesProducto, setIngredientesProducto] = useState<IngredienteDeProducto[]>([]);

    const [productoSelect, setProductoSelect] = useState<Producto>( new Producto());
    const [botonManufacturado, setBotonManufacturado] = useState<boolean>(true);
    
    /*const { categoria } = useContext(GlobalContext);*/

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        Productonuevo.denominacion =(event.target.value)

        setProductoSelect({ ...productoSelect, denominacion: (event.target.value) });
    }

    useEffect(() => {
        if(datos !== undefined){
            setProductoSelect(datos!);
            
            //setIngredientesProducto(ingredientesParam!);
            getIngredientes();
            setBotonManufacturado(productoSelect.esManufacturado);
        }
        
    }, [datos])

    const getIngredientes = async() => {
        await productoService.getIngredientes(productoSelect.id!).then((data) => setIngredientesProducto(castIngredientesIds(data)));
        
    }


    //CASTEAR INGREDIENTES A SOLO ATRIBUTOS ID
    const castIngredientesIds = (ingredientes: any[]): IngredienteDeProducto[] =>{
        const castIngredientes: IngredienteDeProducto[] = [];

        for(let i=0; i<ingredientes.length; i++) {

            console.log(JSON.stringify(ingredientes[i]));
            

            let nuevoIng: IngredienteDeProducto = new IngredienteDeProducto();

            nuevoIng.cantidad = ingredientes[i].cantidad;
            nuevoIng.id = ingredientes[i].id;
            nuevoIng.ingrediente = ingredientes[i].ingrediente.id;
            nuevoIng.producto = ingredientes[i].producto.id;
            nuevoIng.unidadMedida = ingredientes[i].unidadmedida.id;


            castIngredientes.push(nuevoIng);
        }

        return(castIngredientes);
    }



    const crearProducto = async () => {
        /*if(Productonuevo.esManufacturado){
            productoSelect.tiempoCocina = convertTimeToNumber(selectedTime);
        }*/

        console.log(JSON.stringify(productoSelect));
        console.log(productoSelect.tiempoCocina);

        await productoService.crearEntity(productoSelect, ingredientesProducto);
        
        
    }

    const updateProducto = async () => {
        /*if(Productonuevo.esManufacturado){
            Productonuevo.tiempoCocina = convertTimeToNumber(selectedTime);
        }*/

        console.log(JSON.stringify(Productonuevo));
        
        

        await productoService.actualizarEntity(productoSelect, ingredientesProducto);
        
    }
    const handleFormSubmit = () => {
        
        setModalIngr(true);
        return false; // Prevent the default form submission behavior
      };

      const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
        setProductoSelect({ ...productoSelect, tiempoCocina: (event.target.value) })
      };
    


    if (/*datos === undefined ||*/ categorias === undefined) {

            return (
                <>
                    {estado &&
                        <h1>LOADING!</h1>
                    }
                </>
            )
    }else if(categorias === undefined){
        return(
            <>
            {estado &&
            <div>
                <div className="overlay">
                    <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white"}}>
                        <div className="" style={{textAlign: "center"}}>

                            <h1>¡DEBE CREAR CATEGORIAS PRIMERO!</h1>

                        </div>
                    </div>
                </div>
            </div>}
            </>
        )
    }


    

    return (
        <>
        <ModalAgregarIngrediente estado={modalIngr}
             cambiarEstado={setModalIngr} ingredientesList={ingredientesProducto}
              setIngredientesList={setIngredientesProducto} cambiarEstadoFormProd={cambiarEstado}/> 
            {estado && !modalIngr /*&& productoSelect !== undefined*/ &&
            

                <div className="overlay">
                    <div className="container my-5 contenedorModal modaloverflow" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white", maxWidth: "50%"}}>
                        <div className="childmodaloverflow" style={{textAlign: "center", alignContent: "center"}}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                               
                            }}>
                                <h3 className="mb-3">Nuevo Producto</h3>
                                
                                <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                    <div className="mb-3" style={{maxWidth: "50%"}}>
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} type="text" className="form-control" id="nombre" name="nombre" required value={productoSelect.denominacion.toString()} onChange={
                                            handleSelectChange
                                        }  />
                                    </div>
                                    </div>
                                    <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                    <div style={{display: "flex"}}>
                                        <div className="mb-3">
                                            <label htmlFor="stockActual" className="form-label">Costo Total</label>
                                            <input type="number" min="0" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control me-2" id="precioCompra" name="precioCompra" required value={productoSelect.costoTotal.toString()} onChange={e => {Productonuevo.costoTotal =(+e.target.value); setProductoSelect({ ...productoSelect, costoTotal: (+e.target.value) })}}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="stockActual" className="form-label">Precio Total</label>
                                            <input type="number" min="0" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}}  className="form-control ms-2" id="stockActual" name="stockActual" required value={productoSelect.precioTotal} onChange={e => {Productonuevo.precioTotal =(+e.target.value); setProductoSelect({ ...productoSelect, precioTotal: (+e.target.value) })}}/>
                                        </div>
                                    </div>
                                    </div>
                                    

                                    <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                    <div className="text-center" style={{display: "flex"}}>
                                        <div className="mb-3">
                                            <label htmlFor="stockMinimo" className="form-label">Descripcion</label>
                                            <textarea style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control me-2" id="stockMin" name="stockMin" required value={productoSelect.descripcion.toString()} onChange={e => {Productonuevo.descripcion =(e.target.value); setProductoSelect({ ...productoSelect, descripcion: (e.target.value) })}}/>
                                        </div>
                                        
                                            {   botonManufacturado &&
                                            <div className="mb-3">
                                                <label htmlFor="stockMaximo" className="form-label">Receta</label>
                                                <textarea style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control ms-2" id="stockMax" name="stockMax" required value={productoSelect.receta!.toString()} onChange={e => {Productonuevo.receta =(e.target.value); setProductoSelect({ ...productoSelect, receta: (e.target.value) })}}/>
                                            
                                            </div>
                                            }
                                            
                                    </div>
                                    </div>

                                     <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                    <div className="text-center" style={{display: "flex"}}>

                                    {   botonManufacturado &&
                                        <div className="mb-3">

                                            <label htmlFor="stockMinimo" className="form-label">Tiempo de Preparacion</label>
                                            <input id="settime" type="time" step="1" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control" value={selectedTime} onChange={handleTimeChange}/> 
                                           </div>
                                    }
                                        <div className="mb-3">
                                            <label htmlFor="stockMaximo" className="form-label">¿Es manufacturado?</label>
                                            <GrupoBotones estado={botonManufacturado}
                                            cambiarEstado={setBotonManufacturado}></GrupoBotones>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="stockActual" className="form-label">Inserte Link de su Imagen</label>
                                            <input type="text" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}}  className="form-control" name="precio" required value={productoSelect.imagen.toString()} onChange={e => {Productonuevo.imagen =(e.target.value); setProductoSelect({ ...productoSelect, imagen: (e.target.value) })}}/>
                                        </div>
                                    </div>
                                    </div>
                                

                                
                                
                                
                                     <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div className="mb-4" style={{display: "flex", maxWidth: "70%", maxHeight: "40%", alignItems: "center", justifyContent: "center" }}>
                                    <label htmlFor="rubro" className="form-label">Categoria</label>
                                    <select style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-select" name="categorias" onChange={e =>{  setProductoSelect({ ...productoSelect, categoriaProducto: (JSON.parse(e.target.value)) }); setCategoriaElegida(e.target.value); Productonuevo.categoriaProducto = JSON.parse(categoriaElegida!.valueOf());}}>
                                    <option selected value={JSON.stringify(Productonuevo.categoriaProducto)}>{Productonuevo.categoriaProducto.denominacion}</option>
                                        {categorias.map(cat => (

                                            cat.denominacion !== Productonuevo.categoriaProducto.denominacion &&
                                            <option value={JSON.stringify(cat)}>{cat.denominacion}</option>
                                        ))}
                                    </select>

                                </div> 
                                </div> 


                                




                                <button className="btn btn-danger mx-3" onClick={() => cambiarEstado(!estado)}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>highlight_off</i></button>

                                <button type="submit" className="btn" style={{backgroundColor: "#864e1b", color: "white"}} onClick={(event) => {

                                    event.preventDefault();

                                    productoSelect.esManufacturado = botonManufacturado;
                                    
                                    

                                   if(categoriaElegida !== undefined && productoSelect.categoriaProducto.id !== 0 && (ingredientesProducto?.length > 0 || productoSelect.esManufacturado == false)){
                                    console.log("Entro en la primera condicion")
                                    if((productoSelect.receta != '' && productoSelect.tiempoCocina != '') || productoSelect.esManufacturado == false){
                                        console.log("Entro en la segunda condicion")
                                        if(categoriaElegida !== undefined){
                                            Productonuevo.categoriaProducto = JSON.parse(categoriaElegida!.valueOf());
                                        }
                                                      

                                        if(Productonuevo.id !== 0){

                                            //pasar los datos guardados al metodo de update
                                            updateProducto();
                                            cambiarEstado(!estado);

                                        }else{

                                            crearProducto();
                                            cambiarEstado(!estado);
                                            window.location.reload();
                                            
                                        }
 
                                    }}
                                }}> <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>check</i></button>
                            </form>
                            {   botonManufacturado &&
                            <div>
                                <TablaIngredientesMostrar ingredientesProd={ingredientesProducto} edicion={true}></TablaIngredientesMostrar>
                            
                            <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div className="mt-4" style={{display: "flex", maxWidth: "70%", maxHeight: "40%", alignItems: "center", justifyContent: "center" }}>
                                    
                                    <button className="btn btn-success" onClick={() => handleFormSubmit()}>Agregar Ingrediente</button>
                                </div> 
                                
                                </div>
                                </div> }
                        </div>
                    </div>
                </div>
            }
            
        </>

    );

}

export default ModalCreacionProd;