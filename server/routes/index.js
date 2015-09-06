var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var User = require('../models/user');
var DoshaResults = require('../models/dosharesults');


//post call to save quiz results as new quiz object instance to mongoDB
router.post('/create', function(req, res, next){
    console.log(req.body);

    var user = new User({
        username: req.body.username
    });

    var doshaResultsArray = [];

    //giving document items unique id's in mongoDB
    //for(var i = 0; i < req.body.dosharesults.length; i++){
    //    var dosharesults = new DoshaResults({
    //        quizresults: req.body.dosharesults[i].quizresults,
    //        doshabalance: req.body.dosharesults[i].doshabalance
    //    });
    //    doshaResultsArray.push(dosharesults);
    //}

    user.dosharesults = doshaResultsArray;

    user.save(function(err){
        console.log(err.message);
    });

    res.json(req);
});

//get call to get data back from DB
router.get('/getData', function(req, res, next){
    console.log(res);
});

//wildcard get call
router.get('/*', function(req, res, next){
    var file = req.params[0] || '/assets/views/index.html';
    res.sendFile(path.join(__dirname, '../public', file));
});

module.exports = router;