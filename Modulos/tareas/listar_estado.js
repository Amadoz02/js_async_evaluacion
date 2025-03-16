import { listarTareas } from "./listar.js";

export const listarTareasPendientes = async () => {
    const tareas = await listarTareas();
    return tareas.filter(tarea => !tarea.completed);
};
