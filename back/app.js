require('dotenv').config();

const express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose'),
    cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.Router());

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.get('/', function(req, res) {
  res.send("Mucha suerte, el equipo de SALUDELECTRONICA te espera");
});

routes = require('./routes/empleados')(app);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@technicaltest.ejbuapa.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority&appName=technicalTest`)
	.then(() => {
    console.log('Conexión con base de datos exitosa');
  }) 
  .catch((err) => {
		console.log('ERROR: No es posible conectarse con la base de datos, valide que el servicio de mongo este arriba ' + err);
  });

server.listen(3001, function() {
  console.log("Servidor arriba en http://localhost:3001");
});