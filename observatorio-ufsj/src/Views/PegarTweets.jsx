import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Twit from 'twit';
import { salvar } from '../Services/gravarDB';
import { AUTH } from '../Config/AUTH';

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

	getTweetsBanco(candidato) {
		this.setState({ qtTweets: null });
		fetch(`http://localhost:3000/api/tweets/${candidato}`)
			.then(res => res.json())
			.then(json => {
				this.setState({ qtTweets: json.tweet });
			})
			.catch(error => console.log(error));
	}

	getTweetsStatus(candidato) {
		console.log('GET_TWEET_STATUS');
		const T = new Twit(AUTH);
		T.get(
			'users/show',
			{ screen_name: `${candidato}` },
			(err, data, response) => {
				if (err) {
					console.log(
						'ERRO: não foi possivel pegar a quantidade de Tweets recentes' + err
					);
				}
				this.setState({ qtAtualTweets: data.statuses_count });
			}
		);
	}

	handleChange(event) {
		this.setState({ candidato: event.target.value });
		console.log('ESCOLHENDO O CANDIDATO');

		if (event.target.value === 'Jair Bolsonaro') {
			this.getTweetsBanco('jairbolsonaro');
			this.getTweetsStatus('jairbolsonaro');
		}
		if (event.target.value === 'Fernando Haddad') {
			this.getTweetsBanco('Haddad_Fernando');
			this.getTweetsStatus('Haddad_Fernando');
		}
	}

	handleQuantidadeChange(event) {
		if (event.target.value > 200) {
			this.setState({ quantidade: 200 });
		} else {
			this.setState({ quantidade: event.target.value });
		}
	}

	//PEGA OS TWEETS E SALVA OS MESMOS NO BANCO DE DADOS
	async getTweets(candidato) {
		let quantidade = this.state.quantidade;
		let tweetsToGet = null;
		const T = new Twit(AUTH);

		let sucesso = (
			<div className="alert alert-success col col-sm-12" role="alert">
				Os tweets do candidato {this.state.candidato}, foram pegos com sucesso!
				Total de {this.state.quantidade} tweets.
			</div>
		);

		let esperarTempo = (
			<div className="alert alert-warning col col-sm-12" role="alert">
				Não foi possivel salvar mais tweets, a API do Twitter esta pedindo para
				esperar para realizar mais consultas.
			</div>
		);

		let deuRuim = (
			<div className="alert alert-danger col col-sm-12" role="alert">
				Não foi possivel procurar os tweets do {this.state.candidato}.
			</div>
		);

		//VAMOS VERIFICAR NO BANCO DE DADOS SE JA EXISTE REGISTRO DE ALGUM TWEET DO CANDIDATO EM QUESTÃO
		console.log('VERIFICANDO SE JA EXISTEM TWEETS\n');
		await fetch(`http://localhost:3000/api/lasttweet/${candidato}`)
			.then(res => res.json())
			.then(json => {
				this.setState({ lastId: json.id });
			})
			.catch(error => console.log(error));

		if (this.state.lastId === null) {
			console.log('NÃO EXISTEM TWEETS NO BANCO');
			tweetsToGet = Object.assign(
				{ screen_name: `${candidato}`, tweet_mode: 'extended' },
				{ count: quantidade }
			);

			//COMO NÃO EXISTE TWEETS DO CANDIDATO VAMOS ENTÃO SOMENTE INSERIR OS DADOS PRE-SELECIONADOS DENTRO DO BANCO DE DADOS.
			T.get('statuses/user_timeline', tweetsToGet)
				.then(result => {
					if (result.data[0].id === undefined) {
						this.setState({ alerta: esperarTempo });
						console.log('É PRECISO ESPERAR PARA PEGAR MAIS DADOS');
						console.log(result.data.id);
					} else {
						this.setState({ alerta: sucesso });
						console.log('SALVANDO DADOS NO BANCO');
						salvar(result.data, candidato);
						this.getTweetsBanco(candidato);
					}
					this.setState({ lastId: null });
				})
				.catch(err => {
					console.log('ACONTECEU ALGUM ERRO' + err);
					this.setState({ alerta: deuRuim });
				});
		} else {
			//EXISTEM TWEETS ANTIGOS CADASTRADOS NO BANCO DE DADOS, IREMOS ENTÃO CADASTRAR SOMENTE OS NOVOS TWEETS APARTIR DA CONTAGEM DO ULTIMO TWEET INSERIDO DENTRO DO NOSSO BANCO
			console.log('EXISTEM TWEETS NO BANCO');
			quantidade = parseInt(quantidade) + 1;
			tweetsToGet = Object.assign(
				{
					screen_name: `${candidato}`,
					tweet_mode: 'extended',
					max_id: this.state.lastId
				},
				{ count: quantidade }
			);

			T.get('statuses/user_timeline', tweetsToGet)
				.then(result => {
					if (result.data[0].id === undefined) {
						this.setState({ alerta: esperarTempo });
					} else {
						this.setState({ alerta: sucesso });
						result.data.shift();
						salvar(result.data, candidato);
						this.getTweetsBanco(candidato);
					}
					this.setState({ lastId: null });
				})
				.catch(err => {
					this.setState({ alerta: deuRuim });
				});
		}
	}

	async handleSubmit(event) {
		event.preventDefault();

		//TODO: Inserir o codigo de consulta dos respectivos
		if (this.state.candidato === 'Jair Bolsonaro') {
			console.log('CANDIDATO: BOLSONARO');

			this.getTweets('jairbolsonaro');
		}
		if (this.state.candidato === 'Fernando Haddad') {
			console.log('CANDIDATO: Haddad');
			this.getTweets('Haddad_Fernando');
		}

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
											<option value="Jair Bolsonaro">Jair Bolsonaro</option>
											<option value="Fernando Haddad">Fernando Haddad</option>
											<option value="" disabled>
												Fernando Haddad
											</option>
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
