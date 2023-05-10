import { useEffect, useState } from "react"
import "../../css/ventanaModal.css"
import { CategoriaIngredienteService } from "../../services/CategoriaIngredienteService";
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { Ingrediente } from "../../context/interfaces/interfaces";
import { IngredientesService } from "../../services/IngredientesService";

interface IngredienteFormProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: any

    datos?: Ingrediente
    setDatos: any
}

const IngredienteForm: React.FunctionComponent<IngredienteFormProps> = ({ estado, cambiarEstado, datos, setDatos }) => {

    const ingredientesService = new IngredientesService();
    let Ingredientenuevo: Ingrediente;


    if (datos === undefined) {

            return (
                <>
                    {estado &&
                        <h1>LOADING!</h1>
                    }
                </>
            )
    }else{
        Ingredientenuevo = datos;
    }

    

    return (
        <>
            {estado &&
                <div className="overlay">
                    <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white"}}>
                        <div className="" style={{textAlign: "center"}}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                               
                            }}>
                                <h3 className="mb-3">Agregar Ingrediente</h3>
                                
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} type="text" className="form-control" id="nombre" name="nombre" required value={Ingredientenuevo.nombre.toString()} onChange={e => Ingredientenuevo.nombre =(e.target.value)} />
                                    </div>
                                    <div className="container" style={{display: "flex"}}>
                                    <div style={{display: "flex"}}>
                                        <div className="mb-3">
                                            <label htmlFor="stockActual" className="form-label">Precio Compra</label>
                                            <input type="number" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control" id="precioCompra" name="precioCompra" required value={Ingredientenuevo.precioCompra.toString()} disabled/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="stockActual" className="form-label">Stock Actual</label>
                                            <input type="number" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}}  className="form-control" id="stockActual" name="stockActual" required value={Ingredientenuevo.stockActual.toString()} disabled/>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="stockActual" className="form-label">Stock Minimo</label>
                                        <input type="number" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control" id="stockMin" name="stockMin" required value={Ingredientenuevo.stockMinimo.toString()} onChange={e => Ingredientenuevo.stockMinimo =((+e.target.value))} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stockActual" className="form-label">Stock Maximo</label>
                                        <input type="number" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control" id="stockMax" name="stockMax" required value={Ingredientenuevo.stockMaximo.toString()} onChange={e => Ingredientenuevo.stockMaximo =((+e.target.value))} />
                                    </div>
                                </div>

                                
                                
                                

                                {/* <div className="mb-3">
                                    <label htmlFor="rubro" className="form-label">Rubro padre</label>
                                    <select style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-select" id="rubro" name="rubro" onChange={e => setPadreGuardar(e.target.value)}>
                                        {padre.denominacion === "" || padre.denominacion === undefined
                                        ? <option selected value="">No tiene rubro padre</option>
                                        : <><option selected value={JSON.stringify(padre)}>{padre.denominacion}</option> <option value="">No tiene rubro padre</option> </>
                                        }
                                        {rubrosPadre.map(rubro => (

                                            padre.denominacion !== rubro.denominacion && nombre !== rubro.denominacion
                                            && <option value={JSON.stringify(rubro)}>{rubro.denominacion}</option>
                                        ))
                                    </select>
                                </div> */}
                                <button className="btn btn-danger mx-3" onClick={() => cambiarEstado(!estado)}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>highlight_off</i></button>

                                <button type="submit" className="btn" style={{backgroundColor: "#864e1b", color: "white"}} onClick={() => {

                                   
                                    // if(datos.id){



                                    //         //guardar los datos con un padre
                                    //         setDatos({id: id, denominacion:nombre })

                                    //     //pasar los datos guardados al metodo de update
                                    //     categoriaIngredienteService.updateEntity(datos)

                                    // }else{


                                    //         //Creacion de nueva categoria con un padre

                                    //         // categoriaIngredienteService.createRubro({denominacion: nombre, categoriaPadre: {id: padreAPersistir.id}, activo: activo })
                                    //         categoriaIngredienteService.createEntity({ });
                                        
                                    //}
                                    //Cambiar el estado para que se cierre el formulario
                                    cambiarEstado(!estado);
                                    //Actualizar la pagina
                                    window.location.reload();
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