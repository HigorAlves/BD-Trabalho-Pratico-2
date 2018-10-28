import React, { Component } from 'react';
import Navbar from '../Components/Navbar';

export default class PegatTweets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			candidato: '',
			quantidade: '',
			alerta: '',
			lastId: null,
			qtTweets: null,
			qtAtualTweets: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleQuantidadeChange = this.handleQuantidadeChange.bind(this);
	}

	handleChange(event) {
		this.setState({ candidato: event.target.value });
		console.log('ESCOLHENDO O CANDIDATO');
	}

	handleQuantidadeChange(event) {
		if (event.target.value >= 180) {
			this.setState({ quantidade: 180 });
		} else {
			this.setState({ quantidade: event.target.value });
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		//RETIRAMOS A BOX DE ALERTA DA TELA DO USUARIO
		setTimeout(() => {
			this.setState({ alerta: null });
		}, 5000);
	}

	render() {
		return (
			<section>
				<Navbar ativo="pegartweets" />

				<div className="jumbotron jumbotron-fluid">
					<div className="container">
						<h1 className="display-4">Coletor de Tweets</h1>
						<p className="lead">
							Nesta pagina você pode escolher entre os candidatos
							pre-cadastrados, o escolhido vai ter seus dados do twitter pegos
							via a API.
						</p>
					</div>
				</div>

				<div className="container">
					{this.state.alerta}
					<div className="row">
						<div className="col-sm-12 col-md-12">
							<h2 className="font-weight-light">Escolha um candidato</h2>
						</div>

						<div className="col-sm-12 col-md-12 mt-3">
							<form onSubmit={this.handleSubmit.bind(this)}>
								<div className="form-row">
									<div className="form-group col-md-6 col-sm-12">
										<label htmlFor="inputCandidato">Candidato:</label>
										<select
											id="inputCandidato"
											className="form-control"
											value={this.state.candidato}
											onChange={this.handleChange}
										>
											<option hidden value="">
												Escolher
											</option>
											<option value="Fernando Haddad">Fernando Haddad</option>
											<option value="Manuela Davila">Manuela Davila</option>
											<option value="Jair Bolsonaro">Jair Bolsonaro</option>
											<option value="General Mourão">General Mourão</option>
										</select>
									</div>

									<div className="form-group col-md-6 col-sm-12">
										<label htmlFor="inputQuantidadeTweets">
											Quantidade de Tweets para cadastrar (Quantidade maxima de
											200)
										</label>
										<input
											type="text"
											className="form-control"
											id="inputQuantidadeTweets"
											value={this.state.quantidade}
											onChange={this.handleQuantidadeChange}
										/>
									</div>
								</div>

								<div className="form-row">
									<div className="col-sm-12 col-md-6">
										<p>
											Tweets no nosso banco:{' '}
											<span className="badge badge-secondary">
												{this.state.qtTweets}
											</span>
										</p>
									</div>
									<div className="col-sm-12 col-md-6">
										<p>
											Tweets do candidato atualmente:{' '}
											<span className="badge badge-secondary">
												{this.state.qtAtualTweets}
											</span>
										</p>
									</div>
								</div>

								<button type="submit" className="btn btn-dark mt-4">
									Coletar Tweets
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
