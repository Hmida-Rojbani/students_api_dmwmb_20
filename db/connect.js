const mongoose = require('mongoose');
const mongoDebug = require('debug')('app:mongo');

module.exports = async function connectionToMongo(url){
    try{
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:true  });
        mongoDebug('Mongo is Up.');
    }catch(err){
        mongoDebug(`Mongo is Down. Raison : ${err.message}`);
        process.exit(0);
    }
}