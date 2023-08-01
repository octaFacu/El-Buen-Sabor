import React from 'react';
import './PageLoader.css';
import gifLoader from '../../assets/DuckLoader.gif'; 

interface PageLoader {

}

const PageLoader: React.FC<PageLoader> = () => {

  return (
    <div className="loader-container">
      <img className="gif-loader" src={gifLoader} alt="Loading..." />
    </div>
  );
};

export default PageLoader;