import React, { useEffect, useState } from 'react';

interface BotonesProps {

  //De categoriaIngrABM, cambio su estado
  estado: boolean,
  cambiarEstado: (estado: boolean) => void,

}

const GrupoBotones: React.FC<BotonesProps> = ({ estado, cambiarEstado}) => {
  const [isButton1Selected, setButton1Selected] = useState(true);
  const [isButton2Selected, setButton2Selected] = useState(false);

  useEffect(() => {

    if(estado === true) {
      setButton1Selected(true);
      setButton2Selected(false);

    }else{

    }

  }, [estado]);

  const handleButton1Click = () => {
    setButton1Selected(true);
    setButton2Selected(false);
  };

  const handleButton2Click = () => {
    setButton1Selected(false);
    setButton2Selected(true);
  };

  return (
    <div>
      <button
        className={`btn ${isButton1Selected ? 'btn-success' : 'btn-outline-success'}`}
        onClick={handleButton1Click}
        style={{
          fontWeight: isButton1Selected ? 'bold' : 'normal',
          border: isButton1Selected ? '2px solid white' : 'none',
        }}
      >
        Si
      </button>
      <button
        className={`btn ${isButton2Selected ? 'btn-danger' : 'btn-outline-danger'}`}
        onClick={handleButton2Click}
        style={{
          fontWeight: isButton2Selected ? 'bold' : 'normal',
          border: isButton2Selected ? '2px solid white' : 'none',
        }}
      >
        No
      </button>
    </div>
  );
};

export default GrupoBotones;
