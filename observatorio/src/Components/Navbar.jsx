import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.svg';

export default class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inicio: null,
			pegarTweets: null,
			listagemTweets: null,
			dropdown: null
		};
	}

	componentWillMount() {
		if (this.props.ativo === 'inicio') {
			this.setState({ inicio: 'active' });
		}
		if (this.props.ativo === 'pegartweets') {
			this.setState({ pegarTweets: 'active' });
			this.setState({ dropdown: 'active' });
		}
		if (this.props.ativo === 'listagemtweets') {
			this.setState({ listagemTweets: 'active' });
			this.setState({ dropdown: 'active' });
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/observatorio">
					<img src={Logo} className="App-navbar" alt="" />
					Observatorio UFSJ
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className={'nav-item' + ' ' + this.state.inicio}>
							{' '}
							{/* eslint-disable-line */}
							<Link className="nav-link" to="/observatorio">
								Inicio
							</Link>
						</li>
						<li className="nav-item dropdown">
							<Link
								className={
									'nav-link dropdown-toggle' + ' ' + this.state.dropdown
								}
								to="/"
								id="navbarDropdown"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								{' '}
								{/* eslint-disable-line */}
								Tweets
							</Link>
							<div className="dropdown-menu" aria-labelledby="navbarDropdown">
								<Link
									className={'dropdown-item' + ' ' + this.state.pegarTweets}
									to="/coletortweets"
								>
									Coletar Tweets
								</Link>{' '}
								{/* eslint-disable-line */}
								<Link
									className={'dropdown-item' + ' ' + this.state.listagemTweets}
									to="/coletorhashtag"
								>
									Coletor Hashtag
								</Link>{' '}
								{/* eslint-disable-line */}
								<div className="dropdown-divider" />
								<Link
									className={'dropdown-item' + ' ' + this.state.listagemTweets}
									to="/listagemtweets"
								>
									Listar Tweets
								</Link>{' '}
								{/* eslint-disable-line */}
							</div>
						</li>
						<li className="nav-item dropdown">
							<Link
								className={'nav-link dropdown-toggle'}
								to="/"
								id="navbarDropdown"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Administração
							</Link>
							<div className="dropdown-menu" aria-labelledby="navbarDropdown">
								<Link className="dropdown-item" to="/">
									Sem função
								</Link>
							</div>
						</li>
						<li className="nav-item">
							<Link className="nav-link disabled" to="/">
								Disabled
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
