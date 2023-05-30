var bodyParser = require('body-parser');
var express = require('express');
var apiRouter = require('./apiRouter').router;
var db = require('./db'); // Importez votre module de gestion de la base de données

// Instancier 
var server = express();

//body parser 
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//configure routes 
server.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Hello</h1>');
});

// Endpoint GET pour récupérer les données de la base de données
server.get('/api/data', function(req, res) {
  // Utilisez votre module de gestion de la base de données pour récupérer les données
  db.getData(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Une erreur est survenue lors de la récupération des données');
    } else {
      res.status(200).json(data); // Renvoyer les données en format JSON
    }
  });
});

// Utilisez le router pour les autres routes
server.use('/api/', apiRouter);

//launch server
server.listen(8080, function(){
  console.log('Server en écoute');
});
