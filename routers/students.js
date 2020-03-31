
const router = require('express').Router();
const { Student } = require('../models/student');


router.get('', (req,res)=>{
    res.send('Student Api Works');
})






module.exports = router;