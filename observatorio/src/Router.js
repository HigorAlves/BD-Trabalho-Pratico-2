import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'; // eslint-disable-line no-unused-vars

import PrivateRoute from './Components/PrivateRoute'; // eslint-disable-line no-unused-vars

import App from './App';
import Home from './Views/Home';
import ColetorTweets from './Views/ColetorTweets';
import ColetorPalavras from './Views/ColetorPalavras';
import ListarTweets from './Views/ListarTweets';
import ListarTweetsPC from './Views/ListarTweetsPalavrasChaves';

import NluCandidato from './Views/Watson/NluCandidato';
import NluPalavra from './Views/Watson/NluPalavra';
import CriarTexto from './Views/Watson/CriarTexto';
import Personalidade from './Views/Watson/Personalidade';
//ANALISAR PERSONALIDADE: http://localhost:3000/watson/analisarpersonalidade

import Eleicoes from './Views/Eleicoes';

export default class Routers extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={App} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/eleicoes" component={Eleicoes} />
					<Route exact path="/coletorTweets" component={ColetorTweets} />
					<Route exact path="/coletorPalavras" component={ColetorPalavras} />
					<Route exact path="/listarTweets" component={ListarTweets} />
					<Route exact path="/listarTweetsPalavras" component={ListarTweetsPC} />
					<Route exact path="/nlucandidato" component={NluCandidato} />
					<Route exact path="/nlupalavra" component={NluPalavra} />
					<Route exact path="/gerartexto" component={CriarTexto} />
					<Route exact path="/personalidade" component={Personalidade} />
				</div>
			</Router>
		);
	}
}
