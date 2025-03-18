import { obtenerDatos } from "../utils/fetch.js";
import { URL_POSTS } from "../utils/urls.js";

export const listarPostsPorTitulo = async (titulo) => {
    const posts = await obtenerDatos(URL_POSTS);

    return posts.filter(post => post.title.toLowerCase().includes(titulo.toLowerCase()));
};
