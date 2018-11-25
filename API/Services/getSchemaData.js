var parseSchema = require('mongodb-schema');
var connect = require('mongodb');

connect('mongodb://localhost:27017/candidatos', { useNewUrlParser: true }, function (err, database) {
  if (err) return console.error(err);

  const candidatos = database.db('observatorioufsj');

  parseSchema(candidatos.collection('candidatos').find(), function (err, schema) {
    if (err) return console.error(err);

    console.log(JSON.stringify(schema, null, 2));
    database.close();
  });
});