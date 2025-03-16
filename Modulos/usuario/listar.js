import { obtenerDatos } from "../utils/fetch.js";

const URL_USUARIOS = "https://jsonplaceholder.typicode.com/users";

export const listarUsuarios = async () => {
    return await obtenerDatos(URL_USUARIOS);
};
