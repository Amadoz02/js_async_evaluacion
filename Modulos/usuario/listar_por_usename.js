import { obtenerDatos } from "../utils/fetch.js";
import { URL_USUARIOS } from "../utils/urls.js";

export const listarUsuarioPorUsername = async (nombreUsuario) => {//declaramos una funcion asincrona que recibe como parametro el nombre de usuario
    const usuarios = await obtenerDatos(URL_USUARIOS);//esperamos a que obtenerDatos nos retorne la lista de usuarios y la almacenamos en la constante usuarios
    
    return usuarios.find(usuario => usuario.username.toLowerCase() === nombreUsuario.toLowerCase()) || "usuario no encontrado";
    //buscamos en el arreglo de usuarios el que tenga un username igual al ingresado ignorando mayusculas y minusculas
    //si no se encuentra coincidencia retornamos "usuario no encontrado"
};
