var bodyParser = require('body-parser');
var express = require('express');
var apiRouter = require('./apiRouter').router;
var mysql = require('mysql');
//this part of api is working******

// Instancier
var server = express();

//body parser
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure CORS headers
server.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//configure routes
server.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Hello</h1>');
});

// Endpoint GET pour récupérer les données de la base de données
server.get('/api/data', function(req, res) {
  // Configuration de la connexion à la base de données
  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'test',
    database: 'database_development_retro'
  });

  // Établissement de la connexion à la base de données
  connection.connect();

  connection.query('SELECT * FROM USERS', function(error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send('Une erreur est survenue lors de la récupération des données');
    } else {
      res.status(200).json(results);
    }
  });

  // Fermeture de la connexion à la base de données
  connection.end();
});

// Utilisez le router pour les autres routes
server.use('/api/', apiRouter);

server.use((error, req, res, next) => {
  res.status(error.status || 500).render('error', {
    msg: 'Please check back later!'
  });
});

//launch server
server.listen(8080, function() {
  console.log('Server en écoute');
});
