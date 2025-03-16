import solicitud from "./solicitud.js";
export const getTareas= async(URL,usuario)=>{

    return  await    solicitud(`${URL}/todos?userId=${usuario.id}`) 
    
}