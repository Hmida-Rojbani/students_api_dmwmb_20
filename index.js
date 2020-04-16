require('express-async-errors')
const appDebug = require('debug')('app:debug');
const config = require('config');
const url_db = config.get('db.protocole')+config.get('db.user')
+config.get('db.password')+config.get('db.path')+config.get('db.name');
require('./db/connect')(url_db);
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT | 3000;
const app = express();
const student_router = require('./routers/students');
const class_room_router = require('./routers/class_rooms');
const user_router = require('./routers/users');
const error = require('./middelwares/error');
const winston = require('winston');
require('winston-mongodb');


// we add looging into files of expressexceptions
winston.add(winston.transports.File,{filename:'loggers/logfile.log'});

// we add looging into mongodb of expressexceptions
//winston.add(winston.transports.MongoDB,{db:'mongodb://localhost/dmwmb_logger', level :'error'});


winston.handleExceptions(new winston.transports.File({filename:'loggers/uncaughtException.log'}))
//winston.handleExceptions(new winston.transports.MongoDB({db:'mongodb://localhost/dmwmb_logger', level :'error'}))
process.on('unhandledRejection',(ex)=>{
    throw ex;
});

appDebug('Application name : '+config.get('Application_Name'))


if(!config.get('jwtPrivateKey') || !config.get('db.password') ){
    throw new Error('FATAL ERROR: some secret env varibales are not defined');
}


app.use(morgan('dev'));
app.use(express.json());
app.use('/api/students',student_router);
app.use('/api/class_rooms',class_room_router);
app.use('/api/users',user_router);
app.use(error);

app.listen(port,()=> appDebug(`Application is Running on ${port}`))