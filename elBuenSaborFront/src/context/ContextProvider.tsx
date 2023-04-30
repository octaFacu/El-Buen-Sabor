import { useEffect, useState } from "react";
import { ServiceBasicos } from "../services/ServiceBasicos";
import { GlobalContext } from "./GlobalContext"
import { unidadDeMedida } from "./interfaces/interfaces";




interface props {
    children: JSX.Element | JSX.Element[]
}

export const ContextProvider = ({ children }: props) => {
    const [unidadesDeMedida, setUnidadesDeMedida] = useState<unidadDeMedida[]>([]);
    const serviceBasicos = new ServiceBasicos();

    useEffect(() => {
      const fetchData = async () => {
        const data = await serviceBasicos.getAllBasic("unidadDeMedida");
        setUnidadesDeMedida(data);
      };
      fetchData();
    }, []);
  
    return (
      <GlobalContext.Provider value={{ unidadesDeMedida, setUnidadesDeMedida }}>
        {children}
      </GlobalContext.Provider>
    );
}