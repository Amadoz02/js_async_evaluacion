import { obtenerDatos } from "../utils/fetch.js";
import { URL_FOTOS } from "../utils/urls.js";


export const listarTodasLasFotos = async () => {
    return await obtenerDatos(URL_FOTOS)
};