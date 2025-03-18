import { obtenerDatos } from "../utils/fetch.js";
import { URL_USUARIOS } from "../utils/urls.js";

export const listarUsuarioPorUsername = async (nombreUsuario) => {
    const usuarios = await obtenerDatos(URL_USUARIOS);
    
    return usuarios.find(usuario => usuario.username.toLowerCase() === nombreUsuario.toLowerCase()) || "usuario no encontrado";
};
