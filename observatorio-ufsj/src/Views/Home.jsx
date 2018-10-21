import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import '../App.css';

export default class Home extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<div className="container">
						<div className="row">
							<div className="col-sm-12 col-md-12">
								<h2>
									Observatorio
									<br />
									<code>Universidade Federal de São João del Rei</code>
								</h2>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-sm-12 col-md-2">
								<button type="button" className="btn btn-dark m-2">
									<Link
										to="/observatorio"
										style={{ textDecoration: 'none', color: 'white' }}
									>
										Acessar
									</Link>
								</button>
							</div>
							<div className="col-sm-12 col-md-2">
								<button type="button" className="btn btn-dark m-2">
									<Link
										to="/docs"
										style={{ textDecoration: 'none', color: 'white' }}
									>
										Documentação
									</Link>
								</button>
							</div>
						</div>
					</div>
				</header>
			</div>
		);
	}
}
