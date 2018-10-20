import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../Components/PrivateRoute';

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
