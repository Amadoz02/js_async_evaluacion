import {listarTareasPendientes} from "../Modulos/tareas/index.js";
import { listarUsuarios, listarUsuarioPorUsername } from "../Modulos/usuario/index.js";
import { listarAlbumesPorUsuario,listarTodosLosAlbunes } from "../Modulos/albunes/index.js";
import { listarFotosPorAlbum,listarTodasLasFotos } from "../Modulos/fotos/index.js";
import { listarPostsPorTitulo, listarTodosLosPosts} from "../Modulos/post/index.js";
import { listarComentariosPorPost,listarTodosLosComentarios } from "../Modulos/comentarios/index.js";


//EJERCICIO 1
const usuarios_tareasP = async () => {//declaramos una funcion expresada asincrona sin parametros
    const usuarios = await listarUsuarios();//esperamos a que la funcion listarUsuarios retorne los usuarios y los almacenamos en la constante usuarios
    const tareasPendientes = await listarTareasPendientes();//esperamos a que la funcion listarTareasPendientes retorne las tareas y las almacenamos en la constante tareasPendientes
    
    // recorremos los usuarios y le concatenamos sus tareas pendientes
    const usuariosConTareas = usuarios.map(usuario => ({//usamos map para recorrer cada usuario y devolver un nuevo objeto con sus tareas pendientes
        ...usuario,//mantenemos los datos originales del usuario
        tareasPendientes: tareasPendientes.filter(tarea => tarea.userId === usuario.id)//filtramos las tareas que pertenecen al usuario actual comparando el userId con el id del usuario
    }));
    
    return usuariosConTareas;//retornamos el arreglo de usuarios con sus tareas pendientes
};


//EJERCICIO 2
const buscarUsuarioYMostrarAlbumes = async (username) => {//declaramos una funcion expresada asincrona que recibe como parametro el nombre de usuario
    const usuario = await listarUsuarioPorUsername(username);//esperamos a que la funcion listarUsuarioPorUsername retorne el usuario que coincida con el nombre ingresado
    
    if (!usuario) {//si no se encontró un usuario con ese nombre
        console.log(` No se encontró el usuario: ${username}`);//imprimimos en consola que no se encontró el usuario
        return;//retornamos para salir de la funcion
    }
    
    const albumes = await listarAlbumesPorUsuario(usuario.id);//esperamos a que la funcion listarAlbumesPorUsuario retorne los albumes del usuario y los almacenamos en la constante albumes
    
    const albumesConFotos = await Promise.all(//esperamos que todas las promesas de los albumes con fotos se resuelvan
        albumes.map(async (album) => ({//recorremos los albumes con map y le asignamos una funcion asincrona
            ...album,//mantenemos los datos originales del album
            fotos: await listarFotosPorAlbum(album.id)//esperamos a que la funcion listarFotosPorAlbum retorne las fotos del album y las almacenamos en fotos
        }))
    );

    return { ...usuario, albumesConFotos };//retornamos el usuario con sus albumes y cada album con sus fotos
};

//EJERCICIO 3
const buscarPostsYComentarios = async (titulo) => {//declaramos funcion expresada de tipo asincrona que recibe como parametro el titulo del post
    const posts = await listarPostsPorTitulo(titulo);//esperamos q await nos traigo correctamente un resultado y almacenamos en la constante post los post listados por la funcion encargada de listar post por nombre
    
    if (posts.length === 0) {//si el arreglo retornado esta vacio
        console.log(`No se encontraron posts con el titulo: ${titulo}`);//imprimir que no se encontraron post
        return;//retornamos la funcion
    }//en caso contrario si post almacena algo
    
    const postsConComentarios = await Promise.all(//guardamos la respuenta de las promesas en postconComentarios
        posts.map(async (post) => ({//recorremos los post con map y le asignamos una calback asincrona
            ...post,//retornamos arreglo con el post individual y dentro de este le concatenamos los comentarios
            comentarios: await listarComentariosPorPost(post.id)//esperamos a que cada comentario se traiga de manera efectiva con ayuda de la funcio
            //listar comentarios por post al cual le pasamos el id del post y nos trae los comentarios de cada post
        }))
    );

    return postsConComentarios;//se retorna el arreglo de post con comentarios, luego de que todas las validaciones terminen
};


//EJERCICIO 4
const filtrarUsuariosNombreTelefono = async () => {//se declara una funcion asincrona que filtrara la informacion de los usuarios
    
    const usuarios = await listarUsuarios();//se obtiene la lista completa de usuarios desde la API

    return usuarios.map(usuario => ({//se recorre el arreglo de usuarios y se crea un nuevo arreglo con informacion especifica
        nombre: usuario.name,//se extrae el nombre del usuario y se asigna a la propiedad 'nombre'
        telefono: usuario.phone//se extrae el telefono del usuario y se asigna a la propiedad 'telefono'
    }));
};

