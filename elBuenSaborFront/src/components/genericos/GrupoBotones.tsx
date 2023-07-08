import React, { useState } from 'react';

const GrupoBotones: React.FC = () => {
  const [isButton1Selected, setButton1Selected] = useState(true);
  const [isButton2Selected, setButton2Selected] = useState(false);

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
        onClick={handleButton1Click}
        style={{ fontWeight: isButton1Selected ? 'bold' : 'normal' }}
      >
        Button 1
      </button>
      <button
        onClick={handleButton2Click}
        style={{ fontWeight: isButton2Selected ? 'bold' : 'normal' }}
      >
        Button 2
      </button>
    </div>
  );
};

export default GrupoBotones;
