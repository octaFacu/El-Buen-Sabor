import { useEffect, useState } from "react"
import { Rubro } from "./Rubro";
import "../../css/ventanaModal.css"
import { PadreRubro } from "./PadreRubro";
import { CategoriaIngredienteService } from "./CategoriaIngredienteService";

interface CaracIngrFormProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: any

    rubrosPadre: Rubro[]

    datos?: any
    setDatos: any
}

const CaracIngrForm: React.FunctionComponent<CaracIngrFormProps> = ({ estado, cambiarEstado, rubrosPadre, datos, setDatos }) => {

    const categoriaIngredienteService = new CategoriaIngredienteService();

    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [padre, setPadre] = useState<PadreRubro>({ id: undefined, denominacion: '', activo: true })
    const [padreId, setPadreId] = useState('');
    const [activo, setActivo] = useState('')

    console.log("-----Estado datos-------");
    console.log(datos);

    useEffect(() => {
        setNombre(datos.denominacion);
        setPadre(datos.categoriaPadre);
        setActivo(datos.activo);
        setId(datos.id);
    }, [datos.id, datos.denominacion, datos.categoriaPadre, datos.activo])


    if (padre === undefined) {
        return (
            <>
                {estado &&
                    <h1>LOADING!</h1>
                }
            </>
        )
    }

    console.log("-----info-------");
    console.log(id);
    console.log("Nombre:" + nombre);
    console.log("Padre: " + padre.denominacion);
    console.log(activo);

    return (
        <>
            {estado &&
                <div className="overlay">
                    <div className="container my-5 contenedorModal">
                        <div className="">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                // cargarCategoria()
                            }}>
                                <h3 className="mb-3">Agregar Rubro de Ingrediente</h3>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" name="nombre" required value={nombre} onChange={e => setNombre(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rubro" className="form-label">Rubro padre</label>
                                    <select className="form-select" id="rubro" name="rubro" onChange={e => setPadreId(e.target.value)}>
                                        {padre.denominacion === "" || padre.denominacion === undefined
                                        ? <option selected value="">No tiene rubro padre</option>
                                        : <><option selected value={padre.id?.toString()}>{padre.denominacion}</option> <option value="">No tiene rubro padre</option> </>
                                        }
                                        {rubrosPadre.map(rubro => (

                                            padre.denominacion !== rubro.denominacion
                                            && <option value={rubro.id?.toString()}>{rubro.denominacion}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className="btn btn-danger" onClick={() => cambiarEstado(!estado)}>Cancelar</button>
                                <button type="submit" className="btn btn-primary" onClick={() => {

                                    //setDatos({id: id, denominacion:nombre, categoriaPadre: {id: undefined, denominacion: "", activo: true}, activo: activo })
                                    if(datos.id){

                                        if(padreId){
                                            setDatos({id: id, denominacion:nombre, categoriaPadre: {id: padreId}, activo: activo })
                                        }else{
                                            setDatos({id: id, denominacion:nombre, activo: activo })
                                        }

                                    }else{
                                        console.log("me estoy creando")
                                        console.log(datos)
                                    }
                                    categoriaIngredienteService.updateActivoRubro(datos)
                                    cambiarEstado(!estado)
                                    window.location.reload();
                                }}>Agregar</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default CaracIngrForm;

