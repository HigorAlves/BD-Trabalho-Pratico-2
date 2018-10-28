import React, { Component } from 'react';

function Alert(props) {
	let content = null;
	if (props.alert === true) {
		content = (
			<div className="alert alert-success" role="alert">
				Cadastro realizado com sucesso! Todos os dados Registrados.
			</div>
		);
	} else if (props.alert === false) {
		content = (
			<div className="alert alert-danger" role="alert">
				Não foi possivel Cadastrar os dados.
			</div>
		);
	}
	return <React.Fragment>{content}</React.Fragment>;
}

export default Alert;
