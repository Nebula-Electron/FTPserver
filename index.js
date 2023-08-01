//make a new client
const Manager = require('./manager');
const client = new Manager();

//starting the necessary functions and services
require('./src/web/api')(client);
require('./src/functions/ftpserver/index.js')(client);
require('./src/functions/database/db.js')(client);