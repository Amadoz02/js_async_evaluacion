import { obtenerDatos } from "../utils/fetch.js";

const URL_ALBUMES = "https://jsonplaceholder.typicode.com/albums";

export const listarAlbumesPorUsuario = async (userId) => {
    const albumes = await obtenerDatos(URL_ALBUMES);
    
    return albumes.filter(album => album.userId === userId);
};
