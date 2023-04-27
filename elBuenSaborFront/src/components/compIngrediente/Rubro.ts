import { PadreRubro } from "./PadreRubro";


export class Rubro{

    id?: Number = 0
    denominacion: string = "";
    categoriaPadre?: PadreRubro = {id:undefined , denominacion:"", activo:true};
    activo: boolean = true;

    constructor(id:Number, denominacion:string, categoriaPadre: Rubro, activo: boolean){
        this.id = id
        this.denominacion = denominacion
        this.categoriaPadre = categoriaPadre
        this.activo = activo
    }
}