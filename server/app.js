var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var user = require('./routes/user');
var index = require('./routes/index');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

///MONGO SETUP///

var mongoURI = 'mongodb://corinamarie:fatheragnes1535@ds035503.mongolab.com:35503/doshadata';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
    console.log('mongo connection error: ', err);
});

///ROUTES///
//app.use('/user', user);
app.use('/', index);

app.listen(app.get('port'), function(){
    console.log('listening to port: ' + app.get('port'));
});

module.exports = app;