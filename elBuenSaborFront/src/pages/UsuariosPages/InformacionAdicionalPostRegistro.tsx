import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/InformacionUsuario.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { Usuario } from "../../context/interfaces/interfaces";

export default function InformacionAdicionalPostRegistro() {
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    activo: true,
  });

  useEffect(() => {
    if (user && user.login_count === 1) {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        id: user.userId,
      }));
    }
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUsuario((prevUsuario) => ({ ...prevUsuario, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const servicioUsuarios = new ServiceBasicos("usuario");
    const servicioCliente = new ServiceBasicos("cliente");

    try {
      const usuarioGuardado = await servicioUsuarios.createEntity(usuario);  
      const cliente = {
        ...usuario,
        usuario: usuarioGuardado,
      };
  
      await servicioCliente.createEntity(cliente);
       navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (user && user.login_count === 1) {
    return (
      <div className="container mt-4" style={{ paddingTop: "100px" }}>
        <div className="card card-generica cardFormularioConitnuacion">
          <div className="card-body">
            <h3 className="card-title">Informacion Adicional</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3" style={{ display: "none" }}>
                <input
                  type="text"
                  id="id"
                  value={user.userId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control inputsControlador"
                  id="nombre"
                  placeholder="Ingrese su nombre"
                  value={usuario.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control inputsControlador"
                  id="apellido"
                  placeholder="Ingrese su apellido"
                  value={usuario.apellido}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="form-control inputsControlador"
                  id="telefono"
                  placeholder="Ingrese su teléfono"
                  value={usuario.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn  btnFormContinuacion">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/");
    return null;
  }
}
