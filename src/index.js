import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, hashHistory, Switch } from 'react-router-dom';
import HomePage from './Pages/Home/Dashboard';
import GPACalculator from './Pages/Utils/GPACalculator';
import HealthCodeCenter from './Pages/Utils/HealthCodeCenter';
import LoginPage  from './Pages/User/Login';
import UndefinedPage from './Pages/Exception/UndefinedPage';
import './Pages/darkSupport.css';
import BusQueryForm from "./Pages/CityIntelligence/bus";
import BusDetailScreen from "./Pages/CityIntelligence/bus/detail";
import NuclearAcidQuery from "./Pages/CityIntelligence/healthy/nuclearAcidQuery";
import './vConsole';

ReactDOM.render(
  <Router history={ hashHistory }>
    <Switch>
      <Route path="/" exact component={ HomePage } />
      <Route path="/bus" exact component={ BusQueryForm } />
      <Route path="/bus/detail" exact component={ BusDetailScreen } />
      <Route path="/healthy/nuclearAcid" exact component={ NuclearAcidQuery } />
      <Route path="/gpaCalculator" exact component={ GPACalculator } />
      <Route path="/utilsBox/healthCodeCenter" exact component={ HealthCodeCenter } />
      <Route path="/Login" exact component={ LoginPage } />
      <Route path="*" exact component={ UndefinedPage } />
    </Switch>
  </Router>,
  document.getElementById('root')
);
