var parseSchema = require('mongodb-schema');
var connect = require('mongodb');

getSchema = function () {
  return new Promise((resolve, reject) => {
    connect('mongodb://localhost:27017/candidatos', { useNewUrlParser: true }, function (err, database) {
      if (err) return console.error(err);

      const candidatos = database.db('observatorioufsj');

      parseSchema(candidatos.collection('candidatos').find(), function (err, schema) {
        if (err) return reject(err);

        database.close();
        resolve(schema);
      });
    });
  })

}

module.exports = {
  getSchema
}