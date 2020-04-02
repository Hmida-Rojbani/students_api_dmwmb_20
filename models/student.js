const mongoose = require('mongoose');
const Joi = require('joi');

const student_schema = new mongoose.Schema({
    name : {type: String, require : true},
    age : Number,
    email : {type: String,require:true, unique :true}
});

const Student = mongoose.model('Student', student_schema);

student_validator = {
    name : Joi.string().min(3).required(),
    age: Joi.number().positive(),
    email: Joi.string().email().required()
};

var student_not_valid_fun = (student) => {
    var results = Joi.validate(student,student_validator);
    return results.error;
}

module.exports.Student = Student;
module.exports.student_not_valid_fun = student_not_valid_fun;