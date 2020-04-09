const router = require('express').Router();
const { User , user_validate_fun, user_login_validate_fun } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');


router.get('', async (req,res)=>{
    const users = await User.find().select('-password');
    res.send(users);
})

router.post('/register', async (req,res)=>{
    let results = user_validate_fun(req.body);
    if(results)
        return res.status(400).send(results.details[0].message);
    let user = new User(_.pick(req.body,['name','email','password']));

    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    try{
        user = await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(`Error : ${err.message}`);
    }
});

router.post('/login', async (req,res)=>{
    let results = user_login_validate_fun(req.body);
    if(results)
        return res.status(400).send(results.details[0].message);
    let user_login = _.pick(req.body,['username','password']);

    let user = await User.findOne({email: user_login.username});

    if(user && await bcrypt.compare(user_login.password,user.password))
        return res.send('User logged')
    
    res.status(400).send('Username or Password are incorrects');
    
});



module.exports = router;