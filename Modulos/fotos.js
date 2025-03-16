import solicitud from "./solicitud.js";
export const getFotos=async(URL,albun)=>{
    return  await solicitud(`${URL}/photos?albumId=${albun.id}`)
}