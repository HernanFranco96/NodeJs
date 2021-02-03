const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   // Al usar render nos permite enviar variables a los paginas indicadas
   res.render("index", {titulo : "Mi titulo dinamico"});
});

router.get('/servicios', (req, res) => {
   // Al usar render nos permite enviar variables a los paginas indicadas
   res.render("servicios", {tituloServicios : 'Titulo de Servicios'});
});

module.exports = router;