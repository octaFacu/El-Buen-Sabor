import { useContext, useEffect, useState } from "react"
import "../../css/ventanaModal.css"
import { CategoriaIngredienteService } from "../../services/CategoriaIngredienteService";
import { ServiceBasicos } from "../../../../../../Programación - S4/Laboratorio de Computación IV/importante/parcialN1-LabIV/src/services/ServiceBasicos";
import { Ingrediente, unidadDeMedida } from "../../context/models/interfaces";
import { IngredientesService } from "../../services/IngredientesService";
import { Rubro } from "../compIngrediente/Rubro";
import { GlobalContext } from "../../context/GlobalContext";

interface IngredienteFormProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: any

    datos?: Ingrediente
    setDatos: any

    categorias: Rubro[]
}

const IngredienteForm: React.FunctionComponent<IngredienteFormProps> = ({ estado, cambiarEstado, datos, setDatos, categorias}) => {

    const ingredientesService = new IngredientesService();
    // const serviceBasicos = new ServiceBasicos("unidadmedida");
  

    let Ingredientenuevo: Ingrediente;
    const [unidadElegida, setUnidadElegida] = useState<String>();
    const [categoriaElegida, setCategoriaElegida] = useState<String>();

    const [ingredienteSelect, setIngredienteSelect] = useState<Ingrediente>({
        nombre: "",
        activo: true,
        precioCompra: 0,
        stockActual: 0,
        stockMaximo: 0,
        stockMinimo: 0,
        unidadmedida: {id: 0, denominacion: ""},
        categoriaIngrediente: {id: 0, denominacion: "", activo: true}


    });
    
    const { unidadesDeMedida } = useContext(GlobalContext);

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        Ingredientenuevo.nombre =(event.target.value)

        setIngredienteSelect({ ...ingredienteSelect, nombre: (event.target.value) });
    }

    useEffect(() => {
        if(datos !== undefined){
            setIngredienteSelect(datos!);
        }
        
    }, [datos])

    

    if (datos === undefined || categorias === undefined) {

            return (
                <>
                    {estado &&
                        <h1>LOADING!</h1>
                    }
                </>
            )
    // }else if(categorias === undefined){
    //     return(
    //         estado &&
    //         <div>
    //             <div className="overlay">
    //                 <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white"}}>
    //                     <div className="" style={{textAlign: "center"}}>

    //                         <h1>¡DEBE CREAR CATEGORIAS PRIMERO!</h1>

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    }
    else{
        Ingredientenuevo = datos;
        
    }

    

    return (
        <>
            {estado && ingredienteSelect !== undefined &&
                <div className="overlay">
                    <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white", maxWidth: "50%"}}>
                        <div className="" style={{textAlign: "center", alignContent: "center"}}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                               
                            }}>
                                <h3 className="mb-3">Agregar Ingrediente</h3>
                                
                                <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                    <div className="mb-3" style={{maxWidth: "50%"}}>
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} type="text" className="form-control" id="nombre" name="nombre" required value={ingredienteSelect.nombre.toString()} onChange={
                                            handleSelectChange
                                        }  />
                                    </div>
                                    </div>
                                    <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                    <div style={{display: "flex"}}>
                                        <div className="mb-3">
                                            <label htmlFor="stockActual" className="form-label">Precio Compra</label>
                                            <input type="number" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control" id="precioCompra" name="precioCompra" required value={ingredienteSelect.precioCompra.toString()} disabled/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="stockActual" className="form-label">Stock Actual</label>
                                            <input type="number" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}}  className="form-control" id="stockActual" name="stockActual" required value={ingredienteSelect.stockActual.toString()} disabled/>
                                        </div>
                                    </div>
                                    </div>
                                    

                                    <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                    <div className="text-center" style={{display: "flex"}}>
                                        <div className="mb-3">
                                            <label htmlFor="stockMinimo" className="form-label">Stock Minimo</label>
                                            <input type="number" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control" id="stockMin" name="stockMin" required value={ingredienteSelect.stockMinimo.toString()} onChange={e => {Ingredientenuevo.stockMinimo =(+e.target.value); setIngredienteSelect({ ...ingredienteSelect, stockMinimo: (+e.target.value) })}} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="stockMaximo" className="form-label">Stock Maximo</label>
                                            <input type="number" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control" id="stockMax" name="stockMax" required value={ingredienteSelect.stockMaximo.toString()} onChange={e => {Ingredientenuevo.stockMaximo =(+e.target.value); setIngredienteSelect({ ...ingredienteSelect, stockMaximo: (+e.target.value)})}} />
                                        </div>
                                    </div>
                                    </div>
                                

                                
                                
                                
                                    <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div className="mb-4" style={{display: "flex", maxWidth: "70%", maxHeight: "40%", alignItems: "center", justifyContent: "center" }}>
                                    <label htmlFor="rubro" className="form-label">Unidad de Medida</label>
                                    <select style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-select" id="unidades" name="unidades" onChange={e =>{  setUnidadElegida(e.target.value); Ingredientenuevo.unidadmedida = JSON.parse(unidadElegida!.valueOf());}}>
                                    <option selected value={JSON.stringify(datos.unidadmedida)}>{datos.unidadmedida.denominacion}</option>
                                        {unidadesDeMedida.map(unidadM => (

                                            unidadM.denominacion !== datos.unidadmedida.denominacion &&
                                            <option value={JSON.stringify(unidadM)}>{unidadM.denominacion}</option>
                                        ))}
                                    </select>

                                    <label htmlFor="rubro" className="form-label">Categoria</label>
                                    <select style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-select mb-3" id="categoria" name="categoria" onChange={e => { setCategoriaElegida(e.target.value); Ingredientenuevo.categoriaIngrediente = JSON.parse(categoriaElegida!.valueOf());}}>
                                     <option selected value={JSON.stringify(datos.categoriaIngrediente)}>{datos.categoriaIngrediente.denominacion}</option>
                                        {categorias.map(cat => (

                                            cat.denominacion !== datos.categoriaIngrediente.denominacion &&
                                            <option value={JSON.stringify(cat)}>{cat.denominacion}</option>
                                        ))}
                                    </select>
                                </div> 
                                </div>





                                <button className="btn btn-danger mx-3" onClick={() => cambiarEstado(!estado)}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>highlight_off</i></button>

                                <button type="submit" className="btn" style={{backgroundColor: "#864e1b", color: "white"}} onClick={() => {


                                   if((categoriaElegida !== undefined || unidadElegida !== undefined) || (Ingredientenuevo.categoriaIngrediente.id !== 0 || Ingredientenuevo.unidadmedida.id !== 0)){

                                        if(categoriaElegida !== undefined){
                                            Ingredientenuevo.categoriaIngrediente = JSON.parse(categoriaElegida!.valueOf());
                                        }
                                        if(unidadElegida !== undefined){
                                            Ingredientenuevo.unidadmedida = JSON.parse(unidadElegida!.valueOf());
                                        }
                                    
                                    

                                        if(Ingredientenuevo.id !== 0){

                                            //pasar los datos guardados al metodo de update
                                            ingredientesService.updateEntity(Ingredientenuevo);
                                            cambiarEstado(!estado);

                                        }else{
                                            ingredientesService.createEntity(Ingredientenuevo);
                                            cambiarEstado(!estado);
                                            window.location.reload();
                                            
                                        }
 
                                }
                                }}> <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>check</i></button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default IngredienteForm;