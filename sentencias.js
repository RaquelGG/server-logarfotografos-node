const conexion = require("./conexion")
import * as conexion from "./conexion"

    /*// Obtener imagenes de una boda
    async function obtenerUrl(id_boda) {
        try {
            var resultado = await conexion.obtenerUrl(id_boda);
            return resultado;
        } catch {
            log.error();
        }
        
    }

    // Obtener imagen de fondo
    obtenerUrlFondo(id_foto) {
        return new Promise((resolve, reject) => {
            conexion.query('select url from Fotos where id_foto = ?',
                [id_foto],
                (err, resultados) => {
                    console.log({resultados});
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    }

    // Comprobar usuario
    iniciarSesion(user, pass) {
        return new Promise((resolve, reject) => {
            conexion.query('select id from Usuarios where user = ? and pass = ?',
                [user, pass],
                (err, resultados) => {
                    console.log({resultados});
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    }

    // PARTE ADMINISTRADOR ---------------------------------------

    // Coger datos de selección de imágenes
    obtenerDatosSeleccion() {
        return new Promise((resolve, reject) => {
            conexion.query('select id_boda, fecha, eleccion from Usuarios, Bodas where Usuarios.id_usuario=Bodas.id_usuario;',
                (err, resultados) => {
                    console.log({resultados});
                    if (err) reject(err);
                    else resolve();
                });
        });
    }
    
    // Borrar fotos
    borrarFotos(id_usuario) {
        return new Promise((resolve, reject) => {
            conexion.query('delete from Fotos where id_usuario = ?',
                [id_usuario],
                (err, resultados) => {
                    console.log({resultados});
                    if (err) reject(err);
                    else resolve();
                });
        });
    }*/