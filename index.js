const mongoose = require('mongoose');
const appDebug = require('debug')('app:debug');
const url_db = 'mongodb://localhost:27017/dmwmB';
require('./db/connect')(url_db);
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT | 3000;
const app = express();
const student_router = require('./routers/students');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/students',student_router);

app.listen(port,()=> appDebug(`Application is Running on ${port}`))