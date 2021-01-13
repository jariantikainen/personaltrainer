import React from 'react';
import './App.css';
import PersonalTrainer from './components/PersonalTrainer';
//import CustomerList from './components/CustomerList';
//import TrainingList from './components/TrainingList';
//import CalendarView from './components/CalendarView'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
/*  const NoMatchPage = () => (
    <div>
      <h1>NoMatch</h1>
    </div>
  ) */

  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/personaltrainer/customers" />
          <Route
            exact
            path="/personaltrainer/:page?"
            render={(props) => <PersonalTrainer {...props} />}
          />
         <Route path="*" component={()=>(<div>NoMatch</div>)} />
    </Switch>
  </BrowserRouter>
  ); 
}

export default App;