var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
//var User = require('../models/user');
var DoshaResults = require('../models/dosharesults');


//post call to save quiz results as new quiz object instance to mongoDB
//router.post('/create', function(req, res, next){
//    console.log("post call init ", req.body);
//
//    DoshaResults.create(req.body, function(err){
//        //res.json(post);
//        res.send("database object added successfully!");
//        if(err){
//            console.log("error: ", err);
//            //next(err);
//        }
//        console.log("post call complete; ", res.body);
//    });
//
//    //var doshaResultsArray = [];
//    //
//    //var user = new User({
//    //    username: req.body.username,
//    //    dosharesults: doshaResultsArray
//    //});
//
//    //giving document items unique id's in mongoDB
//    //for(var i = 0; i < req.body.dosharesults.length; i++){
//    //    var dosharesults = new DoshaResults({
//    //        quizresults: req.body.dosharesults[i].quizresults,
//    //        doshabalance: req.body.dosharesults[i].doshabalance
//    //    });
//    //    doshaResultsArray.push(dosharesults);
//    //}
//
//    //user.dosharesults = doshaResultsArray;
//    //
//    //user.save(function(err){
//    //    console.log(err.message);
//    //});
//    //
//    //res.json(req);
//});


router.post('/create', function(req, res){

    console.log("post req: ", req.body);
    console.log("post res: ", res.body);
    var results = new DoshaResults({
        doshabalance: req.body.doshabalance,
        quizresults: req.body.quizresults
    });
    console.log("post call results var: ", results);

    results.save(function(err) {
        if (err)console.log("uh-oh...", err);
        console.log("the create post call worked!");
    });
    res.send("results saved");
    console.log("post req 2: ", req.body);
    console.log("post res 2: ", res.body);

});

// EX CAN BE DELETED
//router.get('/', function(req, res){
//    resources.find({}, function(err,docs) {
//        if (err) {
//            res.send({error:err});
//        } else {
//
//            res.json({resources:docs});
//        }
//
//    });
//
//});
//
//

//get call to get data back from DB
router.get('/getData', function(req, res, next){
    dosharesults.find(function(err, results){
        if (err) {
            res.send({error:err});
        } else {
            res.json(results);
        }
    });
    console.log("this is the router get call res.body", res.body);
    console.log("this is the router get call req ", req.body);
});

//wildcard get call
router.get('/*', function(req, res, next){
    var file = req.params[0] || '/assets/views/index.html';
    res.sendFile(path.join(__dirname, '../public', file));
});

module.exports = router;