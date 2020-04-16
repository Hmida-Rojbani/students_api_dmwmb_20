const config = require('config');

module.exports = function(){
    if(!config.get('jwtPrivateKey') || !config.get('db.password') ){
        throw new Error('FATAL ERROR: some secret env varibales are not defined');
    }
}