
const router = require('express').Router();
const { Student, student_not_valid_fun } = require('../models/student');
const _ = require('lodash');


router.get('',async (req,res)=>{
    
    const students = await Student.find();
    if(students.length === 0)
        return res.status(204).end();
    res.send(students);
})

router.post('',async (req,res)=>{
    let results = student_not_valid_fun(req.body);
    if(results)
        return res.status(400).send(results.details[0].message);
    const student = new Student(_.pick(req.body,['name','age','email']));
    try{
        const saved_student = await student.save();
        res.status(201).send(saved_student);
    }catch(err){
        res.status(400).send(`Error : ${err.message}`);
    }
    
})





module.exports = router;