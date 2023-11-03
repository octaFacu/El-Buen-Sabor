import { AdminService } from '../../services/AdminService';
import { useNavigate } from 'react-router-dom';

interface Props {
    nombre: string
    informe: number;
}

export default function BotonExcelYAtrasComponent({informe, nombre}: Props) {
    const navigate = useNavigate();
    
    const handleExcel = async (opcion: number) => {
        const servicioAdmin = new AdminService();
        try {
            let blob: Blob;
            switch (opcion) {
                case 1:
                    blob = await servicioAdmin.generarInformeClientes();
                    break;
                case 2:
                    blob = await servicioAdmin.generarInformeProductos();
                    break;
                case 3:
                    blob = await servicioAdmin.generarInformeGanancias();
                    break;
                default:
                    console.error("Opción no válida");
                    return;
            }
    
            const url = window.URL.createObjectURL(new Blob([blob]));
    
            // Crear un elemento <a> para la descarga del archivo
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nombre+'.xlsx'); // Aca ponemos el nombre al archivo
    
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
                Inicio Admin
            </button>
            <button className="btn btn-excel text-white" onClick={()=>handleExcel(informe)}>Excel</button>
        </div>
    )
}
