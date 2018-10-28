import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authorized, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authorized ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/' }} />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired,
	authorized: PropTypes.bool.isRequired
};

export default PrivateRoute;
