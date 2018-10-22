const clients = require('restify-clients');

const SUCESSO = 'SUCESSO';
const FALHOU = 'FALHOU';
const CLIENT = clients.createJSONClient({
  url: 'http://localhost:3000',
  version: '~1.0'
});

module.exports = {
  SUCESSO,
  FALHOU,
  CLIENT
}