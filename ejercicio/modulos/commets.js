import solicitud from "./solicitud.js";
export const getCommets=async(URL,post)=>{
    return  await solicitud(`${URL}/comments?postId=${post.id}`)
}