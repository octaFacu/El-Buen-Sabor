import { ServiceBasicos } from "../../../../../Programación - S4/Laboratorio de Computación IV/importante/parcialN1-LabIV/src/services/ServiceBasicos";

export class CategoriaProductoService extends ServiceBasicos{
    
    url = "http://localhost:8080/categoriaIngrediente"

    constructor() {
        super("categoriaProducto");
      }
    }