import { obtenerDatos } from "../utils/fetch.js";

import { URL_TODOS } from "../utils/urls.js";

export const listarTareas = async () => {//declaramos una funcion asincrona sin parametros encargada de listar todas las tareas
    try {//usamos try para manejar posibles errores
        
        const tareas = await obtenerDatos(URL_TODOS);//esperamos a que obtenerDatos nos retorne la lista de tareas y la almacenamos en la constante tareas
        return tareas;//devolvemos las tareas obtenidas

    } catch (error) {//si ocurre un error en el bloque try
        console.error("Error al listar tareas:", error);//mostramos un mensaje en consola indicando el error
    }
};
