import { obtenerDatos } from "../utils/fetch.js";
import { URL_ALBUMES } from "../utils/urls.js";
export const listarAlbumesPorUsuario = async (userId) => {
    const albumes = await obtenerDatos(URL_ALBUMES);
    
    return albumes.filter(album => album.userId === userId);
};
