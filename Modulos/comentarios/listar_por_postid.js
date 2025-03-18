import { obtenerDatos } from "../utils/fetch.js";
import { URL_COMENTARIOS } from "../utils/urls.js";

export const listarComentariosPorPost = async (postId) => {
    const comentarios = await obtenerDatos(URL_COMENTARIOS);

    return comentarios.filter(comentario => comentario.postId === postId);
};
