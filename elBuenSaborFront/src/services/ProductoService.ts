import { ServiceBasicos } from "./ServiceBasicos";

export class ProductoService extends ServiceBasicos{
    
    url = "http://localhost:8080/producto"

    constructor() {
        super("producto");
      }
    }