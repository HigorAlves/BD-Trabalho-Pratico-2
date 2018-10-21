const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

const dbConnection = require('./DAO/dbConnection');
const apiRoute = require('./Routes/api.route');
const twitterRoute = require('./Routes/twitter.route');

const PORT = 3000;

dbConnection();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DEFINIÇÃO DAS ROTAS
app.get('/', function (req, res) {
  res.render('home');
})
app.use('/api', apiRoute);
app.use('/twitter', twitterRoute);


app.listen(PORT, () => {
  console.log('Servidor escutando na porta ' + PORT);
})