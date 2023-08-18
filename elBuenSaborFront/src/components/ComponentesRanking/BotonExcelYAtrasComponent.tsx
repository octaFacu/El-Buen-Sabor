import React from 'react'
import { AdminService } from '../../services/AdminService';
import { useNavigate } from 'react-router-dom';

export default function BotonExcelYAtrasComponent() {
    const navigate = useNavigate();
    
    const handleExcel = async () => {
        const servicioAdmin = new AdminService();
        try {
            const blob = await servicioAdmin.generarInformeClientes();
            const url = window.URL.createObjectURL(new Blob([blob]));
    
            // Crear un elemento <a> para la descarga del archivo
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'informe.xlsx'); // Aca ponemos el nombre al archivo
    
            // Agregar un eventListener 'click' al enlace
            link.addEventListener('click', () => {
                
                // Importante: Aquí, estamos removiendo el eventListener 'click'
                // Esto lo hacemos para evitar conflictos al eliminar el enlace después de la descarga.
                link.removeEventListener('click', () => {});
            });
            // Agregar el enlace al cuerpo del documento
            document.body.appendChild(link);

            // Simular un clic en el enlace para iniciar la descarga
            link.click();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const handleAtras = () => {
        navigate(-1);
    };

    return (
        <div className="d-flex justify-content-between">
            <button className="btn btn-atras text-white" onClick={handleAtras}>
                Atrás
            </button>
            <button className="btn btn-excel text-white" onClick={handleExcel}>Excel</button>
        </div>
    )
}
