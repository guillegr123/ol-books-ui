import React, { Component } from 'react';
import Search from '../../containers/Search'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Biblioteca abierta</h1>
        </header>
        <div className="App-body">
          <Search />
        </div>
      </div>
    );
  }
}

export default App;
