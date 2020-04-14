const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const jwt = require('jsonwebtoken')
const config = require('config')

const user_schema = new mongoose.Schema({
    name : {type:String, required : true},
    email : {type : String, unique :true, required :true},
    password : {type : String,  required :true},
    isAdmin : { type: Boolean , default : false}
})

user_schema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id, name : this.name, isAdmin : this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}

const user_valid = {
    name : Joi.string().min(4).required(),
    email : Joi.string().email().required(),
    password : Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})")).required(),

}

const user_login_valid = {
    username : Joi.string().email().required(),
    password : Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})")).required(),
}

function user_validate_fun(user){
    let results = Joi.validate(user, user_valid);
    return results.error;
}
function user_login_validate_fun(user){
    let results = Joi.validate(user, user_login_valid);
    return results.error;
}

const User = mongoose.model('User',user_schema);

module.exports.User =User;
module.exports.user_validate_fun = user_validate_fun;
module.exports.user_login_validate_fun = user_login_validate_fun;