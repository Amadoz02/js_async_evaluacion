import { obtenerDatos } from "../utils/fetch.js";

import { URL_TODOS } from "../utils/urls.js";

export const listarTareas = async () => {
    try {
        const tareas = await obtenerDatos(URL_TODOS);
        return tareas;
    } catch (error) {
        console.error("Error al listar tareas:", error);
    }
};
