import { obtenerDatos } from "../utils/fetch.js";

const URL_TODOS = "https://jsonplaceholder.typicode.com/todos";

export const listarTareas = async () => {
    try {
        const tareas = await obtenerDatos(URL_TODOS);
        return tareas;
    } catch (error) {
        console.error("Error al listar tareas:", error);
    }
};
