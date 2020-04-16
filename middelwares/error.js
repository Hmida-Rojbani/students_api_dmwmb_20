const winston = require('winston')
module.exports = function(err,req,res,next){
    //we declared as error
    winston.error(err.message,err);
    // or we can have
    //winston.warn
    //winston.info
    //winston.verbose
    //winston.debug
    //winston.silly

    res.status(500).send('Something failed in this service: '+err.message);
}