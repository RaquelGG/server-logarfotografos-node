const mysql = require("mysql2/promise");
const { host, user, password, database } = require("./.auth.json");

const conexion = {}

let con;
// CONEXION A LA BD (usamos createPool para que la conexión se abra y se cierre automáticamente)
async function connect() {
    console.log("Conectando a la base de datos...");
    con = await mysql.createConnection({
        host,
        user,
        password,
        database,
    });
    console.log("Se ha conectado correctamente con la base de datos de MySQL");
}

(async () => {
    conPromise = connect();
    await conPromise;
})();

// Comprobamos la conexión
async function comprobarConexion() {
    if (conPromise) {
        await conPromise;
    } else if (!con || con.state !== "connected") {
        conPromise = connect();
        await conPromise;
    }
}

// Obtenemos las fotos para cada boda o para la galería pública
conexion.obtenerFotos = async function obtenerFotos(id_boda) {
    await comprobarConexion();
    try {
        const [rows] = await con.execute(`
            SELECT url, nombre, tipo
            FROM Fotos 
            WHERE id_boda = ?
        `, [id_boda]);
        if (rows.length == 0) return null;
        const result = rows.map(row => ({
            src: row.url.replace("undefined", ""),
            thumbnail: row.url.replace("undefined", "m"),
            alt: row.nombre, 
            tags: [row.tipo],
            //thumbnailWidth: getRndInteger(2, 6),
            //thumbnailHeight: getRndInteger(2, 6)
            thumbnailWidth: getRndInteger(2, 10),
            thumbnailHeight: 'auto'
        }));
        return JSON.stringify(result);
    } catch (e) {
        console.error(`Error al devolver las urls: ${e}`);
    }
    return null;
}

// Obtenemos una foto de fondo
conexion.obtenerUrlFondo =  async function obtenerUrlFondo(id_foto) {
    await comprobarConexion();
    try {
        const [rows] = await con.execute(`
            SELECT url 
            FROM Fotos 
            WHERE id_foto = ?
        `, [id_foto]);
        if (rows.length == 0) return null;
        const row = rows[0];
        return row.url;
    } catch (e) {
        console.error(`Error al devolver la url: ${e}`);
    }
    return null;
}

// Comprueba si el usuario es correcto
conexion.comprobarUsuario =  async function comprobarUsuario(user, pass) {
    await comprobarConexion();
    try {
        const [rows] = await con.execute(`
            SELECT count(id_usuario) as count
            FROM Usuarios 
            WHERE user = ?
            AND pass = ?
        `, [user, pass]);
        if (rows.length == 0) return 0;
        const row = rows[0];
        if (row.count == 1)
            return 1;
    } catch (e) {
        console.error(`Error al comprobar usuario: ${e}`);
    }
    return 0;
}

// Borra las fotos de una galería
conexion.borrarFotosSeleccion =  async function borrarFotosSeleccion(user, pass, id_boda) {
    await comprobarConexion();
    if (await comprobarUsuario(user, pass) || await comprobarAdmin(user, pass)) {
        try {
            const [rows] = await con.execute(`
                DELETE Fotos 
                FROM Fotos 
                WHERE id_boda = ?;
            `, [id_boda]);
            
            return 1;
        } catch (e) {
            console.error(`Error al comprobar usuario: ${e}`);
        }
    }
    return 0;
}

// PARTE ADMINISTRADOR ---------------------------------------

// Comprueba si el ADMIN es correcto
conexion.comprobarAdmin =  async function comprobarAdmin(user, pass) {
    await comprobarConexion();
    try {
        const [rows] = await con.execute(`
            SELECT COUNT(id_usuario) as count
            FROM Usuarios 
            WHERE user = ?
            AND pass = ?
            AND esAdmin = 1
        `, [user, pass]);
        if (rows.length == 0) return 0;
        const row = rows[0];
        if (row.count == 1)
            return 1;
    } catch (e) {
        console.error(`Error al comprobar usuario: ${e}`);
    }
    return 0;
}

// Devuelve los datos de los clientes si está ADMIN logueado
conexion.obtenerDatosSeleccion = async function obtenerDatosSeleccion(user, pass) {
    await comprobarConexion();
    if (await comprobarAdmin(user, pass)) {
        try {
            const [rows] = await con.execute(`
            SELECT id_boda, fecha, eleccion
            FROM Usuarios, Bodas
            WHERE Usuarios.id_usuario=Bodas.id_usuario;
            `);
            if (rows.length == 0) return null;
            const row = rows[0];
            return row.id_usuario;
        } catch (e) {
            console.error(`Error al obtener los datos de los clientes: ${e}`);
        }
    }
    return null;
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


module.exports = conexion;