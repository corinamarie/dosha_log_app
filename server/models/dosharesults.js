var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//sub document schema for quiz results;
//each quiz instance is saved as new object schema in dosharesults array user property
var DoshaQuizResultsSchema = new Schema({
    //date: {
    //    type: Date,
    //    default: Date.now
    //},
    doshabalance: String,
    quizresults: {
        vatapts: Number,
        pittapts: Number,
        kaphapts: Number
    }
});

module.exports = mongoose.model('dosharesults', DoshaQuizResultsSchema);