const config = require('config');
const url_db = config.get('db.protocole')+config.get('db.user')
+config.get('db.password')+config.get('db.path')+config.get('db.name');

require('../db/connect')(url_db);