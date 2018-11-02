import React from 'react';

function Alert(props) {
	let content = null;
	if (props.alert === true) {
		content = (
			<div className="alert alert-success text-center" role="alert">
				Operação realizada com sucesso
			</div>
		);
	} else if (props.alert === false) {
		content = (
			<div className="alert alert-danger text-center" role="alert">
				{props.error}
			</div>
		);
	}
	return <React.Fragment>{content}</React.Fragment>;
}

export default Alert;
