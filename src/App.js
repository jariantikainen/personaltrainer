import React from 'react';
import './App.css';
import PersonalTrainer from './components/PersonalTrainer';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/personaltrainer/customers" />
          <Route
            exact
            path="/personaltrainer/:page?"
            render={(props) => <PersonalTrainer {...props} />}
          />
         <Route path="*" component={()=>(<div>PAGE NOT FOUND</div>)} />
    </Switch>
  </BrowserRouter>
  ); 
}

export default App;