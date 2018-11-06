const CONST = require('../Config/consts');
const Model = require('../Models/CandidatosPersonalidade.model');

// JUNTA TODOS OS TEXTO DENTRO DE UMA COLEÇÃO PROPRIA
cadastrarTexto = function (req, res) {
  console.log('CADASTRAR: ', req.body.screen_name)
  let Personalidade = new Model({
    screen_name: req.body.screen_name,
    personality: req.body.personality,
    needs: req.body.needs,
    values: req.body.values,
    consumption_preferences: req.body.consumption_preferences,
  });

  Personalidade.save(function (error) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).send(req.body)
    }
  })
}
module.exports = {
  cadastrarTexto
}