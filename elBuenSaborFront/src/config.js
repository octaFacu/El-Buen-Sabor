import ConfigJson from "./auth_config.json"


export default function getConfig(){


    const audience = configJson.audience && ConfigJson.audience !== null ? ConfigJson.audience: null;

    return{
        domain: ConfigJson.domain,
        clientId: ConfigJson.clientId,
        ...(audience ? {audience} : null)
    }

}