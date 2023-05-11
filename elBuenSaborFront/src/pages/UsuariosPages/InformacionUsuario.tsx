import { useState } from "react";
import "../pagesStyles/usuarios.css";
import MiCuentaComponent from '../../components/componentesUsuarios/MiCuentaComponent'
import MisDireccionesComponents from '../../components/componentesUsuarios/MisDireccionesComponents'
import MisFavoritosComponent from '../../components/componentesUsuarios/MisFavoritosComponent'
import MisPedidosComponent from '../../components/componentesUsuarios/MisPedidosComponent'
import {useAuth0} from '@auth0/auth0-react'

export default function InformacionUsuario() {
  const [showCard, setShowCard] = useState(false);
  const [buttonClicked, setButtonClicked] = useState<number | null>(null);

  const handleButtonClick = (buttonNumber: number) => {
    setButtonClicked(buttonNumber);
    setShowCard(true);
  };


  const {user} = useAuth0();

  const renderCard = () => {
    switch (buttonClicked) {
      case 1:
        return (
          <MiCuentaComponent />
        );
      case 2:
        return (
          <MisDireccionesComponents/>
        );
      case 3:
        return (
          <MisPedidosComponent />
        );
      case 4:
        return (
          <MisFavoritosComponent />
        );   
    }};

  return (
    <div className="row mx-auto my-4">
      <div className="col-md-4">
        <div className="card d-flex flex-column align-items-center h-100 principal w-75">
          <img style={{ width: "200px", height: "200px" }}
           src={user?.picture} alt="Descripción de la imagen" className="card-img-top  rounded-circle card-img-custom mt-5" />

          <div className="card-body text-center  d-flex flex-column align-items-center w-100">
            <h5 className="card-title">{user?.nickname}</h5>
            <p className="card-text">{user?.email}</p>

            <button
              className="btn text-white mr-2 mb-2 d-block w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleButtonClick(1)}> <i className="material-icons text-black ubicacion mr-2 text-white" > face </i> Mi Cuenta </button>

            <button
              className="btn text-white mr-2 mb-2 d-block w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleButtonClick(2)} > <i className="material-icons text-black ubicacion mr-2 text-white"> location_on </i> Mis Direcciones </button>

            <button
              className="btn text-white mr-2 mb-2 d-block w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleButtonClick(3)}> <i className="material-icons text-black ubicacion mr-2 text-white"> local_dining </i> Mis Pedidos </button>
            <button
              className="btn text-white mr-2 mb-2 d-block w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleButtonClick(4)}> <i className="material-icons text-black ubicacion mr-2 text-white"> favorite_border </i> Mis Favoritos </button>
          </div>
        </div>
      </div>
      <div className="col-md-7">{showCard && renderCard()}</div>
    </div>
  );
}