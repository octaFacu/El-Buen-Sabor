export class Rubro{

    id?: Number = 0
    denominacion: string = "";
	// padre?: Rubro = {id:0 , denominacion:"", activo:true};
    categoriaPadre?: Rubro = {id:0 , denominacion:"", activo:true};
    activo: boolean = true;

    constructor(id:Number, denominacion:string, categoriaPadre: Rubro, activo: boolean){
        this.id = id
        this.denominacion = denominacion
        this.categoriaPadre = categoriaPadre
        this.activo = activo
    }
}