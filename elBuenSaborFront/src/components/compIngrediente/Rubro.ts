import { PadreRubro } from "./PadreRubro";


export class Rubro{

    id?: Number = 0
    denominacion: string = "";
    categoriaIngredientePadre?: PadreRubro = {id:undefined , denominacion:"", activo:true};
    activo: boolean = true;

    constructor(id:Number, denominacion:string, categoriaIngredientePadre: Rubro, activo: boolean){
        this.id = id
        this.denominacion = denominacion
        this.categoriaIngredientePadre = categoriaIngredientePadre
        this.activo = activo
    }
}