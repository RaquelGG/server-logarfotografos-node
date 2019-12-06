var express = require('express');
var router = express.Router();
const { obtenerUrl, obtenerUrlFondo } = require("../conexion");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// OBTENER LAS FOTOS POR EL ID_BODA
router.get('/obtenerUrl/:id_boda', function (req, res) {
    obtenerUrl(req.params.id_boda)// recogemos el contenido en la url
        .then(url => {
            if (url) {
              console.log({ url }); // Mostramos por consola
              //res.render("resultado", { resultado: url}); // Mostramos en la web
              res.send(url);
          } else {
              return res.status(500).send("ERROR: No existe una foto el id especificado");
          }
        })
        .catch(err => {
            return res.status(500).send("ERROR: no se ha podido obtener la url de la foto");
        });
});

// OBTENER URL PARA EL FONDO POR EL ID
router.get('/obtenerUrlFondo/:id_foto', function (req, res) {
    obtenerUrlFondo(req.params.id_foto) // recogemos el contenido en la url
        .then(url => {
            if (url) {
                console.log({ url }); // Mostramos por consola
                //res.render("resultado", { resultado: url}); // Mostramos en la web
                res.send(url);
            } else {
                return res.status(500).send("ERROR: No existe una foto el id especificado");
            }
        })
        .catch(err => {
            return res.status(500).send("ERROR: no se ha podido obtener la url de la foto");
        });
});

/*router.get('/obtenerUrlFondo/:id_foto', function (req, res) {
  await obtenerUrlFondo(req.params.id_foto) // recogemos el contenido en la url
      .then(url => {
          if (url) {
              console.log({ url }); // Mostramos por consola
              res.render("resultado", { resultado: url}); // Mostramos en la web
              res.send(resultado);
          } else {
              return res.status(500).send("ERROR: No existe una foto el id especificado");
          }
      })
      .catch(err => {
          return res.status(500).send("ERROR: no se ha podido obtener la url de la foto");
      });*/

module.exports = router;
