const mongoose = require('mongoose');
module.exports = async (client) => {
client.logger.info('Database loaded');

mongoose.connect(client.config.mongodbstring, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  client.logger.info('Connected to MongoDB');
});
db.on('error', (err) => {
    console.log(err);
});
}



require('./schemes/user.js');
require('./schemes/subdomain.js');


