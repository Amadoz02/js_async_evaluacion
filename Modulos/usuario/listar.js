import { obtenerDatos } from "../utils/fetch.js";
import { URL_USUARIOS } from "../utils/urls.js";


export const listarUsuarios = async () => {//declaramos una funcion asincrona para listar usuarios
    return await obtenerDatos(URL_USUARIOS);//esperamos que obtenerDatos nos retorne los usuarios y los devolvemos
};
