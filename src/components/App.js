import React, { Component } from "react";
import Queries from './queries';
import { container } from "./app.css";
import styles from "./app.css";

const bridge = {
  getQueries: () => {
    console.log('getting queries');
  }
};

class App extends Component {
  render() {
    return (
      <div className={container}>
        <Queries getQueries={bridge.getQueries}/>
      </div>
    );
  }
}

export default App;
