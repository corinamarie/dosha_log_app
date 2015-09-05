var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var DoshaResults = require('../models/dosharesults');

router.post('/create', function(req, res, next){
    console.log(req.body);

    var user = new User({
        username: req.body.username
    });

    var doshaResultsArray = [];

    //giving document items unique id's in mongoDB
    for(var i = 0; i < req.body.dosharesults.length; i++){
        var dosharesults = new DoshaResults({
            quizresults: req.body.dosharesults[i].quizresults,
            doshabalance: req.body.dosharesults[i].doshabalance
        });
        doshaResultsArray.push(dosharesults);
    }

    user.dosharesults = doshaResultsArray;

    user.save(function(err){
        console.log(err.message);
    });

    res.json(user)
});
//
//router.get('/getData', function(req, res, next){
//    console.log(res);
//});

module.exports = router;