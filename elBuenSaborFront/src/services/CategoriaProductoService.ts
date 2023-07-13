import { ServiceBasicos } from "./ServiceBasicos";
export class CategoriaProductoService extends ServiceBasicos{
    
    url = "http://localhost:8080/categoriaIngrediente"

    constructor() {
        super("categoriaProducto");
      }
    }