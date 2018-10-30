import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Jumbotron from '../Components/Jumbotron';
import Tweet from '../Components/Tweet';
import { COMMENT, RETWEET, HEART } from '../lib/Icons';

export default class ListarTweets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantidade: 0,
			scrolling: false,
			candidato: '',
			tweets: []
		};
		this.handleChange = this.handleChange.bind(this);
	}

	carregarItens(candidato) {
		let qt = null;
		fetch(
			`http://localhost:3000/mongodb/todostweets/${candidato}/${
				this.state.quantidade
			}`
		)
			.then(res => res.json())
			.then(data => {
				qt = parseInt(this.state.quantidade) + 10;
				this.setState({ quantidade: qt });
				this.setState({ tweets: [...this.state.tweets, ...data] });
			})
			.catch(error => {
				console.warn('error: ', error);
			});
	}
	handleChange(e) {
		this.setState({ candidato: e.target.value });
		this.carregarItens(e.target.value);
		this.scrollListener = window.addEventListener('scroll', e => {
			this.handleScroll(e);
		});
	}

	handleScroll = e => {
		if (this.state.scrolling) return;
		let ultimoItem = document.querySelector('div > div.card:last-child');
		let ultimoItemOffset = ultimoItem.offsetTop + ultimoItem.clientHeight;
		let pageOffset = window.pageYOffset + window.innerHeight;
		let bottomOffset = 20;
		if (pageOffset > ultimoItemOffset + bottomOffset) {
			// this.setState({ scrolling: true });
			this.carregarItens(this.state.candidato);
		}
	};

	render() {
		var tweets = this.state.tweet;
		return (
			<React.Fragment>
				<Navbar />
				<Jumbotron titulo="Listar Tweets" texto="as" />
				<div className="d-flex justify-content-center">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-sm-12" />
						</div>
						<form>
							<div className="form-row">
								<div className="form-group col-md-12 col-sm-12">
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
										<option value="Haddad_Fernando">Fernando Haddad</option>
										<option value="ManuelaDavila">Manuela Davila</option>
										<option value="jairbolsonaro">Jair Bolsonaro</option>
										<option value="GeneraIMourao">General Mourão</option>
									</select>
								</div>
							</div>
						</form>
						{this.state.tweets.map(tweet => (
							<Tweet data={tweet} key={tweet.id.toString()} />
						))}
					</div>
				</div>
			</React.Fragment>
		);
	}
}