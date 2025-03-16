import { obtenerDatos } from "../utils/fetch.js";

const URL_FOTOS = "https://jsonplaceholder.typicode.com/photos";

export const listarFotosPorAlbum = async (albumId) => {
    const fotos = await obtenerDatos(URL_FOTOS);
    
    return fotos.filter(foto => foto.albumId === albumId);
};
