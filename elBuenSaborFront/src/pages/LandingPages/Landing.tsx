import React, { useEffect, useState } from 'react'
import MenuCat from '../../components/Landing/MenuCat'
import ImgLogo from '../../components/Landing/ImgLogo'
import CarruselCategorias from '../../components/Landing/carruselCategorias/CarruselCategorias'

import { CategoriaProducto } from '../../context/interfaces/interfaces'
import { CategoriaProductoService } from "../../services/CategoriaProductoService";

export const Landing = () => {

  const categoriaProductoService = new CategoriaProductoService();

  //Para carrusel de categorias
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaProducto>()

  useEffect(() => {

    categoriaProductoService.getAllBasic()
      .then(data => {
        setCategorias(data)
        console.log(categorias);
      })


  }, []);

  //Traigo las categorias


  return (
    <>
      {/* <ImgLogo></ImgLogo> */}

      {/* <div className='container'> */}

        <CarruselCategorias 
          categorias={categorias}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />

        <MenuCat></MenuCat>

      {/* </div> */}

    </>
  )
}
