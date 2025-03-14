import {getUsuarios,getPost,getCommets, getAlbuns, getFotos, getTareas} from "./modulos/index.js";
const URL = "https://jsonplaceholder.typicode.com";
const nombreusu="juan";


const manejardatos = async () => {
    const usuarios =  await getUsuarios(URL);
    return await Promise.all(usuarios.map(async(usuario)=>{
        const posts = await getPost(URL,usuario);
        const comentPost = await Promise.all( posts.map(async(post)=>{
            const coments = await getCommets(URL,post);
            return {...post,coments};
        }));

        const albuns = await getAlbuns(URL,usuario);
        const albunPost = await Promise.all( albuns.map(async(albu)=>{
            const fotos = await getFotos(URL,albu);
            return {...albu,fotos};
        }));


        return {...usuario,comentPost,albunPost};
        


    }));
};





const listarTareasPendientes = async () => {
    const usuarios = await getUsuarios(URL);

    return await Promise.all(
        usuarios.map(async (usuario) => {
            
            const tareas = await getTareas(URL, usuario);

            
            const tareaPostPendientes = tareas.filter(task => task.completed === false);

            
            return { ...usuario, tareaPostPendientes };
        })
    );
};




let ejecutable=prompt("QUE EJERCICIO DESEAS EJECUTAR: \n\n 1) LISTAR USUARIOS CON SUS TAREAS PENDIENTES\n"
    +"\n2) INGRESAR NOMBRE DE USUARIO A BUSCAR Y VER INFO Y ALBUNES");

switch (ejecutable) {
    case "1":
        listarTareasPendientes().then((data)=>{
            console.log(data);
        });
        break;
        
    case "2":
        listarTareasPendientes().then((data)=>{
            console.log(data);
        });
        break;

    case "3":
        listarTareasPendientes().then((data)=>{
            console.log(data);
        });
        break;

    case "4":
        listarTareasPendientes().then((data)=>{
            console.log(data);
        });
        break;

    case "5":
        listarTareasPendientes().then((data)=>{
            console.log(data);
        });
        break;

    default:
        manejardatos().then((data)=>{
            console.log(data);
            
        })
        alert("ingrese numeros validos")
        break;
}