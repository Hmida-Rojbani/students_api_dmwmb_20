
const router = require('express').Router();
const { Student } = require('../models/student');


router.get('',async (req,res)=>{
    
    const students = await Student.find();
    if(students.length === 0)
        return res.status(204).end();
    res.send(students);
})






module.exports = router;