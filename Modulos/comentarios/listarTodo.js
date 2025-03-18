import { obtenerDatos } from "../utils/fetch.js";
import { URL_COMENTARIOS } from "../utils/urls.js";


export const listarTodosLosComentarios = async () => {
    return await obtenerDatos(URL_COMENTARIOS)
};