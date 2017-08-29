import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class Leaderboard extends Component {
  constructor() {
    super();

    this.state = {
      campers: [],
      view: 'lastMonthPoints'
    };

    this.handleHeadingClick = this.handleHeadingClick.bind(this);
  }

  // Lifecycle methods
  componentDidMount() {
    this.getCamperData();
  }

  // Event handlers
  handleHeadingClick(e) {
    this.pickRankingMechanism(e.target.dataset.value);
  }

  // Component methods
  addToState(rawList) {
    const campers = this.state.campers;
    const existingNames = campers.map(camper => camper.name);
    const cleanList = rawList.filter(camper => !existingNames.includes(camper.name));
    this.setState({
      campers: campers.concat(cleanList)
    });
  }

  getCamperData() {
    const recentPointsURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    const alltimePointsURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    fetch(recentPointsURL)
      .then(response => response.json())
      .then(camperList => this.formatData(camperList))
      .then(monthlyPointList => this.addToState(monthlyPointList))
    fetch(alltimePointsURL)
      .then(response => response.json())
      .then(camperList => this.formatData(camperList))
      .then(yearlyPointsList => this.addToState(yearlyPointsList))
  }

  formatData(camperList) {
    return camperList.map(camper => {
      return {
        name: camper.username,
        lastMonthPoints: camper.recent,
        allTimePoints: camper.alltime
      };
    });
  }

  pickRankingMechanism(view) {
    this.setState({ view })
  }

  render() {
    return (
      <table className="leaderboard">
        <TableHead handleHeadingClick={this.handleHeadingClick} />
        <TableBody campers={this.state.campers} view={this.state.view} />
      </table>
    );
  }
}

const TableHead = ({handleHeadingClick}) =>
  <thead>
    <tr className="row">
      <th className="ranking">#</th>
      <th className="camper-name" data-value="name" onClick={handleHeadingClick}>Camper Name</th>
      <th className="points-month" data-value="lastMonthPoints" onClick={handleHeadingClick}>Points in past 30 days</th>
      <th className="points-year" data-value="allTimePoints" onClick={handleHeadingClick}>All time points</th>
    </tr>
  </thead>

const TableBody = ({campers, view}) => {
  const tableRows = (view === 'name')
    ? (campers
      .sort((x, y) => (x[view].toUpperCase() < y[view].toUpperCase() ? -1 : 1))
      .map((camper, i) => (
        <tr className="row">
          <td className="ranking"></td>
          <td className="camper-name"><a href={`https://forum.freecodecamp.org/u/${camper.name}/summary`} target="_blank">{camper.name}</a></td>
          <td className="points-month">{camper.lastMonthPoints}</td>
          <td className="points-year">{camper.allTimePoints}</td>
        </tr>)
        )
      )
    : (campers
    .sort((x, y) => y[view] - x[view])
    .map((camper, i) => (
      <tr className="row">
        <td className="ranking">{i + 1}</td>
        <td className="camper-name"><a href={`https://forum.freecodecamp.org/u/${camper.name}/summary`} target="_blank">{camper.name}</a></td>
        <td className="points-month">{camper.lastMonthPoints}</td>
        <td className="points-year">{camper.allTimePoints}</td>
      </tr>)
      )
    .slice(0, 50)
    )

  return (
    <tbody>
      {tableRows}
    </tbody>
  );
}

export default Leaderboard;
