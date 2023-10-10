import { ServiceBasicos } from "./ServiceBasicos";

export class UsuarioService extends ServiceBasicos {
    url = "http://localhost:8080/usuario";

    constructor() {
        super("usuario");
    }


}