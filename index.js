const mongoose = require('mongoose');
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


appDebug('Application name : '+config.get('Application_Name'))

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/students',student_router);
app.use('/api/class_rooms',class_room_router);
app.use('/api/users',user_router);

app.listen(port,()=> appDebug(`Application is Running on ${port}`))