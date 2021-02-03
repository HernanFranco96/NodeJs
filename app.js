const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config();

const port = process.env.PORT || 3000;

// Conexión a base de datos
const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.crkgj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(url, 
   {useNewUrlParser: true, useUnifiedTopology: true}
)
   .then(() => console.log('Base de datos conectada'))
   .catch(e => console.log(e))

// Motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Ruta estatica
app.use(express.static(__dirname + "/public"));

// Rutas web
app.use('/', require('./router/Rutas'));
app.use('/mascotas', require('./router/Mascotas'));

// Sino se encuentra direccion, ira a una pagina 404 por default.
app.use((req, res, next) => {
   console.log(__dirname)
   res.status(404).render("404", {
      titulo: '404',
      descripcion: 'Página no encontrada'
   });
})

app.listen(port, () => {
   console.log('Servidor encendido, en el puerto: ', port);
});