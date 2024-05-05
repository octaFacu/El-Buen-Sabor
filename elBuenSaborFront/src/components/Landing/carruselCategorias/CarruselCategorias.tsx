import { FC, useEffect, useState } from "react";
import "./CarruselCategorias.css"
import { CategoriaProducto } from '../../../context/interfaces/interfaces'
import { stringify } from "querystring";

interface CarruselCategoriasProps {

    categorias: CategoriaProducto[];
    setCategoriaSeleccionada: (categoria: CategoriaProducto) => void;

}

const CarruselCategorias: FC<CarruselCategoriasProps> = (props: CarruselCategoriasProps) => {

    const { categorias, setCategoriaSeleccionada } = props

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [prevIndex, setPrevIndex] = useState<number>(0);
    const [nextIndex, setNextIndex] = useState<number>(0);

    const handleSlideChange = (selectedIndex: number) => {
        setActiveIndex(selectedIndex);
    };

    const handleFilter = (categoria: CategoriaProducto) => {
        setCategoriaSeleccionada(categoria);
    };

    const fixIndex = (id: number, tamanioArreglo: number): number => {

        let idRes: number;

        if (tamanioArreglo != 0) {
            if (id > tamanioArreglo - 1) {
                return idRes = 0;
            } else if (id < 0) {
                return idRes = tamanioArreglo - 1;
            } else {
                return idRes = id
            }
        }

        return 0;

    }

    useEffect(() => {

        setPrevIndex(fixIndex(activeIndex - 1, categorias.length));
        setNextIndex(fixIndex(activeIndex + 1, categorias.length));
        console.log(activeIndex);

    }, [activeIndex])

    return (

        categorias.length === 0
            ? <h1>CARGANDO</h1>
            :

            <div>

                <div className="mt-4 centerTitle">
                    <hr className="hr-title mx-3"></hr>
                    <div className="title-section">
                        <h3 style={{ color: "#864e1b" }}>¡NUESTRAS CATEGORIAS!</h3>
                    </div>
                    <hr className="hr-title mx-3" ></hr>
                </div>

                <div className="menuCat">

                    {/* Boton ir a la izquierda */}
                    <div>
                        <button
                            className="btnPag"
                            onClick={() => handleSlideChange((activeIndex - 1 + categorias.length) % categorias.length)}>
                            <i className="material-icons arrow-size"> keyboard_arrow_left</i>
                        </button>
                    </div>

                    {/* Contenido */}

                    <div className="cat">
                        <div>
                            <button id={`${prevIndex}`} onClick={() => handleFilter(categorias[prevIndex])}><i className="material-icons " > local_dining</i> {categorias[prevIndex].denominacion} </button>
                        </div>

                        <div>
                            <button id={`${activeIndex}`} onClick={() => handleFilter(categorias[activeIndex])}><i className="material-icons " > local_dining</i> {categorias[activeIndex].denominacion} </button>
                        </div>

                        <div className="icon-cat-carrousel-last-item">
                            <button id={`${nextIndex}`} onClick={() => handleFilter(categorias[nextIndex])}><i className="material-icons " > local_dining</i> {categorias[nextIndex].denominacion} </button>
                        </div>
                    </div>

                    {/* Boton ir a la derecha */}
                    <div style={{ fontSize: "24px" }}>
                        <button
                            className="btnPag"
                            onClick={() => handleSlideChange((activeIndex + 1) % categorias.length)}>
                            <i className="material-icons arrow-size"> keyboard_arrow_right</i>
                        </button>
                    </div>

                </div>

                <hr className="hr-title mx-3"></hr>

            </div>

            

    );
}

export default CarruselCategorias;
