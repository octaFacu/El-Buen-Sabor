import React, { useState, ChangeEvent } from 'react'
import { Usuario } from '../../context/interfaces/interfaces';
import { AdminService } from '../../services/AdminService';
import { ServiceBasicos } from '../../services/ServiceBasicos';
import ModalConfirmacion from '../componentesUsuarios/modales/ModalConfirmacion';
import { useUnidadContext } from '../../context/GlobalContext';


interface Props {
    show: boolean;
    onHide: () => void;
    empleado: Usuario;
    actualizarEmpleado: (empleadoModificado: Usuario) => void;

}



export default function EmpleadoModal({ show, onHide, empleado, actualizarEmpleado }: Props) {

    const service = new AdminService();
    const serviceEmp = new ServiceBasicos("usuario")

    const [idRol, setIdRol] = useState<string>("");
    const [nombreRol, setNombreRol] = useState<string>(empleado.nombreRol  ?? "");

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState<boolean>(false);


    const handleBorrar = () => {
        setMostrarConfirmacion(true);
    };

    const handleCancelar = () => {
        setMostrarConfirmacion(false);
    };

    const [datosEmpleado, setDatosEmpleado] = useState({
        nombre: empleado.nombre || "",
        apellido: empleado.apellido || "",
        email: empleado.email || "",
        telefono: empleado.telefono || "",
        id: empleado.id || "",
        activo: empleado.activo || false
    });

    const handleInputChange = (e: any) => {
        const { id, value } = e.target;
        setDatosEmpleado({ ...datosEmpleado, [id]: value });
    };



    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setIdRol(event.target.value);
        setNombreRol(event.target.options[event.target.selectedIndex].text);
    }


    const ObtenerRolAnterior = () => {
        const roles: Record<string, string> = { // record es para indicar clave valor con cadenas
            "Administrador": "rol_UHjavuD1G5l0c7oE",
            "Cajero": "rol_T1Ab2sNIhNLw9dXm",
            "Cocinero": "rol_iZcV6RkmERma4CwD",
            "delivery": "rol_0Z5rG7VtWJ7W1hiP"
        };
        const valorRol = roles[empleado.nombreRol ?? ""];

        return valorRol;
    }

    const { rol } = useUnidadContext();


    const GuardarEmpleado = async () => {
        if (empleado.nombreRol != null && empleado.nombreRol != nombreRol) {
            console.log("actualizar rol")
            await service.borrarRolUsuario(empleado.id, ObtenerRolAnterior())
            await service.agregarRolUsuario(empleado.id, idRol, nombreRol);
        } else if (empleado.nombreRol == null) {
            service.agregarRolUsuario(empleado.id, idRol, nombreRol);
            console.log("voy a agregar un rol")

        } else {
            console.log("el mismo rol")
        }
        //const empleadoModificado = { ...empleado, nombreRol: nombreRol };
        //actualizarEmpleado(empleadoModificado);
        const empleadoModificado: Usuario = { ...datosEmpleado, nombreRol: nombreRol };
        actualizarEmpleado(empleadoModificado);
        serviceEmp.updateEntity(empleadoModificado, rol);
    }

    const BorrarEmpleado = async () => {
        await service.borrarRolUsuario(empleado.id, ObtenerRolAnterior())
        location.reload()
    }

    return (
        <div className={`modal ${show ? 'show' : ''}`} role="dialog" style={{ display: show ? 'block' : 'none' }} >
            <div className="modal-dialog modal-dialog-centered " role="document" >
                <div className="modal-content card-modal-emp ">
                    <div className="modal-header">
                        <h5 className="modal-title">Ver Empleado</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={onHide} aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label  className="fw-bold" htmlFor="nombre">Nombre: </label>
                                    <input type="text" className="form-control text-white" id="nombre" value={datosEmpleado.nombre} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="apellido">Apellido:</label>
                                    <input type="text" className="form-control text-white" id="apellido" value={datosEmpleado.apellido} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control text-white" id="email" value={datosEmpleado.email} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono:</label>
                            <input type="number" maxLength={11} className="form-control text-white" id="telefono" value={datosEmpleado.telefono} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rol">Rol:</label>
                            <select className="form-control text-white" id="rol" value={ObtenerRolAnterior()} onChange={handleSelectChange}>
                                <option>Seleccionar Rol</option>
                                <option value="rol_UHjavuD1G5l0c7oE">Administrador</option>
                                <option value="rol_T1Ab2sNIhNLw9dXm">Cajero</option>
                                <option value="rol_iZcV6RkmERma4CwD">Cocinero</option>
                                <option value="rol_0Z5rG7VtWJ7W1hiP">delivery</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={GuardarEmpleado}>Guardar Cambios</button>
                        <button type="button" className="btn btn-primary" onClick={handleBorrar}>Borrar Rol</button>
                    </div>
                </div>
            </div>
            <ModalConfirmacion
                mostrarModal={mostrarConfirmacion}
                cerrarModal={handleCancelar}
                confirmar={BorrarEmpleado}
            />
        </div>
    );
}
