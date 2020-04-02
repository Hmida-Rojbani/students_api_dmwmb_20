
const router = require('express').Router();
const { Student, student_not_valid_fun, id_not_valid_fun, student_not_valid_opt_fun } = require('../models/student');
const _ = require('lodash');


router.get('',async (req,res)=>{
    const students = await Student.find();
    if(students.length === 0)
        return res.status(204).end();
    res.send(students);
})

router.get('/id/:id',async (req,res)=>{
    let results = id_not_valid_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    const student = await Student.findById(req.params.id);
    if(!student)
        return res.status(204).end();
    res.send(student);
})

router.get('/name/:name',async (req,res)=>{
    let results = student_not_valid_opt_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    const student = await Student.find({name:req.params.name});
    if(!student)
        return res.status(204).end();
    res.send(student);
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


router.delete('/id/:id',async (req,res)=>{
    let results = id_not_valid_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    const student = await Student.findByIdAndRemove(req.params.id);
    if(!student)
        return res.status(204).end();
    res.send(student);
})

router.delete('/name/:name',async (req,res)=>{
    let results = student_not_valid_opt_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    const student = await Student.findOneAndRemove({name:req.params.name});
    if(!student)
        return res.status(204).end();
    res.send(student);
})

router.delete('/all/name/:name',async (req,res)=>{
    let results = student_not_valid_opt_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    let student = { id:1};
    try{
        while(student)
        student = await Student.findOneAndRemove({name:req.params.name});
    }catch(ex){
        res.send(`Error : ${ex.message}`);
    }
    
    res.send('All Student with this name are removed');
})


router.put('/id/:id',async (req,res)=>{
    let results = id_not_valid_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    let student = await Student.findById(req.params.id);
    if(!student)
        return res.status(404).send(`Student with this id is missing`)
    results = student_not_valid_opt_fun(req.body);
    if(results)
        return res.status(400).send(results.details[0].message);
    student = _.merge(student,req.body);
    try{
        const saved_student = await student.save();
        res.status(200).send(saved_student);
    }catch(err){
        res.status(400).send(`Error : ${err.message}`);
    }
    
})



module.exports = router;