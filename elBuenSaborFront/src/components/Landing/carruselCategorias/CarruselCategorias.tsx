import { FC } from "react";
import "./CarruselCategorias.css"
import { CategoriaProducto } from '../../../context/models/interfaces'

interface CarruselCategoriasProps {

    categorias: CategoriaProducto[];
    setCategoriaSeleccionada: (categoria: CategoriaProducto) => void;

}

const CarruselCategorias: FC<CarruselCategoriasProps> = (props: CarruselCategoriasProps) => {

    const { categorias } = props

    return (

        <div className="menuCat">
            <div><button className="btnPag"><i className="material-icons" style={{ fontSize: "30px" }}> keyboard_arrow_left</i></button></div>

            {
                categorias.map(cat =>
                    <div style={{ fontSize: "24px" }}>
                        <button><i className="material-icons" > local_dining</i> {cat.denominacion}</button>
                    </div>
                )
            }

            <div style={{ fontSize: "24px" }}><button className="btnPag"><i className="material-icons" style={{ fontSize: "30px" }}> keyboard_arrow_right</i></button></div>
        </div>

    );
}

export default CarruselCategorias;
