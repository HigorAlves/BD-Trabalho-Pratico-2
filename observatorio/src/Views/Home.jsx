import React, { Component } from 'react';
import Navbar from '../Components/Navbar';

export default class ObservatorioHome extends Component {
	render() {
		return (
			<section>
				<Navbar ativo={'inicio'} />
				<div className="jumbotron jumbotron-fluid">
					<div className="container">
						<h1 className="display-4">Bem vindo ao Observatorio</h1>
						<p className="lead">
							This is a modified jumbotron that occupies the entire horizontal
							space of its parent.
						</p>
					</div>
				</div>
			</section>
		);
	}
}
