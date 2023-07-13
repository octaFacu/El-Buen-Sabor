export class PadreRubro{

    id?: number = 0
    denominacion: string = "";
    activo: boolean = true;

    constructor(id:number, denominacion:string, activo: boolean){
        this.id = id
        this.denominacion = denominacion
        this.activo = activo
    }
}