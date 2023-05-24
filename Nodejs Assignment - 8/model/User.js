const {Schema , model} = require('mongoose');

const UserSchema = new Schema({
    email : {type : String , unique : true , required : true},
    name : {type : String, required : true},
    password : {type : String, required : true},
    registeredOn : {type : Date},
    refreshToken : [String]
});

module.exports = model('user' , UserSchema);