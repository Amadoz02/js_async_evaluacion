import {listarTareasPendientes} from "../Modulos/tareas/index.js";
import { listarUsuarios, listarUsuarioPorUsername } from "../Modulos/usuario/index.js";
import { listarAlbumesPorUsuario } from "../Modulos/albunes/index.js";
import { listarFotosPorAlbum } from "../Modulos/fotos/index.js";
const URL = "https://jsonplaceholder.typicode.com";


// const manejardatos = async () => {//creamos funcion expresada para manejar los datos de los usuarios
//     const usuarios =  await getUsuarios(URL);//con ayuda del modulo get usuarios traemos los datos de la url
//     return await Promise.all(usuarios.map(async(usuario)=>{//funcion asyncronaque espera a que todas susu promesas internas se solucionen para que el codigo continue, 
//         //con ayuda de map iteramos el arreglo de objetos traido de la url
//         const posts = await getPost(URL,usuario);//esperamos a que se traigan los datos de los post sin errores 
//         const comentPost = await Promise.all( posts.map(async(post)=>{
//             const coments = await getCommets(URL,post);
//             return {...post,coments};
//         }));

//         const albuns = await getAlbuns(URL,usuario);
//         const albunPost = await Promise.all( albuns.map(async(albu)=>{
//             const fotos = await getFotos(URL,albu);
//             return {...albu,fotos};
//         }));


//         return {...usuario,comentPost,albunPost};
        


//     }));
// };






// const buscarUsuarios = async (nombreUsuario) => {
//     const usuarios = await getUsuarios(URL);
//     const filtroUsuario = usuarios.filter(usuario => usuario.username.toLowerCase() === nombreUsuario.toLowerCase());

    
//     const resultado = await Promise.all(filtroUsuario.map(async (usuario) => {
//         const albuns = await getAlbuns(URL, usuario);
       
        
//         const albunsConFotos = await Promise.all(albuns.map(async (album) => {
//             const fotos = await getFotos(URL, album);
//             return { ...album, fotos };
//         }));

        
        

//         return { ...usuario, albunsConFotos };
//     }));

//     return resultado;
// };



const datosUsuarios=async ()=>{
    const usuarios =  await getUsuarios(URL);
    return await Promise.all(usuarios.map(async(usuario)=>{
        const nombre=usuario.username ;
        const tel=usuario.phone;
            return {nombre, tel};
    }));
};




const usuarios_tareasP = async () => {
    const usuarios = await listarUsuarios();
    const tareasPendientes = await listarTareasPendientes();

    // Combinar usuarios con sus tareas pendientes
    const usuariosConTareas = usuarios.map(usuario => ({
        ...usuario,
        tareasPendientes: tareasPendientes.filter(tarea => tarea.userId === usuario.id)
    }));

    return usuariosConTareas;
};


// Función para buscar un usuario por username y mostrar sus álbumes con fotos
const buscarUsuarioYMostrarAlbumes = async (username) => {
    const usuario = await listarUsuarioPorUsername(username);
    if (!usuario) {
        console.log(` No se encontró el usuario: ${username}`);
        return;
    }

    const albumes = await listarAlbumesPorUsuario(usuario.id);
    const albumesConFotos = await Promise.all(
        albumes.map(async (album) => ({
            ...album,
            fotos: await listarFotosPorAlbum(album.id)
        }))
    );


    return{ ...usuario, albumes: albumesConFotos };
};


let ejecutable=prompt("QUE EJERCICIO DESEAS EJECUTAR: \n\n 1) LISTAR USUARIOS CON SUS TAREAS PENDIENTES\n"
    +"\n2) INGRESAR NOMBRE DE USUARIO A BUSCAR Y VER INFO Y ALBUNES"
    +"\n3) INGRESAR NOMBRE DE USUARIO A BUSCAR Y VER INFO Y ALBUNES"
    +"\n4) INGRESAR NOMBRE DE USUARIO A BUSCAR Y VER INFO Y ALBUNES");

switch (ejecutable) {
    case "1":
        usuarios_tareasP().then((data)=>{
            console.log(data);
        });
        break;

    case "2":
        let nombre= prompt("ingrese el nombre de la persona a buscar: ")
        buscarUsuarioYMostrarAlbumes(nombre).then((data)=>{
            console.log(data);
        });
        break;

    case "3":
        listarTareasPendientes().then((data)=>{
            console.log(data);
        });
        break;

    case "4":
        datosUsuarios().then((data)=>{
            console.log(data);
        });
        break;

    case "5":
        manejardatos().then((data)=>{
            console.log(data);
            
        })
        break;

    default:
       
        alert("ingrese numeros validos")
        break;
}