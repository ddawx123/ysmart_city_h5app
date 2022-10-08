import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, hashHistory, Switch } from 'react-router-dom';
import HomePage from './Components/Home/Dashboard';
import GPACalculator from './Components/Utils/GPACalculator';
import HealthCodeCenter from './Components/Utils/HealthCodeCenter';
import LoginPage  from './Components/User/Login';
import UndefinedPage from './Components/Exception/UndefinedPage';
import './Components/darkSupport.css';
import BusQueryForm from "./Components/CityIntelligence/bus";


ReactDOM.render(
  <Router history={ hashHistory }>
    <Switch>
      <Route path="/" exact component={ HomePage } />
      <Route path="/bus" component={ BusQueryForm } />
      <Route path="/gpaCalculator" component={ GPACalculator } />
      <Route path="/utilsBox/healthCodeCenter" component={ HealthCodeCenter } />
      <Route path="/Login" component={ LoginPage } />
      <Route path="*" component={ UndefinedPage } />
    </Switch>
  </Router>,
  document.getElementById('root')
);
