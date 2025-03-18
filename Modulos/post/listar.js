import { obtenerDatos } from "../utils/fetch.js"; // Importa la función para hacer peticiones a la API
import { URL_POSTS } from "../utils/urls.js";



export const listarTodosLosPosts = async () => {
    return await obtenerDatos(URL_POSTS)
};
