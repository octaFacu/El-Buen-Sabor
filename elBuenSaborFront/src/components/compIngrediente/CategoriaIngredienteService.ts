export  class CategoriaIngredienteService{
    
    baseUrl = "http://localhost:8080/categoria"

    //Trae todas categorias de ingrediente
    async getAll(){
        
        try {
            
            let res = await fetch(this.baseUrl)

            if(!res.ok){
                throw {status: res.status, statusText: res.statusText}
            }
    
            let jsonRes = await res.json()
            return jsonRes

        } catch (err: any) {
            console.log(`Error ${err.status}: ${err.statusText}`);
        }
    }

    //Trae todas categorias de ingrediente que no tengan padre
    async getAllPadres(){
        
        try {
            
            let res = await fetch(this.baseUrl+"/padres")

            if(!res.ok){
                throw {status: res.status, statusText: res.statusText}
            }
    
            let jsonRes = await res.json()
            return jsonRes

        } catch (err: any) {
            console.log(`Error ${err.status}: ${err.statusText}`);
        }
    }



}