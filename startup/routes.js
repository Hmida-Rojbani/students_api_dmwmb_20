const express = require('express');
const student_router = require('../routers/students');
const index_router = require('../routers/index');
const class_room_router = require('../routers/class_rooms');
const user_router = require('../routers/users');
const error = require('../middelwares/error');
const morgan = require('morgan');

module.exports = function(app) {
    if(app.get('env')==='development')
        app.use(morgan('dev'));
    app.use(express.json());
    app.use(['','/'], index_router);
    app.use('/api/students',student_router);
    app.use('/api/class_rooms',class_room_router);
    app.use('/api/users',user_router);
    app.use(error);
}

