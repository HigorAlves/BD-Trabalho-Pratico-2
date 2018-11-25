const CONST = require('../Config/consts');
const { getSchema } = require('../Services/getSchemaData');

schema = function (req, res) {
  let schema = null;
  getSchema()
    .then(result => {
      res.status(200).send(result)
    })
    .catch(error => res.status(400).send(CONST.FALHOU));
}

module.exports = {
  schema
}