import { obtenerDatos } from "../utils/fetch.js";
import { URL_USUARIOS } from "../utils/urls.js";


export const listarUsuarios = async () => {
    return await obtenerDatos(URL_USUARIOS);
};
