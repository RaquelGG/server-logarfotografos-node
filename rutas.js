const { Router } = require('express');
const router = Router();

const { obtenerUrl, obtenerUrlFondo } = require("./sentencias");


router.get('/obtenerUrl/:id_boda', function (req, res) {
    obtenerUrl(req.params.id_boda)
        .then(url => {
            if (url) {
                console.log({ url });
                res.render("sentencias/obtenerUrl", {
                    url: url,
                });
            } else {
                return res.status(500).send("No existe una foto el id especificado");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo la url de la foto");
        });
});

router.get('/obtenerUrlFondo/:id_foto', function (req, res) {
    obtenerUrlFondo(req.params.id_foto)
        .then(url => {
            if (url) {
                console.log({ url });
                res.render("sentencias/obtenerUrlFondo", {
                    url: url,
                });
            } else {
                return res.status(500).send("No existe una foto el id especificado");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo la url de la foto");
        });
});

export default router;