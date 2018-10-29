import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'; // eslint-disable-line no-unused-vars

import PrivateRoute from './Components/PrivateRoute'; // eslint-disable-line no-unused-vars

import App from './App';
import Home from './Views/Home';
import ColetorTweets from './Views/ColetorTweets';
import ColetorPalavras from './Views/ColetorPalavras';
import ListarTweets from './Views/ListarTweets';

export default class Routers extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={App} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/coletorTweets" component={ColetorTweets} />
					<Route exact path="/coletorPalavras" component={ColetorPalavras} />
					<Route exact path="/listarTweets" component={ListarTweets} />
				</div>
			</Router>
		);
	}
}
