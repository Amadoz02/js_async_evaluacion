export const obtenerDatos = async (url) => {
    try {
        const response = await fetch(url);

            return await response.json();
        
    } catch (error) {
        console.error("Error al obtener datos:", error.message);
        return [];
    }
};
