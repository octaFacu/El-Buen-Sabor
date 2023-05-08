import React, { FC } from 'react'

interface CartaProps {
    titulo: string;

    estado: boolean
    setEstadoModal: (estado: boolean) => void

    // datos: any
    setDatos: ({}: any) => void

    children?: React.ReactNode;
}

export const ListaCartasABM: FC<CartaProps> = ({ titulo, estado, setEstadoModal, setDatos, children }) => {
    return (

        <div className="container my-5 pb-1 mb-3 " style={{ background: "#f99132", borderRadius: "25px" }}>
            <div className="titleAndAddButton">
                <div className="text-center py-4 px-3 d-flex">
                    <button className="btn btn-sm " style={{ background: "#f99132", color: "white", borderRadius: "50px" }} onClick={() => {
                        setDatos({ id: undefined, denominacion: "", categoriaIngredientePadre: { id: undefined, denominacion: "", activo: true }, activo: true })
                        setEstadoModal(!estado)
                    }}><i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}>add</i></button>
                    <h1 style={{ margin: "auto", color: "white" }}> {titulo}</h1>
                </div>
            </div>

            <div>
                {children}
            </div>

        </div >


    )
}

