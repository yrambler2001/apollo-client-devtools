import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ColorSchemeGenerator from './ColorSchemeGenerator';
import Favorites from './Favorites';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Colors</h1>
          <nav>
            <Link to="/scheme">Color Scheme Generator</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/scheme">
              <ColorSchemeGenerator />
            </Route>
            <Route path="/">
              <div>
                Home
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
