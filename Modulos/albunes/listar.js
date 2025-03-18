import { obtenerDatos } from "../utils/fetch.js";
import { URL_ALBUMES } from "../utils/urls.js";


export const listarTodosLosAlbunes = async () => {
    return await obtenerDatos(URL_ALBUMES)
};