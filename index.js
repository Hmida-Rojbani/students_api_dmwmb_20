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
const error = require('./middelwares/error')
const winston = require('winston')

// we add file to handle expressexceptions
winston.add(winston.transports.File,{filename:'loggers/logfile.log'});

//throw new Error('Something failed during startup.');
//we can handel it with the following code
// process.on('uncaughtException',(ex)=>{
//     appDebug('We got an uncaught exception : '+ex.message);
//     winston.error(ex.message,ex);
//     process.exit(1);
// });
//log of internal Errors
winston.handleExceptions(new winston.transports.File({filename:'loggers/uncaughtException.log'}))

process.on('unhandledRejection',(ex)=>{
    throw ex;
});

//const p = Promise.reject(new Error('Something failed miserably! .'));
//we can handel it with the following code
// process.on('unhandledRejection',(ex)=>{
//     appDebug('We got an unhandled rejection : '+ex.message);
//     process.exit(2);
// });
appDebug('Application name : '+config.get('Application_Name'))




app.use(morgan('dev'));
app.use(express.json());
app.use('/api/students',student_router);
app.use('/api/class_rooms',class_room_router);
app.use('/api/users',user_router);
app.use(error);

app.listen(port,()=> appDebug(`Application is Running on ${port}`))