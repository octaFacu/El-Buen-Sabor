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

    const isFirstPage = page === 0 || Number.isNaN(page) ? true : false;
    const isLastPage = page === totalPages - 1 || Number.isNaN(page) ? false : true;

    const goToFirstPage = () => {
        if (!isFirstPage) {
            setPage(0);
        }
    };

    const goToLastPage = () => {
        if (!isLastPage) {
            setPage(totalPages - 1);
        }
    };

    const goToPreviousPage = () => {
        if (!isFirstPage) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        if (!isLastPage) {
            setPage(page + 1);
        }
    };

    return (
        <ul className="pagination ctr mb-2">
            <li className={`page-item ${isFirstPage ? "disabled" : "pointer"}`}>
                <a className="page-link" onClick={goToFirstPage}><i className="small material-icons">fast_rewind</i></a>
            </li>
            <li className={`page-item ${isFirstPage ? "disabled" : "pointer"}`}>
                <a className="page-link" onClick={goToPreviousPage}><i className="small material-icons">keyboard_arrow_left</i></a>
            </li>
            <li className={`page-item active`}>
                <a className="page-link">{page + 1}</a>
            </li>
            <li className={`page-item ${isLastPage ? "disabled" : "pointer"}`}>
                <a className="page-link" onClick={goToNextPage}><i className="small material-icons">keyboard_arrow_right</i></a>
            </li>
            <li className={`page-item ${isLastPage ? "disabled" : "pointer"}`}>
                <a className="page-link" onClick={goToLastPage}><i className="small material-icons">fast_forward</i></a>
            </li>
        </ul>
    );
}

export default Paginacion;