import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

export default class ObservatorioHome extends Component {
	render() {
		return (
			<section>
				<Navbar classes='navi-link, active' />

				<div class="jumbotron jumbotron-fluid">
					<div class="container">
						<h1 class="display-4">Bem vindo ao Observatorio</h1>
						<p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
					</div>
				</div>
			</section>
		);
	}
}
