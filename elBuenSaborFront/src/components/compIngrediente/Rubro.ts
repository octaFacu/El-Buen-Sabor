export class Rubro{

    nombre: string = "";
	padre?: string = "";
    activo: boolean = true;

    constructor(nombre:string, padre: string, activo: boolean){
        this.nombre = nombre
        this.padre = padre
        this.activo = activo
    }
}