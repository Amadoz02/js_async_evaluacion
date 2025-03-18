export const obtenerDatos = async (url) => {//declaramos funcion asincrona que recibe una url como parametro
    try {//intentamos ejecutar el bloque de codigo
        const response = await fetch(url);//realizamos la peticion fetch a la url y esperamos la respuesta

        return await response.json();//convertimos la respuesta a formato json y la retornamos

    } catch (error) {//si ocurre un error en el bloque try
        console.error("Error al obtener datos:", error.message);//imprimimos en consola el mensaje de error
        return [];//retornamos un arreglo vacio para evitar que falle el programa
    }
};
