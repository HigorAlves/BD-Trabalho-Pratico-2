import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Jumbotron from '../Components/Jumbotron';
import { Chart } from "react-charts";

export default class Eleicoes extends Component {

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Jumbotron titulo='Eleições 2018' texto='Por um texto aqui' />

      </React.Fragment>
    )
  }
}