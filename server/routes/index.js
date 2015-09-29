var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
//var User = require('../models/user');
var DoshaResults = require('../models/dosharesults');


router.post('/create', function(req, res){

    var results = new DoshaResults({
        doshabalance: req.body.doshabalance,
        quizresults: req.body.quizresults
    });
    console.log("post call results var: ", results);

    results.save(function(err) {
        if (err)console.log("uh-oh...", err);
    });
    res.send(results.toJSON());
    console.log("post req 2: ", req.body);

});

//get call to get data back from DB
router.get('/getData', function(req, res, next){
    DoshaResults.find(function(err, results){
        if (err) {
            res.send({error:err});
        } else {
            res.json(results);
        }
    });
    console.log("this is the router get call req ", req.body);
});

//wildcard get call
router.get('/*', function(req, res, next){
    var file = req.params[0] || '/assets/views/index.html';
    res.sendFile(path.join(__dirname, '../public', file));
});

module.exports = router;