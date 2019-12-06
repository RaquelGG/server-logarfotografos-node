const conexion = require("./conexion");

(async () => {
    console.log(await conexion.obtenerUrl(1));
})();

