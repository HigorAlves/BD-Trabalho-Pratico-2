import React, { Component } from 'react';// eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';// eslint-disable-line no-unused-vars
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';// eslint-disable-line no-unused-vars

import PrivateRoute from '../Components/PrivateRoute'; // eslint-disable-line no-unused-vars

import Home from '../Views/Home';
import ObservatorioHome from '../Views/Observatorio';
import PegarTweets from '../Views/PegarTweets';

export default class Routers extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home} />
					<Route exact path="/observatorio" component={ObservatorioHome} />
					<Route exact path="/pegartweets" component={PegarTweets} />
				</div>
			</Router>
		);
	}
}
