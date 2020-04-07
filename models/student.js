const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const student_schema = new mongoose.Schema({
    name : {type: String, required : true},
    age : Number,
    email : {type: String,require:true, unique :true},
    extra_price: {type:Number, required : function () {return this.age>25}},
    class_room: {
        class_id : {type: mongoose.Schema.ObjectId, ref:'ClassRoom'},
        name : {type:String, required : true, enum : ['GLSI','DMWM','DSEN','SSIR']}
    }
});

const Student = mongoose.model('Student', student_schema);

student_validator = {
    name : Joi.string().min(3).required(),
    age: Joi.number().positive(),
    email: Joi.string().email().required(),
    extra_price :Joi.number().positive(),
    class_room : {
        class_id : Joi.objectid().required(),
        name : Joi.string().length(4).required()
    }
};

student_opt_validator = {
    name : Joi.string().min(3),
    age: Joi.number().positive(),
    min_age: Joi.number().positive(),
    max_age: Joi.number().positive(),
    email: Joi.string().email(),
    extra_price :Joi.number().positive(),
    class_room : {
        class_id : Joi.objectid(),
        name : Joi.string().length(4)
    }
    
};

id_validator = {
    id: Joi.objectid()
};

var student_not_valid_fun = (student) => {
    var results = Joi.validate(student,student_validator);
    return results.error;
}

var student_not_valid_opt_fun = (student) => {
    var results = Joi.validate(student,student_opt_validator);
    return results.error;
}

var id_not_valid_fun = (id) => {
    var results = Joi.validate(id,id_validator);
    return results.error;
}
module.exports.Student = Student;
module.exports.student_not_valid_fun = student_not_valid_fun;
module.exports.id_not_valid_fun = id_not_valid_fun;
module.exports.student_not_valid_opt_fun = student_not_valid_opt_fun;
