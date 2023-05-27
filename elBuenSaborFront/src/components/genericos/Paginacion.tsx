import { FunctionComponent } from "react";
import "./stylesGenericos/Paginacion.css"
import "./stylesGenericos/sass-vars-overr.scss";

interface PaginacionProps {
    page: number
    size: number
    totalPages: number

    setPage: (page: number) => void
}

const Paginacion: FunctionComponent<PaginacionProps> = ({ page, setPage, totalPages }) => {

    let currentPage = page + 1

    const renderItems = () => {

        const renderedItems = []

        for (let i = 0; i < totalPages; i++) {
            renderedItems.push(

                <li key={i} className={`page-item ${page === i && "active"}`} aria-current="page">
                    <a className="page-link" href="#" onClick={() => setPage(i)}>{i + 1}</a>
                </li>

            );
        }

        return renderedItems

    }

    return (
        <ul className="pagination ctr mb-2">
            <li className={`page-item ${page === 0 ? "disabled" : "pointer"}`}>
                <a className="page-link" onClick={() => setPage(page - 1)}>Anterior</a>
            </li>

            {renderItems()}

            <li className={`page-item colorActivo ${currentPage === totalPages ? "disabled" : "pointer"}`}>
                <a className="page-link" onClick={() => setPage(page + 1)}>Siguiente</a>
            </li>
        </ul>
    );
}

export default Paginacion;