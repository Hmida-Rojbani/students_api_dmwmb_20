const mongoose = require('mongoose');
const appDebug = require('debug')('app:debug');
const url_db = 'mongodb+srv://user:1234@mongoformation-xc16w.mongodb.net/dmwmB?retryWrites=true&w=majority';
require('./db/connect')(url_db);
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT | 3000;
const app = express();
const student_router = require('./routers/students');
const class_room_router = require('./routers/class_rooms');
const user_router = require('./routers/users');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/students',student_router);
app.use('/api/class_rooms',class_room_router);
app.use('/api/users',user_router);

app.listen(port,()=> appDebug(`Application is Running on ${port}`))