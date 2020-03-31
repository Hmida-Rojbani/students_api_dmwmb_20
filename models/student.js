const mongoose = require('mongoose');

const student_schema = new mongoose.Schema({
    name : {type: String, require : true},
    age : Number,
    email : {type: String,require:true, unique :true}
});

const Student = mongoose.model('Student', student_schema);

module.exports.Student = Student;