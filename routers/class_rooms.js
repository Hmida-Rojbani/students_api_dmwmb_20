
const router = require('express').Router();
const { ClassRoom , class_room_validate_fun } = require('../models/class_room');
const _ = require('lodash');


router.get('',async (req,res)=>{
    const class_rooms = await ClassRoom.find();
    if(class_rooms.length === 0)
        return res.status(204).end();
    res.send(class_rooms);
})


router.post('',async (req,res)=>{
    let results = class_room_validate_fun(req.body);
    if(results)
        return res.status(400).send(results.details[0].message);
    const class_room = new ClassRoom(_.pick(req.body,['name','nb_student','modules']));
    try{
        const saved_class_room = await class_room.save();
        res.status(201).send(saved_class_room);
    }catch(err){
        res.status(400).send(`Error : ${err.message}`);
    }
    
})

module.exports = router;