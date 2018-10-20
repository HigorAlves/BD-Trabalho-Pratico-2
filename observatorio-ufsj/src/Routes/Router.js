import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../Components/PrivateRoute';

import Home from '../App';

export default class Routers extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={Home} />
        </div>
      </Router>
    );
  }
}