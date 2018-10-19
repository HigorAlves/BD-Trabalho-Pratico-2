const Product = require('../Models/product.model');

cadastraTweet = function (req, res) {
  req.assert('name', 'O nome da pessoa que postou é obrigatorio').notEmpty();

  if (req.validationErrors()) {
    res.status(400).send('Ocorreu o erro');
    return;
  }

  let product = new Product(
    {
      name: req.body.name,
      price: req.body.price
    }
  );

  product.save(function (err) {
    if (err) {
      res.status(400).send('Não foi possivel gravar os dados deste Tweet: ' + err);
      return (err);
    }
    res.status(201).send('Tweet cadastrado com sucesso')
  })
}

module.exports = {
  cadastraTweet
}