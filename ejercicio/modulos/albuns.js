import solicitud from "./solicitud.js";
export const getAlbuns= async(URL,usuario)=>{
    return  await    solicitud(`${URL}/albums?userId=${usuario.id}`) 
    
}