import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RandomColorQuery from './RandomColorQuery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <div>
              <RandomColorQuery />
            </div>
          </Route>
          <Route path="/basic-query">
            <RandomColorQuery />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
