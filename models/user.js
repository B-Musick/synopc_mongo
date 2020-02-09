var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose'); 

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: {type:String, default: ''},
    lastName: {type:String, default: ''},
    email: {type:String, default: ''}
});

userSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model('User',userSchema)