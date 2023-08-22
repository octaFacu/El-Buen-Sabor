import React, { useEffect, useState } from 'react';
import "./CartNotification.css"
import { NavLink } from 'react-router-dom';

interface CartNotificationProps {
  mensaje: string;
  show: boolean;
}

const CartNotification: React.FC<CartNotificationProps> = ({ mensaje, show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      console.log("Notificacion visible");

      // Agregar una clase CSS para activar la animación al aparecer
      setTimeout(() => {
        setVisible(false);
        console.log("Notificacion invisible");
      }, 5000); // La notificación se ocultará después de 5 segundos
    }
  }, [show]);

  return (
    <div className={`notification ${visible ? 'slide-in' : 'slide-out'}`}>
      <span>{mensaje}</span>
      <div className='d-flex justify-content-center align-items-center'>

        <NavLink className="omegalul" to="/carrito">
          <button className='btn btn-go-to-cart mt-2 d-flex align-items-center'>Ir al
            <i className="material-icons" style={{ fontSize: "30px", color: "white" }}>shopping_cart</i>
          </button>
        </NavLink>

      </div>

    </div>
  );
};

export default CartNotification;