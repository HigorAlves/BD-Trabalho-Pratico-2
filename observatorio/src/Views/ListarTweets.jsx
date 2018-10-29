import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Jumbotron from '../Components/Jumbotron';

export default class ListarTweets extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<Jumbotron titulo="Listar Tweets" texto="as" />
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-sm-12 d-flex justify-content-center">
							ola
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
