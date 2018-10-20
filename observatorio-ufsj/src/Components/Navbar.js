import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inicio: null,
			pegarTweets: null,
		}
	}

	componentWillMount() {
		if (this.props.ativo === 'inicio') {
			this.setState({ inicio: 'active' });
		}
		if (this.props.ativo === 'pegartweets') {
			this.setState({ pegarTweets: 'active' })
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/observatorio">Observatorio UFSJ</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className={'nav-item', this.state.inicio}>
						<Link className="nav-link" to="/observatorio">Inicio</Link>
						</li>
					<li className={"nav-item", this.state.pegarTweets}>
						<Link className="nav-link" to="/pegartweets">Pegar Tweets</Link>
					</li>
				<li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Dropdown
					</a>
					<div className="dropdown-menu" aria-labelledby="navbarDropdown">
						<a className=" dropdown-item" href=" #">Action</a>
						<a className="dropdown-item" href="#">Another action</a>
						<div className="dropdown-divider"></div>
						<a className="dropdown-item" href="#">Something else here</a>
					</div>
				</li>
				<li className="nav-item">
					<a className="nav-link  disabled" href="#">Disabled</a>
				</li>       
					</ul>
			<form className="form-inline my-2 my-lg-0">
				<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
				<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			</form>
			</div >
			</nav > 
		);
	}
}