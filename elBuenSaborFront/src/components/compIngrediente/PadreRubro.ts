export class PadreRubro{

    id?: Number = 0
    denominacion: string = "";
    activo: boolean = true;

    constructor(id:Number, denominacion:string, activo: boolean){
        this.id = id
        this.denominacion = denominacion
        this.activo = activo
    }
}