const mongoose = require('mongoose');
const appDebug = require('debug')('app:debug');
const url_db = 'mongodb+srv://user:1234@mongoformation-xc16w.mongodb.net/dmwmB?retryWrites=true&w=majority';
require('./db/connect')(url_db);
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT | 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());


app.listen(port,()=> appDebug(`Application is Running on ${port}`))