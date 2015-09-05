var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//user schema to collect each user as an object;
//each time they take a quiz date + results will be saved as new object in array of "dosharesults" via sub document schema
var UserSchema = new Schema({
    username: {
        type:String,
        require: true,
        index: {
            unique: true
        }
    } ,
    dosharesults: []
    //doshatype: String
});

module.exports = mongoose.model('user', UserSchema);