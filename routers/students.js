
const router = require('express').Router();
const { Student, student_not_valid_fun, id_not_valid_fun, student_not_valid_opt_fun } = require('../models/student');
const { ClassRoom } = require('../models/class_room');
const _ = require('lodash');
const auth = require('../middelwares/auth')
const autoris = require('../middelwares/autoris')


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

router.post('',auth,async (req,res)=>{
    let results = student_not_valid_fun(req.body);
    if(results)
        return res.status(400).send(results.details[0].message);
    const student = new Student(_.pick(req.body,['name','age','email','extra_price','class_room']));
    try{
        const class_room = await ClassRoom.findById(student.class_room.class_id);
        
        if(class_room && class_room.name === student.class_room.name) {
            const saved_student = await student.save();
            class_room.nb_student += 1;
            await class_room.save();
            res.status(201).send(saved_student);
        }else{
            return res.status(400).send(`ClassRoom not found for the given ID or name of the class is diffrent.`)
        }
        
    }catch(err){
        res.status(400).send(`Error : ${err.message}`);
    }
    
})


router.delete('/id/:id',[auth,autoris],async (req,res)=>{
    let results = id_not_valid_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    const student = await Student.findByIdAndRemove(req.params.id);
    if(!student)
        return res.status(204).end();
    //dec nm of student in class room
    const class_room = await ClassRoom.findById(student.class_room.class_id);
    class_room.nb_student -= 1;
    await class_room.save();
    res.send(student);
})

router.delete('/name/:name',async (req,res)=>{
    let results = student_not_valid_opt_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    const student = await Student.findOneAndRemove({name:req.params.name});
    if(!student)
        return res.status(204).end();
    //dec nm of student in class room
    const class_room = await ClassRoom.findById(student.class_room.class_id);
    class_room.nb_student -= 1;
    await class_room.save();
    res.send(student);
})

router.delete('/all/name/:name',async (req,res)=>{
    let results = student_not_valid_opt_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    let student = { id:1};

    try{
        while(student){
        student = await Student.findOneAndRemove({name:req.params.name});
        const class_room = await ClassRoom.findById(student.class_room.class_id);
        class_room.nb_student -= 1;
        await class_room.save();
        }
    }catch(ex){
        res.send(`Error : ${ex.message}`);
    }
    res.send('All Student with this name are removed');
})


router.put('/id/:id',auth,async (req,res)=>{
    let results = id_not_valid_fun(req.params);
    var old_class_room_id; 
    var class_room;
    if(results)
        return res.status(400).send(results.details[0].message);
    let student = await Student.findById(req.params.id);
    if(!student)
        return res.status(404).send(`Student with this id is missing`)
    results = student_not_valid_opt_fun(req.body);
    if(results)
        return res.status(400).send(results.details[0].message);
    if(req.body.class_room.class_id){
        
        old_class_room_id = student.class_room.class_id;
        class_room = await ClassRoom.findById(req.body.class_room.class_id);
        if(!class_room)
        return res.status(400).send(`ClassRoom not found for the given ID`);

    }

    student = _.merge(student,req.body);
    try{
        student.class_room.name=class_room.name;
        const saved_student = await student.save();
        class_room.nb_student += 1;
        await class_room.save();
        //dec nm of student in class room
        class_room = await ClassRoom.findById(old_class_room_id);
        class_room.nb_student -= 1;
        await class_room.save();
        res.status(200).send(saved_student);
    }catch(err){
        res.status(400).send(`Error : ${err.message}`);
    }
    
})

//count for exacte age

router.get('/count/age/:age',async (req,res)=>{
    let results = student_not_valid_opt_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    
    let students = await Student.find({age:req.params.age});

    res.send(`Number of students with age = ${req.params.age} is ${students.length}`);
});

//count for  age between two numbers

router.get('/count/age/min/:min_age/max/:max_age',async (req,res)=>{
    let results = student_not_valid_opt_fun(req.params);
    if(results)
        return res.status(400).send(results.details[0].message);
    
    let students = await Student.find({age: {$gte: req.params.min_age, $lte: req.params.max_age }});

    res.send(`Number of students with age between given interval is ${students.length}`);
});




module.exports = router;