import React from 'react'

interface ModalProps {
    cerrarModal: () => void;
  }

const ModalContraseña: React.FC<ModalProps> = ({ cerrarModal }) => {
    return (
        <div className="modal" style={{ display: 'block'}}>
          <div className="modal-dialog modal-dialog-centered" >
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title">AUTH0</h5>
                <button type="button" className="close" onClick={cerrarModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>INCOROPORAR AUTH0</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default ModalContraseña;