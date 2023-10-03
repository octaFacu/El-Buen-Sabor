import React from 'react'


interface Props {
    show: boolean;
    onHide: () => void;
}


export default function EmpleadoModal({ show, onHide }: Props) {
    return (
        <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modificar Rol</h5>
                        <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input type="text" className="form-control" id="nombre" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="apellido">Apellido:</label>
                                    <input type="text" className="form-control" id="apellido" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono:</label>
                            <input type="text" className="form-control" id="telefono" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rol">Rol:</label>
                            <select className="form-control" id="rol">
                                <option value="rol1">Rol 1</option>
                                <option value="rol2">Rol 2</option>
                                <option value="rol3">Rol 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Cerrar</button>
                        <button type="button" className="btn btn-primary">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
