import { obtenerDatos } from "../utils/fetch.js";
import { URL_POSTS } from "../utils/urls.js";

export const listarPostsPorTitulo = async (titulo) => {//declaramos una funcion asincrona que recibe como parametro un titulo
    
    const posts = await obtenerDatos(URL_POSTS);//esperamos a que obtenerDatos retorne los posts desde la url especificada y los almacenamos en la constante posts

    return posts.filter(post => post.title.toLowerCase().includes(titulo.toLowerCase()));//filtramos los posts cuyo titulo contenga la cadena ingresada, ignorando mayusculas y minusculas
};
