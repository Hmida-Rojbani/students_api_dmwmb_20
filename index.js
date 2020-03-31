const mongoose = require('mongoose');
const appDebug = require('debug')('app:debug');
const url_db = 'mongodb+srv://user:1234@mongoformation-xc16w.mongodb.net/dmwmB?retryWrites=true&w=majority';
require('./db/connect')(url_db);