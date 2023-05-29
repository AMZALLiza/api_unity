//les imports 
var bodyParser = require('body-parser');
var express = require('express');
var apiRouter = require('./apiRouter').router;

// Instancier 
var server = express();

//body parser 
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//configure routes 
server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Helllllllllllllllo</h1>')

});

server.use('/api/', apiRouter);
//launch server

server.listen(8080, function(){
    console.log('Server en écoute');
})