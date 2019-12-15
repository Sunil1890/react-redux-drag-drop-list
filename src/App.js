import React, { Component } from 'react';
import './styles/App.css';
import Routing  from './components/Routing';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Routing />
      </div>
    );
  }
}

export default App;
