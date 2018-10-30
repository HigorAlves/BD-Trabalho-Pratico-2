import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Jumbotron from '../Components/Jumbotron';
import Alert from '../Components/Alert';
import Loading from '../Components/Loader';

export default class PegatTweets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			candidato: '',
			quantidade: '',
			alerta: null,
			lastId: null,
			qtTweets: null,
			qtAtualTweets: null,
			carregando: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleQuantidadeChange = this.handleQuantidadeChange.bind(this);
		this.getTweets = this.getTweets.bind(this);
	}
	//PEGA OS TWEETS DO TWITTER E A QUANTIDADE QUE ESTA SALVA NO BANCO DE DADOS
	getTweets(candidato) {
		fetch(`http://localhost:3000/twitter/totaltweets/${candidato}`)
			.then(res => res.json())
			.then(data => {
				this.setState({ qtAtualTweets: data.count });
			})
			.catch(error => {
				console.log('NÃO FOI POSSIVEL PEGAR OS TWEETS DO CANDIDATO: ' + error);
			});

		fetch(`http://localhost:3000/mongodb/totaltweets/${candidato}`)
			.then(res => res.json())
			.then(data => {
				this.setState({ qtTweets: data.id });
			})
			.catch(error => {
				console.log(
					'NÃO FOI POSSIVEL PEGAR A QUANTIDADE DE TWEETS NO BANCO: ' + error
				);
				return;
			});
	}

	handleChange(event) {
		this.setState({ candidato: event.target.value });
		console.log('ESCOLHENDO O CANDIDATO');
		console.log(event.target.value);
		this.getTweets(event.target.value);
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
		this.setState({ carregando: true });
		fetch('http://localhost:3000/twitter/cadastrar', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				candidato: this.state.candidato,
				quantidade: this.state.quantidade
			})
		})
			.then(res => {
				if (parseInt(res.status) === 201) {
					this.setState({ alerta: true });
					this.setState({ carregando: false });
					this.getTweets(this.state.candidato);
					setTimeout(() => {
						this.setState({ alerta: null });
					}, 5000);
				} else {
					this.setState({ alerta: false });
				}
			})
			.catch(error => {
				this.setState({ carregando: false });
			});
	}

	render() {
		return (
			<section>
				<Navbar ativo="pegartweets" />
				<Jumbotron
					titulo="Coletor de Tweets"
					texto="Nesta pagina você pode escolher entre os candidatos
							pre-cadastrados, o escolhido vai ter seus dados do twitter pegos
							via a API."
				/>

				<div className="container">
					{this.state.carregando ? <Loading /> : null}
					<Alert alert={this.state.alerta} />
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
											<option value="Haddad_fernando">Fernando Haddad</option>
											<option value="ManuelaDavila">Manuela Davila</option>
											<option value="jairbolsonaro">Jair Bolsonaro</option>
											<option value="GeneraIMourao">General Mourão</option>
										</select>
									</div>

									<div className="form-group col-md-6 col-sm-12">
										<label htmlFor="inputQuantidadeTweets">
											Quantidade de Tweets para cadastrar (Quantidade maxima de
											180)
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
