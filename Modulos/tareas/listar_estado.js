import { listarTareas } from "./listar.js";
//funcion que sera exportada
export const listarTareasPendientes = async () => {//declaramos una funcion asincrona sin parametros que listara solo tareas pendientes
    
    const tareas = await listarTareas();//esperamos a que listarTareas retorne todas las tareas y almacenamos el resultado en la constante tareas

    return tareas.filter(tarea => !tarea.completed);//filtramos las tareas y devolvemos solo aquellas que no estan completadas
};
