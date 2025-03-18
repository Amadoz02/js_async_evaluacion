import { obtenerDatos } from "../utils/fetch.js"; // Importa la función para hacer peticiones a la API
import { URL_POSTS } from "../utils/urls.js";


export const listarTodosLosPosts = async () => {//declaramos una funcion asincrona sin parametros
    
    return await obtenerDatos(URL_POSTS);//esperamos a que obtenerDatos retorne todos los posts desde la url especificada y devolvemos el resultado
};
