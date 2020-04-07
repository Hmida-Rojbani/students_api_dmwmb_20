const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const class_room_schema = new mongoose.Schema({
    name : {type:String, required : true, enum : ['GLSI','DMWM','DSEN','SSIR']},
    nb_student : {type : Number, default :0},
    modules : [String]
})

const class_room_valid = {
    name : Joi.string().length(4).required(),
    nb_student : Joi.number().positive(),
    modules : Joi.array().items(Joi.string().min(3))
}

function class_room_validate_fun(classRoom){
    let results = Joi.validate(classRoom, class_room_valid);
    return results.error;
}

const ClassRoom = mongoose.model('ClassRoom',class_room_schema);

module.exports.ClassRoom =ClassRoom;
module.exports.class_room_validate_fun = class_room_validate_fun;