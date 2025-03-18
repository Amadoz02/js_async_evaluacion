import { obtenerDatos } from "../utils/fetch.js";//importamos la funcion obtenerDatos desde el archivo fetch.js ubicado en la carpeta utils
import { URL_FOTOS } from "../utils/urls.js";//importamos la constante URL_FOTOS desde el archivo urls.js ubicado en la carpeta utils

export const listarTodasLasFotos = async () => {//declaramos una funcion asincrona para listar todas las fotos
    
    return await obtenerDatos(URL_FOTOS);//esperamos que la funcion obtenerDatos traiga todas las fotos desde la url definida y retornamos el resultado
};
