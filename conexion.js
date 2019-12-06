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
conexion.obtenerUrl = async function obtenerUrl(id_boda) {
    await comprobarConexion();
    try {
        const [rows] = await con.execute(`
            SELECT url 
            FROM Fotos 
            WHERE id_boda = ?
        `, [id_boda]);
        if (rows.length == 0) return null;
        // map aplica para cada elemento del array .[0] que en este caso es url
        return rows.map(row => row.url);
    } catch (e) {
        log.error(`Error al devolver las urls: ${e}`);
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
        log.error(`Error al devolver la url: ${e}`);
    }
    return null;
}

module.exports = conexion;