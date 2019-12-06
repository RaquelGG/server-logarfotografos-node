import mysql from "mysql2/promise";
import { bodyParser, static } from 'express';
import { createPool } from 'mysql';

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: false });
    app.use(bodyParser());
    app.use(static(__dirname + '/public'));
});

// CONEXION A LA BD (usamos createPool para que la conexión se abra y se cierre automáticamente)
var client = createPool({
    host    : 'localhost',
    user    : 'Tecnologias_web1',
    password: 'Tecnologias_web1',
    database: 'logarfotografos'
});

async function connect() {
    log.info("Conectando a la base de datos...");
    con = await mysql.createConnection({
        host: "localhost",
        user,
        password,
        database,
    });
    log.info("Se ha conectado correctamente con la base de datos de MySQL");
}
