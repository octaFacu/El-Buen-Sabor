
import CateIngrCard from "./CateIngrCard";
import CategIngrForm from "./CategIngrForm";
import { useState, useEffect } from "react";

import { rubros as rb } from "../../jsontest/data.json"
import { Rubro } from "./Rubro";

interface PropsCategoriaIngrABM {}

// const CategoriaIngrABM: React.FunctionComponent<PropsCategoriaIngrABM> = () => {
    const CategoriaIngrABM = () => {

    const [estadoModal, setEstadoModal] = useState(false);
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [rubrosPadre, setRubrosPadre] = useState<Rubro[]>([]);
    const [datos, setDatos] = useState({
        nombreCard:'',
        padreCard:'',
        activoCard:''
    })

    const getRubros = () => {

         let listaRubro: Rubro[] = [];

        for (let i = 0; i < rb.length; i++) {
            let obj : Rubro 
            obj = {
                nombre: rb[i].nombre,
                padre: rb[i].padre,
                activo: rb[i].activo
            } 

            if(!(obj.nombre === "none")){
                listaRubro.push(obj)
            }

        }

        setRubros(listaRubro)
    }

    const getRubrosPadres = () => {

        let listaRubro: Rubro[] = [];

        for (let i = 0; i < rb.length; i++) {
            let obj : Rubro 

            if(rb[i].padre === ""){

                obj = {
                    nombre: rb[i].nombre || "none",
                    padre: "",
                    activo: rb[i].activo || false
                } 
    
                listaRubro.push(obj)
            }
        }

        setRubrosPadre(listaRubro)
        
    }

    useEffect(() => {
        getRubros()
        getRubrosPadres()
    }, [])  


    return (

        <div className="container my-5">
            <h1 className="text-center">Rubro de ingredientes</h1>
            <hr />
            <div className="row my-3">

                <div className="">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Padre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rubros.map(rub => (
                                <CateIngrCard 
                                key={Math.random()*100}
                                nombre={rub.nombre}
                                padre={rub.padre}
                                activo={rub.activo}
                                rubros={rubros}
                                setRubros={setRubros}

                                estado={estadoModal}
                                cambiarEstado={setEstadoModal}

                                setDatos={setDatos}
                                />
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="btn btn-sm btn-primary" onClick={() =>{
                setDatos({nombreCard: '', padreCard: '', activoCard: ''})
                // setDatos({nombre: '', padre: '', activo: true})
                setEstadoModal(!estadoModal)
                } }>Agregar Rubro</button>
            <CategIngrForm
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                rubrosPadre={rubrosPadre}
                datos={datos}
            />
        </div >

    );
}




// async function getCategoriaIngrediente () {

//     let rubros: Rubro[];

//     try {

//         const res = await fetch("src/jsontest/data.json")

//         if (!res.ok) {
//             throw {
//                 status: res.status,
//                 statusText: res.statusText
//             }
//         }

//         const json = await res.json()
//         // console.log(json);
//         rubros = json.rubros;
//         rubros.map(rub => {
//             setRubros(rub)
//         })
//         console.log(rubros);
        
        

//     } catch (err: any) {

//         console.log(`Error: ${err.status}: ${err.statusText}`);

//     }

// }

export default CategoriaIngrABM;