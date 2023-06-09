//imports 
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var etudiantCtrl = require('./routes/etudiantCtrl');

//Router 
exports.router = (function() {
    var apiRouter = express.Router();

    //Users routes 
    apiRouter.route('/users/register').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);

    //pour l'etudiant
    apiRouter.route('/etudiants/reg').post(etudiantCtrl.login);


    return apiRouter;

})();