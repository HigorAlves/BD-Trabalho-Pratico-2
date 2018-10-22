const mongoose = require('mongoose');

createConnection = function () {
  let dev_db_url = 'mongodb://localhost:27017/observatorioufsj';
  let mongoDB = process.env.MONGODB_URI || dev_db_url;

  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;

  let db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB error na conexão:'));
}

module.exports = createConnection;