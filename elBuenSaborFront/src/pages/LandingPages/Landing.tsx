import React, { useEffect, useState } from 'react'
import ImgLogo from '../../components/Landing/ImgLogo'
import CarruselCategorias from '../../components/Landing/carruselCategorias/CarruselCategorias'

import { CategoriaProducto } from '../../context/interfaces/interfaces'
import { CategoriaProductoService } from "../../services/CategoriaProductoService";
import ListCard from '../../components/Landing/listCard/ListCard'

export const Landing = () => {

  const categoriaProductoService = new CategoriaProductoService();

  //Para carrusel de categorias
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaProducto>()

  let cantCategorias: number;

  

  useEffect(() => {

    //Traigo las categorias
    categoriaProductoService.getAllBasic()
      .then(data => {
        setCategorias(data)
        console.log(categorias);
      })

      cantCategorias = categorias.length;
      console.log(cantCategorias);
      

  }, []);


  return (
    <>
      {/* <ImgLogo></ImgLogo> */}

      <div className="container containerMain">

        <CarruselCategorias 
          categorias={categorias}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />

        <ListCard />

      </div>

    </>
  )
}
