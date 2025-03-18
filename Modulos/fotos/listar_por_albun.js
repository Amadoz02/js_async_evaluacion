import { obtenerDatos } from "../utils/fetch.js";
import { URL_FOTOS } from "../utils/urls.js";

export const listarFotosPorAlbum = async (albumId) => {
    const fotos = await obtenerDatos(URL_FOTOS);
    
    return fotos.filter(foto => foto.albumId === albumId);
};
