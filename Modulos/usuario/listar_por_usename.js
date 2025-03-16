import { obtenerDatos } from "../utils/fetch.js";

const URL_USUARIOS = "https://jsonplaceholder.typicode.com/users";

export const listarUsuarioPorUsername = async (nombreUsuario) => {
    const usuarios = await obtenerDatos(URL_USUARIOS);
    
    return usuarios.find(usuario => usuario.username.toLowerCase() === nombreUsuario.toLowerCase()) || "usuario no encontrado";
};
