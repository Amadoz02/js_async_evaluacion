import {listarTareasPendientes} from "../Modulos/tareas/index.js";
import { listarUsuarios, listarUsuarioPorUsername } from "../Modulos/usuario/index.js";
import { listarAlbumesPorUsuario,listarTodosLosAlbunes } from "../Modulos/albunes/index.js";
import { listarFotosPorAlbum,listarTodasLasFotos } from "../Modulos/fotos/index.js";
import { listarPostsPorTitulo, listarTodosLosPosts} from "../Modulos/post/index.js";
import { listarComentariosPorPost,listarTodosLosComentarios } from "../Modulos/comentarios/index.js";



const filtrarUsuariosNombreTelefono = async () => {
    const usuarios = await listarUsuarios();

    return usuarios.map(usuario => ({
        nombre: usuario.name,
        telefono: usuario.phone
    }));
};

const buscarPostsYComentarios = async (titulo) => {
    const posts = await listarPostsPorTitulo(titulo);

    if (posts.length === 0) {
        console.log(`No se encontraron posts con el título: ${titulo}`);
        return;
    }

    const postsConComentarios = await Promise.all(
        posts.map(async (post) => ({
            ...post,
            comentarios: await listarComentariosPorPost(post.id),
        }))
    );

    return postsConComentarios;
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


    return{ ...usuario, albumesConFotos };
};



const obtenerUsuariosConTodo = async () => {
    // Obtener TODOS los datos de una sola vez
    const [usuarios, posts, comentarios, albumes, fotos] = await Promise.all([
        listarUsuarios(),
        listarTodosLosPosts(),
        listarTodosLosComentarios(),
        listarTodosLosAlbunes(),
        listarTodasLasFotos()
    ]);

    //  Unir los datos localmente en memoria
    return usuarios.map(usuario => {
        // Filtrar posts del usuario y agregar comentarios
        const postsDelUsuario = posts.filter(post => post.userId === usuario.id).map(post => ({
            ...post,
            comentarios: comentarios.filter(comentario => comentario.postId === post.id)
        }));

        // Filtrar álbumes del usuario y agregar fotos
        const albumesDelUsuario = albumes.filter(album => album.userId === usuario.id).map(album => ({
            ...album,
            fotos: fotos.filter(foto => foto.albumId === album.id)
        }));

        return { ...usuario, postsDelUsuario, albumesDelUsuario };
    });
};



const menu = async () => {
    let ejecutable;
    do {
        ejecutable = prompt(
            "QUE EJERCICIO DESEAS EJECUTAR: \n\n" +
            "0) Salir\n" +
            "1) LISTAR USUARIOS CON SUS TAREAS PENDIENTES\n" +
            "2) INGRESAR NOMBRE DE USUARIO A BUSCAR Y VER INFO Y ALBUNES\n" +
            "3) INGRESAR NOMBRE DE POST A BUSCAR Y VER COMENTARIOS\n" +
            "4) CONSULTAR USUARIOS Y LISTAR SOLO NOMBRE Y TELÉFONO\n" +
            "5) LISTAR USUARIOS CON TODOS SUS POSTS, COMENTARIOS, ALBUNES Y FOTOS"
        );

        switch (ejecutable) {
            case "1":
                console.log(await usuarios_tareasP());
                break;
            case "2":
                let nombre = prompt("Ingrese el nombre de la persona a buscar:");
                console.log(await buscarUsuarioYMostrarAlbumes(nombre));
                break;
            case "3":
                let nombrePost = prompt("Ingrese el nombre del post a buscar:");
                console.log(await buscarPostsYComentarios(nombrePost));
                break;
            case "4":
                console.log(await filtrarUsuariosNombreTelefono());
                break;
            case "5":
                console.log(await obtenerUsuariosConTodo());
                break;
            case "0":
                alert("Saliendo del programa...");
                break;
            default:
                alert("Ingrese un numero valido");
                break;
        }
    } while (ejecutable !== "0");
};

// Llamar a la función del menú para que se ejecute automáticamente
menu();