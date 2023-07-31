
export class IngredienteDeProducto{
    id?: number = 0;
    cantidad: number = 0;
    idIngrediente: number = 0;
    idProducto: number = 0;
    idMedida: number = 0;



    constructor() {
        this.id = 0;
        this.idMedida = 0;
        this.cantidad = 0;
        this.idIngrediente = 0;
        this.idProducto = 0;
      }
}

export default IngredienteDeProducto;
