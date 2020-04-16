const appDebug = require('debug')('app:debug');
const config = require('config');
const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/logging')();
require('./startup/db');
require('./startup/config')();
require('./startup/routes')(app);



appDebug('Application name : '+config.get('Application_Name'))
const port = process.env.PORT | 3000;


app.listen(port,()=>{ appDebug(`Application is Running on ${port}`);
    winston.info(`Application is Running on ${port}`); 
})