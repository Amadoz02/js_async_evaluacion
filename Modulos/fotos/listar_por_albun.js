import { obtenerDatos } from "../utils/fetch.js";
import { URL_FOTOS } from "../utils/urls.js";

export const listarFotosPorAlbum = async (albumId) => {//declaramos una funcion asincrona que recibe el id del album como parametro
    
    const fotos = await obtenerDatos(URL_FOTOS);//esperamos a que la funcion obtenerDatos traiga todas las fotos desde la url definida y las almacenamos en la variable fotos
    
    return fotos.filter(foto => foto.albumId === albumId);//filtramos las fotos para que solo retorne aquellas que coincidan con el id del album recibido como parametro
};
