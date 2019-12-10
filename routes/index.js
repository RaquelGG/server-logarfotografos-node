const express = require('express');
const router = express.Router();
const conexion = require("../conexion");




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// OBTENER LAS FOTOS POR EL ID_BODA
router.get('/obtenerFotos/:id_boda', async (req, res) => {
    try {
        const url = await conexion.obtenerFotos(req.params.id_boda)// recogemos el contenido en la url
        console.log({ url }); // Mostramos por consola
        res.send(url);

    } catch (err) {
        return res.status(500).send("ERROR: no se ha podido obtener la url de la foto");
    }
});

// OBTENER URL PARA EL FONDO POR EL ID
router.get('/obtenerUrlFondo/:id_foto', async (req, res) => {
    try {
        const url = await conexion.obtenerUrlFondo(req.params.id_foto);
        console.log({ url }); // Mostramos por consola
        res.send(url);

    } catch(err) {
        return res.status(500).send("ERROR: no se ha podido obtener la url de la foto");
    }
});

// Comprobar si el usuario existe y recoger su ID
router.post('/comprobarUsuario', async (req, res) => {
    try {
        console.log('El usuario recibido es:',req.body.user);
        console.log('con contraseña:',req.body.pass);
        const id = await conexion.comprobarUsuario(req.body.user, req.body.pass);
        console.log(`resultado: ${ id }`); // Mostramos por consola
        res.send(`${id}`);
    }catch(err) {
        return res.status(500).send(`ERROR: no se ha podido obtener la id del usuario`);
    }
});

// Comprobar si el usuario existe y si es admin
router.post('/comprobarAdmin', async (req, res) => {
    try {
        console.log('El usuario recibido es:' ,req.body.user);
        console.log('con contraseña:', req.body.pass);
        const id = await conexion.comprobarAdmin(req.body.user, req.body.pass);
        console.log(`resultado: ${ id }`); // Mostramos por consola
        res.send(`${id}`);
    }catch(err) {
        return res.status(500).send(`ERROR: no se ha podido obtener la id del usuario`);
    }
});

// Devuelve los datos de selección si el Admin está logueado
router.post('/obtenerDatosSeleccion', async (req, res) => {
    try {
        console.log('El usuario recibido es:',req.body.user);
        console.log('con contraseña:',req.body.pass);
        const datos = await conexion.obtenerDatosSeleccion(req.body.user, req.body.pass);
        console.log({ datos }); // Mostramos por consola
        res.send(datos);
    }catch(err) {
        return res.status(500).send(`ERROR: no se han podido obtener los datos de seleccion`);
    }
});

// Devuelve los datos de selección si el Admin está logueado
router.post('/borrarFotosSeleccion', async (req, res) => {
    try {
        console.log('El usuario recibido es:',req.body.user);
        console.log('con contraseña:',req.body.pass);
        const datos = await conexion.borrarFotosSeleccion(req.body.user, req.body.pass, req.body.id_boda);
        console.log({ datos }); // Mostramos por consola
        res.send(datos);
    }catch(err) {
        return res.status(500).send(`ERROR: no se han podido borrar las fotos usuario`);
    }
});

module.exports = router;