//EJERCICIO 5
const obtenerUsuariosConTodo = async () => {//se declara una funcion asincrona que obtendra usuarios junto con sus posts, comentarios, albumes y fotos
    
    const [usuarios, posts, comentarios, albumes, fotos] = await Promise.all([//se ejecutan todas las funciones en paralelo para obtener la informacion necesaria
        listarUsuarios(),//trae la lista de usuarios
        listarTodosLosPosts(),//obtiene todos los posts
        listarTodosLosComentarios(),//recupera todos los comentarios
        listarTodosLosAlbunes(),//carga todos los albunes
        listarTodasLasFotos()//obtiene todas las fotos
    ]);

    return usuarios.map(usuario => {//se recorre cada usuario para asociarle sus datos correspondientes
        
        const postsDelUsuario = posts//se filtran los posts que pertenecen al usuario actual
            .filter(post => post.userId === usuario.id)//se verifica que el id del usuario coincida con el userId del post
            .map(post => ({//se transforma cada post agregando sus comentarios
                ...post,//se mantiene la estructura del post original
                comentarios: comentarios.filter(comentario => comentario.postId === post.id)//se asocian los comentarios que pertenecen al post
            }));

        const albumesDelUsuario = albumes//se filtran los albumes que corresponden al usuario actual
            .filter(album => album.userId === usuario.id)//se verifica que el id del usuario coincida con el userId del album
            .map(album => ({//se transforma cada album agregando sus fotos
                ...album,//se mantiene la estructura del album original
                fotos: fotos.filter(foto => foto.albumId === album.id)//se asocian las fotos que pertenecen al album
            }));

        return { ...usuario, postsDelUsuario, albumesDelUsuario };//se retorna el usuario con sus posts y albumes organizados
    });
};


//MENU
const menu = async () => {//declaramos una funcion asincrona llamada menu
    let ejecutable;//variable para almacenar la opcion ingresada por el usuario
    
    do {//ciclo do-while para ejecutar el menu al menos una vez
        
        ejecutable = prompt(//solicitamos al usuario que ingrese una opcion del menu
            "QUE EJERCICIO DESEAS EJECUTAR: \n\n" +//mensaje de instrucciones
            "0) Salir\n" +
            "1) LISTAR USUARIOS CON SUS TAREAS PENDIENTES\n" +
            "2) INGRESAR NOMBRE DE USUARIO A BUSCAR Y VER INFO Y ALBUNES\n" +
            "3) INGRESAR NOMBRE DE POST A BUSCAR Y VER COMENTARIOS\n" +
            "4) CONSULTAR USUARIOS Y LISTAR SOLO NOMBRE Y TELEFONO\n" +
            "5) LISTAR USUARIOS CON TODOS SUS POSTS, COMENTARIOS, ALBUNES Y FOTOS"
        );

        switch (ejecutable) {//evaluamos la opcion ingresada por el usuario
            
            case "1"://si el usuario ingresa "1"
                console.log(await usuarios_tareasP());//llamamos a la funcion para listar usuarios con sus tareas pendientes y mostramos el resultado en consola
                break;//salimos del switch

            case "2"://si el usuario ingresa "2"
                let nombre = prompt("Ingrese el nombre de la persona a buscar:");//pedimos el nombre del usuario a buscar
                console.log(await buscarUsuarioYMostrarAlbumes(nombre));//llamamos a la funcion correspondiente y mostramos el resultado en consola
                break;//salimos del switch

            case "3"://si el usuario ingresa "3"
                let nombrePost = prompt("Ingrese el nombre del post a buscar:");//pedimos el titulo del post a buscar
                console.log(await buscarPostsYComentarios(nombrePost));//llamamos a la funcion correspondiente y mostramos el resultado en consola
                break;//salimos del switch

            case "4"://si el usuario ingresa "4"
                console.log(await filtrarUsuariosNombreTelefono());//llamamos a la funcion que filtra usuarios por nombre y telefono y mostramos el resultado en consola
                break;//salimos del switch

            case "5"://si el usuario ingresa "5"
                console.log(await obtenerUsuariosConTodo());//llamamos a la funcion que obtiene toda la informacion de los usuarios y mostramos el resultado en consola
                break;//salimos del switch

            case "0"://si el usuario ingresa "0"
                alert("Saliendo del programa...");//mostramos un mensaje indicando que el programa terminara
                break;//salimos del switch

            default://si el usuario ingresa una opcion no valida
                alert("Ingrese un numero valido");//mostramos un mensaje de error
                break;//salimos del switch
        }

    } while (ejecutable !== "0");//el bucle seguira ejecutandose hasta que el usuario ingrese "0" para salir
};

menu();//llamamos a la funcion menu para iniciar el programa
