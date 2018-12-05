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

        let tudo = schema.fields[2];
        // let categorias = {
        //   // quantidadeUndefined: schema.fields[2].types[0].count,
        //   quantidadeAnalisada: schema.fields[0].types[1].types[0].fields[0].types[0].count,
        //   nomes: schema.fields[2].types[1].types[0].fields[0].types[0].values
        // };

        resolve({
          field: tudo,
          // categorias: categorias
        });
      });
    });
  })

}

getSchemaPalavraChave = function () {
  return new Promise((resolve, reject) => {
    connect('mongodb://localhost:27017/palavrachaves', { useNewUrlParser: true }, function (err, database) {
      if (err) return console.error(err);

      const candidatos = database.db('observatorioufsj');

      parseSchema(candidatos.collection('palavrachaves').find(), function (err, schema) {
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