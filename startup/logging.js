const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){
    // we add looging into files of expressexceptions
winston.add(winston.transports.File,{filename:'loggers/logfile.log'});

// we add looging into mongodb of expressexceptions
//winston.add(winston.transports.MongoDB,{db:'mongodb://localhost/dmwmb_logger', level :'error'});


winston.handleExceptions(new winston.transports.File({filename:'loggers/uncaughtException.log'}))
//winston.handleExceptions(new winston.transports.MongoDB({db:'mongodb://localhost/dmwmb_logger', level :'error'}))
process.on('unhandledRejection',(ex)=>{
    throw ex;
});
}